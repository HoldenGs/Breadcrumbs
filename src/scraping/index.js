const getAllClassesBySubject = require('./scrapers/classes');
const getDepartments = require('./scrapers/departments');
const { getStudies } = require('./scrapers/studies');

const fs = require('fs');
const { promises: fsp } = fs;
const path = require('path');
const { exit } = require('process');

const configPath = path.join(__dirname, 'config.json');
const dataPath = path.join(__dirname, '..', '..', 'public', 'data');

const studiesPath = path.join(dataPath, 'studies');
const majorsPath = path.join(studiesPath, 'majors.json');
const minorsPath = path.join(studiesPath, 'minors.json');

const departmentsPath = path.join(dataPath, 'departments.json');
const quartersPath = path.join(dataPath, 'quarters.json');

const classesPath = path.join(dataPath, 'classes');

const defaultConfig = {
	scrape: { // items to scrape and (over)write to JSON.
		studies: false, // whether to scrape studies; a value of 'majors' scrapes only majors, and 'minors' only minors
		departments: false, // whether to scrape departments
		classes: { // whether to scrape classes (make "false" instead of an object to disable); options as follows
			term: '22F', // required. what term to scrape classes from
			delay: 5000, // optional (defaults to 5000) -- delay in ms between departments for scraping
			department: 'COM SCI' // optional, what department to scrape classes from (defaults to all)
		}
	},
	upload: { // items to read from JSON and upload to Firestore (no longer uploading! for now.)
		studies: false,
		departments: false,
		quarterDates: false,
		classes: {
			term: '22F', // required. what term to upload
			department: 'COM SCI' // optional. a specific department's classes to upload.
		}
	}
};

/*
	data directory structure:

	/data: root of data. all paths are under this.
	 - JSON files will be stringified with \t (tab character) as the separator

	/studies: studies
		/majors.json: array of all major names
		/minors.json: array of all minor names
	/departments.json: array of all department short names (e.g. COM SCI)
	/quarters.json: array of objects with quarter information (short name, long name, date) (MANUAL ENTRY)
	/classes: classes (the big boy)
		/<quarter>: for example, 22F. quarter of classes.
			/<dept>.json: for example, COM SCI.json. all classes under department.

*/

// =========================
//        MAIN SCRIPT
// =========================

let config;

(async () => {
	if (fs.existsSync(configPath)) {
		try {
			config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
		} catch (err) {
			console.error('Error reading config.json:');
			exitWithError(err);
		}
	
		validateConfig(config);
	
		console.log('Read config.json successfully.');
	} else {
		console.log('No config.json found. Generating one with default options.');
	
		fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, '\t'));
	
		config = JSON.parse(JSON.stringify(defaultConfig));
	
		console.log('Done.');
	}

	if (!fs.existsSync(dataPath)) {
		console.log('No data directory found. Creating one...');
		fs.mkdirSync(dataPath);
		console.log('Done.');
	}
	
	printConfigTasks();
	await affirmAndWait(3);
	
	console.log('\n======> BEGIN SCRAPING TASKS\n');
	
	await scrape();
	
	console.log('\n======> BEGIN UPLOADING TASKS\n');
	
	upload();
})();

// =====================================================
//        END MAIN SCRIPT; BEGIN SCRAPING SECTION
// =====================================================

async function scrape() {
	const { scrape } = config;

	if (!scrape || (!scrape.studies && !scrape.departments && !scrape.classes)) {
		console.log('there are none lol');
		return;
	}

	if (scrape.studies)
		await scrapeStudies();

	if (scrape.departments)
		await scrapeDepartments();

	if (scrape.classes)
		await scrapeClasses();
}

async function scrapeStudies() {
	console.log('---> Scraping studies\n')
		
	try {
		if (!fs.existsSync(studiesPath))
			fs.mkdirSync(studiesPath);

		console.log('Scraping from webpage...');
		let { majors, minors } = await getStudies();
		console.log('Done.');

		console.log('Saving majors and minors to studies/*.json files...');

		await Promise.all([
			fsp.writeFile(majorsPath, JSON.stringify(majors, null, '\t')),
			fsp.writeFile(minorsPath, JSON.stringify(minors, null, '\t'))
		]);
		console.log('Done.');
	} catch (error) {
		console.error('Error while scraping studies!');
		console.error(error);
		console.log('\nAborting.');
		exit();
	}

	console.log();
}

async function scrapeDepartments() {
	console.log('---> Scraping departments\n')
	
	try {
		console.log('Scraping from webpage...');
		let departments = await getDepartments();
		console.log('Done.');

		console.log('Saving departments to departments.json...');
		await fsp.writeFile(departmentsPath, JSON.stringify(departments, null, '\t'));
		console.log('Done.');
	} catch (error) {
		console.error('Error while scraping departments!');
		console.error(error);
		console.log('\nAborting.');
		exit();
	}
	
	console.log();
}

async function scrapeClasses() {
	const { term, delay = 5000, department } = config.scrape.classes;
	const termPath = path.join(classesPath, term);	

	console.log(`---> Scraping classes for ${term}\n`);
	
	try {
		if (!fs.existsSync(classesPath))
			fs.mkdirSync(classesPath);

		if (!fs.existsSync(termPath))
			fs.mkdirSync(termPath);

		let departments = [];

		if (department)
			departments = [ department ];
		else
			departments = JSON.parse(await fsp.readFile(departmentsPath, 'utf-8'));

		let errors = [];

		for (let i = 0; i < departments.length; ++i) {
			if (i != 0)
				await wait(delay);

			const department = departments[i];

			console.log(`Fetching classes in the ${department} department...`);
			let classes;
			try {
				classes = await getAllClassesBySubject(term, department);
			} catch (error) {
				console.error(`Error scraping classes in ${department}:`);
				console.error(error);
				errors.push(department + ' ' + (error.stack ? error.stack : error));
				console.log('Skipping department due to error...');
				continue;
			}
				
			console.log('Done.');

			console.log(`Saving classes to classes/${term}/${department}.json...`);
			await fsp.writeFile(path.join(termPath, department + '.json'), JSON.stringify(classes, null, '\t'));
			console.log('Done.');
		}

		console.log('\nFinished scraping.');

		if (errors.length !== 0) {
			console.log(`Error summary (${errors.length} errors total):`);
			errors.forEach(err => console.log(err));
		}
	} catch (error) {
		console.error('Error while scraping classes!');
		console.error(error);
		console.log('\nAborting.');
		exit();
	}
	
	console.log();
}

// ======================================
//        BEGIN UPLOADING SECTION
// ======================================

function upload() {

}

// ======================================
//        BEGIN HELPER FUNCTIONS
// ======================================

function printConfigTasks() {
	console.log('With the currently loaded config, the following tasks will be performed:\n');
	console.log('--- SCRAPING ---');
	
	const { scrape, upload } = config;

	if (!scrape || (!scrape.studies && !scrape.departments && !scrape.classes))
		console.log('Nothing will be scraped.');
	else {
		console.log('The following will be scraped from the UCLA registrar and stored in JSON:')
		
		if (scrape.studies)
			console.log(' - The list of studies (majors and minors)');
		
		if (scrape.departments)
			console.log(' - The list of departments');

		if (scrape.classes) {
			console.log(` - Classes for the ${scrape.classes.term} quarter`);
			console.log(`   - With a ${scrape.classes.delay || 5000} ms delay between scrapes`);
			if (scrape.classes.department)
				console.log(`   - In the ${scrape.classes.department} department only`);
			else
				console.log('   - In all departments');
		}
	}

	console.log('\n--- UPLOAD ---');

	if (!upload || (!upload.studies && !upload.departments && !upload.quarterDates && !upload.classes))
		console.log('Nothing will be uploaded to Firestore.');
	else {
		console.log('The following will be uploaded to Firestore:');

		if (upload.studies)
			console.log(' - The list of studies (majors and minors)');

		if (upload.departments)
			console.log(' - The list of departments');

		if (upload.quarterDates)
			console.log(' - The list of quarters (long names) and their corresponding start dates');

		if (upload.classes) {
			console.log(`Classes for the ${upload.classes.term} quarter`);

			if (upload.classes.department)
				console.log(` - For the ${upload.classes.department} department only`);
			else
				console.log(' - For all departments');
		}
	}

	console.log();
}



function affirmAndWait(seconds) {
	return new Promise((resolve) => {
		console.log(`Are you sure you would like to do all this? Tasks will begin in ${seconds} seconds if the program is not terminated.`);

		wait(1000 * seconds).then(resolve);
	});
}



function wait(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}



function validateConfig() {
	const { scrape, upload } = config;
	
	if (!scrape || !upload)
		exitWithError('Config missing scrape or upload section.');

	if (scrape.classes) {
		if (!scrape.classes.term)
			exitWithError('Config scrape section missing term for classes');
		
		if (scrape.classes.delay && typeof scrape.classes.delay !== 'number')
			exitWithError('Config value scrape.classes.delay is not a number!');

		if (!scrape.classes.department && !scrape.departments && !fs.existsSync(departmentsPath))
			exitWithError('Trying to scrape classes from all departments, but you haven\'t scraped all departments yet!');
	}
}



function exitWithError(error) {
	console.error(error);
	exit();
}