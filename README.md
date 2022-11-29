# Breadcrumbs

A student-centric course recommendation platform.

## Installation

It's fairly simple!

1. Install [Node.js LTS](https://nodejs.org/en/download/)
2. Download this repository, and CD into that directory
3. Run `npm install`
4. To test locally, use `npm start`

## Deploying to Firebase

First, login with
`firebase login`

Then, build the web app for production with
`npm run build`

This places built files in `/build`. Run
`firebase deploy --only hosting` to deploy these files.

The tool will upload all files in `/build` and provide a deployed link!

## Scraping UCLA registrar data

Although registrar data should be fairly static, if it ever needs to be updated, there's a scraper! Note that by default, all scraped data is stored in `public/data`. If this needs to be changed in the future, there is a constant variable in `src/scraping/index.js` that can be updated. All future paths referred to will be underneath this path.

### Data structure

There are three types of scraped data:

- Departments (e.g. "COM SCI")
  - Stored in one array in `departments.json`
- Studies (majors and minors)
  - Stored in two arrays, one for majors and one for minors, in `studies/majors.json` and `studies/minors.json`, respectively
- Classes
  - Stored underneath the `classes` directory,
  - In the correct term folder (e.g. `22F` for Fall 2022 — see below for an explanation of the formatting),
  - In the department's respective `department.json` file,
  - As an array of objects containing quarter name, department, code, title, and professor.
  - See `classes/22F/COM SCI.json` for an example

Note that there's one other file in this directory, `quarters.json`. This is _not_ scraped from MyUCLA, but rather must be manually updated as new quarters are supported. This contains the UCLA registrar form of a quarter, `short`, ("22F" means "Fall 22"; "221" means "Summer Sessions 2022"), the `long` (descriptive) name of the quarter, and a UTC timestamp for 9 am on the first day of the quarter. This file is queried by the website to determine quarter orderingd and translation between short/long quarter prefixes, and should thus be kept up to date manually.

### Scraping instructions

To scrape any of the above data, do the following:

- Modify `src/scraping/config.json` to contain the fields you wish to scrape (ignore the "upload" section; it may be used in the future but for now has no effect on program behavior)
  - Note `studies` and `departments` take booleans
  - `classes` is a bit more complicated. If you don't wish to scrape classes, simply set to `false`. If you do, provide an object with the following options:
    - `term` (required), the term in UCLA registrar format (see `quarters.json` -- the `short` format)
  - `department` (optional), the department to scrape classes from. If none is provided, **all** departments' classes will be scraped.
  - `delay` (optional), the delay in ms between scraping different departments (so as not to overload your or UCLA's network). Defaults to 5000.
- Run `npm run scrape` and wait for completion!

Note that scraped data will be saved to `public/data` and organized into subfolders as described above.
