const getAllClassesBySubject = require('./scrapeClasses');
const getDepartments = require('./scrapeDepartments');
const { getStudies } = require('./scrapeStudies');

// getDepartments().then(console.log);
// getAllClassesBySubject('18F', 'EDUC').then(console.log);
getStudies().then(console.log);