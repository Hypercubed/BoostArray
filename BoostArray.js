/*
* BoostArray
* Booster shot for Javascript Arrays
* @author Jayson Harshbarger <hypercubed@gmail.com>
* License: MIT
*/

(function () {
	'use strict';

	/**
	* BoostArray
	* @constructor
	* @param {array} plain array (or Array prototype) to boost
	*/
	function BoostArray(array) {
		array = array || [];
		array.$forEach = BoostArray.$forEach;
		array.$reduce = BoostArray.$reduce;
		array.$filter = BoostArray.$filter;
		array.$map = BoostArray.$map;
		array.$indexOf = BoostArray.$indexOf;
		return array;
	}

	/**
	* # forEach
	* Boosted `.forEach()`.
	*
	* @param  {Function}  fn  Visitor function.
	*/
	BoostArray.$forEach = function $forEach(fn) {
		var i = -1,
		len = this.length;
		while (++i < len) {
			fn(this[i]);
		}
	}

	/**
	* # reduce
	* Boosted `.reduce()`.
	*
	* @param  {Function}  fn  Visitor function.
	* @param  {mixed}  acc The initial value for the reduce.
	*/
	BoostArray.$reduce = function $reduce(fn, acc) {
		var i = -1,
		len = this.length;
		while (++i < len) {
			acc = fn(acc, this[i]);
		}
		return acc;
	}

	/**
	* # filter
	* Boosted `.filter()`.
	*
	* @param  {Function}  fn  Visitor function.
	*/
	BoostArray.$filter = function $filter(fn) {
		var r = [], ri = -1;
		var i = -1, len = this.length;
		while (++i < len) {
			var value = this[i];
			if (fn(value)) {
				r[++ri] = value;
			}
		}
		return r;
	}

	/**
	* # map
	* Boosted `.map()`.
	*
	* @param  {Function}  fn  Visitor function.
	*/
	BoostArray.$map = function $map(fn) {
		var i = -1, len = this.length;
		var r = new Array(len);
		while (++i < len) {
			r[i] = fn(this[i]);
		}
		return r;
	}

	/**
	* # indexOf
	* Boosted `.indexOf()`.
	*
	* @param  {Function}  fn  Visitor function.
	*/
	BoostArray.$indexOf = function(searchElement) {

		var i = -1,
			len = this.length;

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
