(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.predicateFrom = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

// JS features :
// - Array.isArray
// - Array.prototype.some()
// - Object.keys()
// - arrow functions

/** returns a predicate derived from the argument 
 * - function are left untouched
 * - string, number,boolean and Symbol : true if arg is === to x
 * - array : true if arg matches any of the predicates in the array
 * - object: true if arg is an object matching that matches all predicates in x
 * @return {function} - a predicate function
*/
function predicateFrom(x) {
  var _arguments = arguments;

  switch (typeof x === 'undefined' ? 'undefined' : _typeof(x)) {
    /** returns a predicate derived from the argument */
    case 'function':
      return x;
    case 'string':
    case 'number':
      if ((arguments.length <= 1 ? 0 : arguments.length - 1) === 1 && _typeof(arguments.length <= 1 ? undefined : arguments[1]) === (typeof x === 'undefined' ? 'undefined' : _typeof(x))) {
        var _ret = function () {
          var max = _arguments.length <= 1 ? undefined : _arguments[1];
          return {
            v: function inRange(item) {
              return item >= x && item < max;
            }
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    // FALL THRU
    case 'boolean':
    case 'symbol':
      return function (item) {
        return item === x;
      };
    case 'undefined':
      return alwaysTrue; // toujours vrai
    default:
      if (x instanceof RegExp) {
        return function predicateRegExp(item) {
          return x.test(item);
        };
      }
      return predicateFromObject(x);
  }
}

function alwaysTrue() {
  return true;
}

/** transforms every own and enumerable property to a predicate by invoking predicateFor
 * @param {object} ref - a plain JS object
  */
function propsToPredicates(ref) {
  return Object.getOwnPropertyNames(ref).filter(function (k) {
    return Object.getOwnPropertyDescriptor(ref, k).enumerable;
  }).reduce(function (res, k) {
    res[k] = predicateFrom(ref[k]);return res;
  }, {});
}

/** returns a new predicate from an array or object
 * - for an Array, returns the or() of all predicates generated for each item
 * - for an Object, returns a predicate which will apply each predicate to the correspondint
 *   property of the source object
 */
function predicateFromObject(ref) {
  if (Array.isArray(ref)) {
    var _ret2 = function () {
      var anyPredicate = ref.map(predicateFrom);
      switch (anyPredicate.length) {
        case 0:
          return {
            v: alwaysTrue
          };
        case 1:
          return {
            v: anyPredicate[0]
          };
        default:
          return {
            v: function v(item) {
              return anyPredicate.some(function (pred) {
                return pred(item);
              });
            }
          };
      }
    }();

    if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
  } else {
    var _ret3 = function () {
      var preds = propsToPredicates(ref);
      return {
        v: function v(item) {
          return Object.keys(preds).every(function (k) {
            return preds[k](item[k]);
          });
        }
      };
    }();

    if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
  }
}

return predicateFrom;

})));