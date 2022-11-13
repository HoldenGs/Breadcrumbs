const axios = require('axios').create({
	baseURL: 'https://sa.ucla.edu/ro/public/soc/Results'
});

const firstPageAddend = '?sBy=subject'; // ?t=22F&subj=COM+SCI
const nextPageAddend = '/CourseTitlesView?search_by=subject';
const classDataAddend = '/GetCourseSummary'

const pageRegex = /<input type="hidden" name="pageCount" id="pageCount" value="(\d+)" \/>/;

const classTitleRegex = /<button class="linkLikeButton" id=".+-title" type="button" aria-expanded="false" aria-controls=".+-container" aria-disabled="false">(.+ - .+)<\/button>/g;
const classModelRegex = /var addCourse.+\d{4}.* = function \(\) { Iwe_ClassSearch_SearchResults.AddToCourseData\(".+\d{4}.*",({.+})\); };/g;

const professorRegex = /<div class="instructorColumn hide-small" id="\d+_.+-instructor_data"><p>(.+)<\/p><\/div>/g;
const lineBreakRegex = /<br \/>/g;

const filterFlags = JSON.stringify({
	"enrollment_status": "O,W,C,X,T,S",
	"advanced": "y",
	"meet_days": "M,T,W,R,F",
	"start_time": "7:00 am",
	"end_time": "11:00 pm",
	"meet_locations": null,
	"meet_units": null,
	"instructor": null,
	"class_career": null,
	"impacted": null,
	"enrollment_restrictions": null,
	"enforced_requisites": null,
	"individual_studies": null,
	"summer_session": null
});

const baseModel = { // need subj_area_cd (e.g. COM SCI) and term_cd (e.g. 22F)
	"search_by": "Subject",
	"ActiveEnrollmentFlag":"n",
	"HasData":"False"
}





// THIS IS THE FUNCTION EXPORTED BY THIS FILE
/**
 * Get all classes in a subject for a given term
 * @param {string} term term of classes searching in (e.g. 22F for Fall 2022).
 * 		note that summer uses "1"; 221 means Summer 2022 (by MyUCLA convention lol)
 * @param {string} subject subject: short version of subject (e.g. COM SCI)
 * @returns {Promise<Array<Object>>} Array<Class> where Class is an object with fields:
 * 		quarter: string (e.g. "Fall 2022")
 *		department: string (e.g. "COM SCI" -- same as input subject)
 * 		code: string (e.g. "35L")
 *		title: string (e.g. "Software Construction")
 *		professor: string (e.g. "Eggert, P.R." -- note multiple professors for one class will
 *			be separated by semicolons)
 */
function getAllClassesBySubject(term, subject) {
	return new Promise((resolve, reject) => {
		getClassesFirstPage(term, subject).then(async ({ pages, classes }) => {
			if (pages > 1) { // fetch remaining pages
				let toFetch = [];
				let vals;

				for (let page = 2; page <= pages; ++page)
					toFetch.push(getClassesByPage(term, subject, page));

				try {
					vals = await Promise.all(toFetch);
				} catch (err) {
					reject(err);
				}
				
				vals.forEach(val => {
					classes = classes.concat(val);
				});
			}

			let toFetch = [];

			for (let i = 0; i < classes.length; ++i) {
				toFetch.push(new Promise((resolve, reject) => {
					setTimeout(() => { // stagger requests by 50 ms.
						getProfessors(classes[i].model).then(resolve).catch(reject);
					}, i * 50);
				}));
			}

			let profs;

			try {
				profs = await Promise.all(toFetch);
			} catch (err) {
				reject(err);
			}

			if (classes.length !== profs.length)
				return reject(`Profs length ${profs.length} does not equal classes length ${classes.length}!`);

			let outClasses = [];
			
			classes.forEach((data, i) => {
				const [ code, title ] = data.displayTitle.split(' - ');
				
				profs[i].forEach(professor => {
					outClasses.push({
						quarter: prettifyTerm(term),
						department: subject,
						code, title, professor
					});
				});
			});

			resolve(outClasses);
		}).catch(reject);
	});
}



/*
	get number of pages and classes listed on first page of search for classes, by subject

	term: term of classes searching in (e.g. 22F for Fall 2022)
	subject: short version of subject (e.g. COM SCI)

	returns: object { pages: number, classes: Array<Class> }
		where Class has format { displayTitle: string, model: string }
		displayTitle is as title is displayed in MyUCLA (e.g. "35L — Software Construction")
		model is to be passed into getProfessors.
*/

function getClassesFirstPage(term, subject) {
	return new Promise((resolve, reject) => {
		axios.get(firstPageAddend + `&t=${term}&subj=${subject}`).then(res => {
			const data = res.data;

			const pages = parseInt(pageRegex.exec(data)[1]);
			const classes = extractClasses(data);

			resolve({ pages, classes });
		}).catch(reject);
	});
}



/*
	get classes on a given page number

	term: term of classes searching in (e.g. 22F for Fall 2022)
	subject: short version of subject (e.g. COM SCI)
	page: page number
*/

function getClassesByPage(term, subject, page) {
	return new Promise((resolve, reject) => {
		const model = JSON.stringify({
			...baseModel,
			subj_area_cd: subject,
			term_cd: term
		});

		axios.get(nextPageAddend + `&pageNumber=${page}&model=${model}&filterFlags=${filterFlags}`, {
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		}).then(res => {
			const classes = extractClasses(res.data);

			resolve(classes);
		}).catch(reject);
	});
}



/*
	helper function for getClasses__ functions
	extracts class data from HTML returned by web pages

	data: string, raw HTML data from registrar to parse
*/

function extractClasses(data) {
	let classes = []

	let titleMatch = classTitleRegex.exec(data);
	let classMatch = classModelRegex.exec(data);

	while (titleMatch && classMatch) {
		classes.push({
			displayTitle: titleMatch[1],
			model: classMatch[1]
		});

		titleMatch = classTitleRegex.exec(data);
		classMatch = classModelRegex.exec(data);
	}

	return classes;
}



/*
	get professors teaching a course for a given model

	model: string, a model (JSON object stringified), returned from getClasses___ functions above
	
	(note: model contains data about quarter class is in, and a bit more)
	this is also where we could extract, say, how many seats are available in a class
	-- but we don't need that functionality.
*/

function getProfessors(model) {
	return new Promise((resolve, reject) => {
		axios.get(classDataAddend + `?model=${model}&FilterFlags=${filterFlags}`).then(res => {
			let professorMatch = professorRegex.exec(res.data);
			let professors = [];

			while (professorMatch) {
				professors.push(professorMatch[1].replace(lineBreakRegex, '; '));
				professorMatch = professorRegex.exec(res.data);
			}

			professors = [ ...new Set(professors) ] // removes dupes

			resolve(professors);
		}).catch(reject);
	});
}



const prettifiedQuarters = {
	'1': 'Summer Sessions',
	'2': 'Summer', // grad courses lol
	'F': 'Fall',
	'W': 'Winter',
	'S': 'Spring'
}

/*
	make a technical term name "pretty"
	for example, changes 22F -> Fall 2022
	(note: assumes we're in the 21st century LOL)

	term: term name to prettify
*/

function prettifyTerm(term) {
	const year = term.slice(0, 2);
	const quarter = term.slice(-1);

	return prettifiedQuarters[quarter] + ' 20' + year;
}



module.exports = getAllClassesBySubject;