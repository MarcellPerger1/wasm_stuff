// this is VERY inefficient bc looping over all types 
// but only way to do it without meddling inside emscripten 
// or overriding some builtin emsc functions in the pre-/post- amble
// later could use to build a more useful data representation for the regitered types
function findValType(regTypes){
  for(let tp of Object.values(regTypes)){
    if(tp.name=="emscripten::val") return tp;
  }
  throw new ReferenceError("emscripten::val type not found");
}

function _getNewargs(args){
  let newargs = [];
  for (let arg of args) {
    if (arg != null && !Array.isArray(arg) && arg instanceof Object) {
      arg = patches.objToC(arg);
    }
    newargs.push(arg);
  }
  return newargs;
}

// however, this messes up the call stack with an extra anonymous call
// and not messing up call stack is the whole point
// of renaming the function so this is somewhat useless...
function funcWithName(f, name){
  return {[name](){
    f.apply(this, arguments);
  }}[name];
}

export function getModulePatches(Module){
  let valType = findValType(Module.registeredTypes);
  let patches = {
    objToC(v) { 
      return valType.toWireType(null, v);
    },
    _getNewargs(args){
      return _getNewargs(args);
    },
    ccall(ident, returnType, argTypes, args, opts) {
      return Module.ccall(ident, returnType, argTypes, 
                          patches._getNewargs(args), opts);
    },
    cwrap(ident, returnType, argTypes, opts) {
      return {
        // trick to name function dynamically
        [ident]() {
          return patches.ccall(ident, returnType, argTypes, arguments, opts)
        }
      }[ident];
    },
    Module: orig,
    orig: orig
  }
  return patches;
}

export function getPatchedModule(Module){
  return Object.assign({}, Module, getModulePatches(Module));
}

export function patchModuleInplaceSaveCopy(Module){
  let _modCopy = Object.assign({}, Module);
  return Object.assign(Module, getModulePatches(_modCopy));
}

export function patchModuleInplace(Module){
  let valType = findValType(Module.registeredTypes);
  Module._ccall = Module.ccall;
  let patches = {
    objToC(v) { 
      return valType.toWireType(null, v);
    },
    _getNewargs,
    ccall(ident, returnType, argTypes, args, opts) {
      return Module._ccall(ident, returnType, argTypes, 
                          Module._getNewargs(args), opts);
    },
    cwrap(ident, returnType, argTypes, opts) {
      return {
        // trick to name function dynamically
        [ident]() {
          return Module.ccall(ident, returnType, argTypes, arguments, opts)
        }
      }[ident];
    },
    Module: orig,
    orig: orig
  };
  Object.assign(Module, patches);
  return Module;
}
