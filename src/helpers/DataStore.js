class PageCache {
	constructor(url) {
		this._url = url
		this._data = null
		this._processing = false
	}

	_fetch() {
		this._processing = new Promise((resolve, reject) => {
			if (this._data) return resolve(this._data)

			fetch(this._url)
				.then((res) => {
					res
						.json()
						.then((json) => {
							this._data = json
							resolve(json)
						})
						.catch((err) => {
							console.error(`Error parsing cache JSON w/ URL ${this._url}`, err)
						})
				})
				.catch((err) => {
					console.error(`Error fetching cache w/ URL ${this._url}`, err)
					reject(err)
				})
		}).finally(() => {
			this._processing = false
		})

		return this._processing
	}

	fetch() {
		if (this._processing) return this._processing

		return this._fetch()
	}
}

const baseURL = window.location.origin + '/data'
const majorsURL = baseURL + '/studies/majors.json'
const minorsURL = baseURL + '/studies/minors.json'
const quartersURL = baseURL + '/quarters.json'
const departmentsURL = baseURL + '/departments.json'
const classesBaseURL = baseURL + '/classes'

class DataStore {
	constructor() {
		this._majors = new PageCache(majorsURL)
		this._minors = new PageCache(minorsURL)
		this._quarters = new PageCache(quartersURL)
		this._departments = new PageCache(departmentsURL)
		this._classes = {}
	}

	majors() {
		return this._majors.fetch()
	}

	minors() {
		return this._minors.fetch()
	}

	quarters() {
		return this._quarters.fetch()
	}

	departments() {
		return this._departments.fetch()
	}

	classes(term, dept) {
		if (!this._classes[term]) this._classes[term] = {}
		const termObj = this._classes[term]

		if (!termObj[dept]) {
			const url = `${classesBaseURL}/${term}/${encodeURIComponent(dept)}.json`
			termObj[dept] = new PageCache(url)
		}

		const deptObj = termObj[dept]

		return deptObj.fetch()
	}
}

export default new DataStore()
