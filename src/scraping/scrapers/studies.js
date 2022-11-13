const axios = require('axios').create({
	baseURL: 'https://admission.ucla.edu/apply'
});

const majorsAddend = '/majors';
const minorsAddend = '/minors';

const linkRegex = /<p><a href=".+">(.+)<\/a>/g;
const weirdCharRegex = /\u00a0/g;

const majorsRegex = /(.+) \(B\.[ASM]\.(\/ B\.S\.)?\)/;

const majorsListStartText = 'brings together perspectives from many liberal arts';
const majorsListEndText = '<h2 class="visually-hidden" id="sidebar-menu">Sidemenu navigation</h2>';

const minorsListStartText = 'Following is a list of all the minors';
const minorsListEndText = '<p class="small-text">';

const unlinkedMajors = [
	'Undeclared Humanities',
	'Undeclared Life Sciences',
	'Undeclared Physical Sciences',
	'Undeclared Social Sciences',
	'Undeclared Engineering and Applied Science'
]



/**
 * Scrape all studies at UCLA.
 * @returns Promise<Object> containing:
 * 		majors: an array of all majors
 * 		minors: an array of all minors
 */
function getStudies() {
	return new Promise((resolve, reject) => {
		Promise.all([
			getMajors(),
			getMinors()
		]).then(([ majors, minors ]) => {
			resolve({ majors, minors });
		}).catch(reject);
	});
}



/**
 * Scrape all majors at UCLA.
 * @returns Promise<Array> with all majors
 */
function getMajors() {
	return new Promise((resolve, reject) => {
		axios.get(majorsAddend).then(({ data }) => {
			const majorTexts = retrieveLinkNames(data, majorsListStartText, majorsListEndText);

			let majors = [];
			
			majorTexts.forEach(major => { // remove (B.A/S/M.) from end, remove non-matches.
				let match = majorsRegex.exec(major);

				if (match)
					majors.push(match[1]);
			});

			majors = majors.concat(unlinkedMajors);

			resolve(majors);
		}).catch(reject);
	});
}



/**
 * Scrape all minors at UCLA.
 * @returns Promise<Array> with all minors
 */
function getMinors() {
	return new Promise((resolve, reject) => {
		axios.get(minorsAddend).then(({ data }) => {
			const minors = retrieveLinkNames(data, minorsListStartText, minorsListEndText);

			resolve(minors);
		}).catch(reject);
	});
}



// helper for scrapeMinors and scrapeMajors, extracts text from <p><a> elements
function retrieveLinkNames(data, startText, endText) {
	data = data.slice(data.indexOf(startText), data.indexOf(endText));

	const matches = data.matchAll(linkRegex);

	const text = [ ...matches ].map(match => match[1].replace(weirdCharRegex, ' '));

	return text;
}

module.exports = {
	getStudies,
	getMajors,
	getMinors
}