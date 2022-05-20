// import * as mod from "./res-esm/hw.mjs";
// window.mod = mod;

import init from './emwrap.mjs';

console.log('start')
var mod = window.mod = await init();
console.log('done', mod);
var func2 = mod.cwrap("func2", null, ["object"]);
func2({a: 8, b:6})
console.log('call');

// onRuntimeInitialized = () => {
//   _myFunction();
// }