/* global define */

/*
* BoostArray
* Booster shot for Javascript Arrays
* @author Jayson Harshbarger <hypercubed@gmail.com>
* License: MIT
*
* Acknowledgements: BoostArray was inspired by PowerArray(https://github.com/techfort/PowerArray), fast.js(https://github.com/codemix/fast.js/tree/master), ramda(https://github.com/ramda/ramda), and lodash(https://github.com/lodash/lodash/).
* Some structal code rom here: http://www.bennadel.com/blog/2292-extending-javascript-arrays-while-keeping-native-bracket-notation-functionality.htm
*/

(function () {
  'use strict';

  /* private */
  function boost (target) {
    for (var method in BoostArray.prototype) {
      if (BoostArray.prototype.hasOwnProperty(method)) {
        Object.defineProperty(target, method, {
          enumerable: false,
          value: BoostArray.prototype[method]
        });
      }
    }
    return target;
  }

  /**
  * BoostArray
  * @constructor
  * @param {array} plain array (or Array prototype) to boost
  */
  function BoostArray (array) {
    array = array || [];
    return BoostArray.isBoostedArray(array) ? array : boost(array);
  }

  BoostArray.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };

  BoostArray.isBoostedArray = function (arg) {
    return arg.$boosted === true && Object.prototype.toString.call(arg) === '[object Array]';
  };

  /**
  * # $boosted
  * Boosted flag.
  *
  * Used to distinguish boosted arrays from un-boosted arrays.
  */
  BoostArray.prototype.$boosted = true;

  /**
  * # $forEach
  * Boosted `.forEach()`.
  *
  * @param  {Function}  fn  Visitor function.
  */
  BoostArray.prototype.$forEach = function $forEach (fn) {
    var i = -1;
    var len = this.length;
    while (++i < len) {
      fn(this[i]);
    }
  };

  /**
  * # $reduce
  * Boosted `.reduce()`.
  *
  * @param  {Function}  fn  Visitor function.
  * @param  {mixed}  acc The initial value for the reduce.
  */
  BoostArray.prototype.$reduce = function $reduce (fn, acc) {
    var i = -1;
    var len = this.length;
    while (++i < len) {
      acc = fn(acc, this[i]);
    }
    return acc;
  };

  /**
  * # $filter
  * Boosted `.filter()`.
  *
  * @param  {Function}  fn  Visitor function.
  */
  BoostArray.prototype.$filter = function $filter (fn) {
    var r = [];
    var ri = -1;
    var i = -1;
    var len = this.length;
    while (++i < len) {
      var value = this[i];
      if (fn(value)) {
        r[++ri] = value;
      }
    }
    return r;
  };

  /**
  * # $map
  * Boosted `.map()`.
  *
  * @param  {Function}  fn  Visitor function.
  */
  BoostArray.prototype.$map = function $map (fn) {
    var i = -1;
    var len = this.length;
    var r = new Array(len);
    while (++i < len) {
      r[i] = fn(this[i]);
    }
    return r;
  };

  /**
  * # $indexOf
  * Boosted `.indexOf()`.
  *
  * @param  {Function}  fn  Visitor function.
  */
  BoostArray.prototype.$indexOf = function (searchElement) {
    var i = -1;
    var len = this.length;
    while (++i < len) {
      if (this[i] === searchElement) {
        return i;
      }
    }
    return -1;
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = BoostArray;
  } else {
    if (typeof define === 'function' && define.amd) {
      define([], function () {
        return BoostArray;
      });
    } else {
      this.BoostArray = BoostArray;
    }
  }
}).call(this);
