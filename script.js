// import * as mod from "./res-esm/hw.mjs";
// window.mod = mod;

import init from './emwrap.mjs';

console.log('start')
var canv = window.canv = document.getElementById('canvas');
var ctx = window.ctx = canv.getContext('webgl');
var mod = window.mod = await init({preinitializedWebGLContext: ctx, canvas: canv});
console.log('done', mod);
var func2 = mod.cwrap("func2", null, ["object"]);
func2({a: [[[0,0,1], [0,0,1]], [[0,1,1], [1,1,0]]], b:6})
console.log('call');
// todo: handle= (Module.)registerContext then in C++, getCOntext(handle)

// onRuntimeInitialized = () => {
//   _myFunction();
// }


// TODO!!!!! to access GL, use mod.Module.GL
// TODO!!!!!!! assign to new Mdoule from old