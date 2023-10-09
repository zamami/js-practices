// for (let i = 0; i < process.argv.length; ++i) {
//     console.log(i + ': ' + process.argv[i]);
// }
//
// console.log(process.argv[3])

import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));
let month = ( argv['m'] ) ? argv['m'] : new Date().getMonth() + 1;
let year = ( argv['y'] ) ? argv['y'] : new Date().getFullYear() ;
console.log(month);
console.log(year);