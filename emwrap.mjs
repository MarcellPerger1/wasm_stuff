import initEM from "./res-esm/hw.mjs";


/** @type {Promise<Object>} */
var moduleInit = null;

/**
@return {Promise<_ModType>}
*/
export default async function init() {
  if (moduleInit == null) { moduleInit = _init(); }
  return moduleInit;
}

export async function _init() {
  var orig = window.orig_mod = await initEM();
  let objToC = null;
  for(let tp of Object.values(orig.registeredTypes)){
    if(tp.name=="emscripten::val"){
      objToC = (v) => tp.toWireType(null, v);
      break;
    }
  }
  if(objToC==null){
    throw new ReferenceError("val.toWireType not found");
  }
  let mod = {
    objToC,
    /**
     * Call a C function
     * @param {String} ident - name of function
     * @param {string|null=} returnType
     * @param {Array=} argTypes
     * @param {Arguments|Array=} args
     * @param {Object=} opts
     */
    ccall(ident, returnType, argType, args, opts) {
      let newargs = [];
      for (let arg of args) {
        if (arg != null && !Array.isArray(arg) && arg instanceof Object) {
          arg = mod.objToC(arg);
        }
        newargs.push(arg);
      }
      return orig.ccall(ident, returnType, argType, newargs, opts);
    },
    /**
     * Return a C function that can be called directly from JS
     * @param {String} ident - name of function
     * @param {string|null=} returnType
     * @param {Array=} argTypes
     * @param {Object=} opts
     */
    cwrap(ident, returnType, argTypes, opts) {
      return {
        [ident]() {
          return mod.ccall(ident, returnType, argTypes, arguments, opts)
        }
      }[ident];
    },
  }
  return mod;
}

export class _ModType {
  /**
   * Call a C function
   * @param {String} ident - name of function
   * @param {string|null=} returnType
   * @param {Array=} argTypes
   * @param {Arguments|Array=} args
   * @param {Object=} opts
   */
  ccall(ident, returnType, argType, args, opts) { }
  /**
   * Return a C function that can be called directly from JS
   * @param {String} ident - name of function
   * @param {string|null=} returnType
   * @param {Array=} argTypes
   * @param {Object=} opts
   */
  cwrap(ident, returnType, argTypes, opts) { }
}
