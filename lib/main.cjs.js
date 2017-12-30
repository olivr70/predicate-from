'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
  switch (typeof x === 'undefined' ? 'undefined' : _typeof(x)) {
    /** returns a predicate derived from the argument */
    case 'function':
      return x;
    case 'string':
    case 'number':
      if ((arguments.length <= 1 ? 0 : arguments.length - 1) === 1 && _typeof(arguments.length <= 1 ? undefined : arguments[1]) === (typeof x === 'undefined' ? 'undefined' : _typeof(x))) {
        var max = arguments.length <= 1 ? undefined : arguments[1];
        return function inRange(item) {
          return item >= x && item < max;
        };
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
    var anyPredicate = ref.map(predicateFrom);
    switch (anyPredicate.length) {
      case 0:
        return alwaysTrue;
      case 1:
        return anyPredicate[0];
      default:
        return function (item) {
          return anyPredicate.some(function (pred) {
            return pred(item);
          });
        };
    }
  } else {
    var preds = propsToPredicates(ref);
    return function (item) {
      return Object.keys(preds).every(function (k) {
        return preds[k](item[k]);
      });
    };
  }
}

module.exports = predicateFrom;
