const getAllClassesBySubject = require('./scrapeClasses');
const getDepartments = require('./scrapeDepartments');

getDepartments().then(console.log);
getAllClassesBySubject('22F', 'ESL').then(console.log);