

import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));
// const month = ( argv['m'] ) ? argv['m'] : new Date().getMonth() + 1;
const month = argv['m'] || new Date().getMonth() + 1;
const year = argv['y'] || new Date().getFullYear();
// const year = ( argv['y'] ) ? argv['y'] : new Date().getFullYear() ;
console.log(month);
console.log(year);