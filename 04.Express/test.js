let varIterable = ['a','b','c'];
let varFunc = (i) => console.log(i);

varIterable.forEach( varFunc );
varIterable.forEach(function(i){console.log(i)});
