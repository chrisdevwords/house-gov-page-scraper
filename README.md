# House.gov Page Scraper
Scrapes the [representative finder](http://ziplook.house.gov/htbin/findrep) on [House.gov](http://house.gov).

[![CircleCI](https://circleci.com/gh/chrisdevwords/house-gov-page-scraper/tree/master.svg?style=shield)](https://circleci.com/gh/chrisdevwords/house-gov-page-scraper/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/chrisdevwords/house-gov-page-scraper/badge.svg?branch=master)](https://coveralls.io/github/chrisdevwords/house-gov-page-scraper?branch=master)
[![Dependency Status](https://david-dm.org/chrisdevwords/house-gov-page-scraper.svg)](https://david-dm.org/chrisdevwords/house-gov-page-scraper)
[![Dev Dependency Status](https://david-dm.org/chrisdevwords/house-gov-page-scraper/dev-status.svg)](https://david-dm.org/chrisdevwords/house-gov-page-scraper?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/chrisdevwords/house-gov-page-scraper/badge.svg)](https://snyk.io/test/github/chrisdevwords/house-gov-page-scraper)

## Requirements
Requires NodeJS version 4.3.2 or greater. 

## Installation
```
$ npm install house-gov-page-scraper --save
```

## Usage 

Returns a promises, using [Request-Promise-Native](https://www.npmjs.com/package/request-promise-native) for http GET requests.

```js
var scraper = require('house-gov-page-scraper');

scraper.getDistrictsInZip(90210)
    .then(function(result) {
        console.log(result); // outputs [ 'CA-28', 'CA-30', 'CA-33' ]
    });
```
Note: If a zip code is 4 digits, input as a 5 character string:
```js
scraper.getDistrictsInZip('02109')
    .then(function(result) {
        console.log(result); // outputs [ 'MA-8' ]
    });
```

## Tests
```
$ npm test
```

## Contributing 
Code is transpiled from ES6/ES2015. You can lint code by running:
```
$ npm run lint
```
