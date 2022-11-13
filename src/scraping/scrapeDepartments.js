const axios = require('axios');

axios.defaults.baseURL = 'https://sa.ucla.edu/ro/public/soc';

const dropdownRegex = /SearchPanelSetup\('(\[.+\])',/;

function getDepartments() {
	return new Promise((resolve, reject) => {
		axios.get().then(res => {
			const { data } = res;

			let subjects = JSON.parse(dropdownRegex.exec(data)[1].replace(/&quot;/g, '"'));
			subjects = subjects.map(obj => {
				return obj.value.trim();
			});

			resolve(subjects);
		}).catch(reject);
	});
}

module.exports = getDepartments;