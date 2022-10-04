const url = require('url');
const { URL } = url;
const queryString = require('querystring');

const myURL = new URL('https://github.com/search?q=user%3Admlgus1922+dmlgus1922');
console.log(myURL);
console.log(url.format(myURL));
const parsedUrl = url.parse('https://github.com/search?q=user%3Admlgus1922+dmlgus1922');
console.log(parsedUrl);
console.log('------------------------');
console.log(myURL.searchParams);
console.log(myURL.searchParams.getAll('q'));

const query = queryString.parse(parsedUrl.query);
console.log('query: ',query);