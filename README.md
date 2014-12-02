BoostArray
==========

Booster shot for JavaScript Arrays

The fastest way to iterate over an array in JavaScript is always going to be writing out the explicit `for` loop like this[*citation needed*]:

```
var i, len = myArray.length;
for (i = 0; i < len; i++) {
	myFunc(myArray[i]);
}
```

However, nothing beats the convenience of JavaScript's `forEach` function (and siblings: `map`, `reduce`, `filter`, etc):

```
myArray.forEach(myFunc);
```

However convenience comes at a cost.  `forEach`, and siblings, do various type checking and have various extra features not needed 93% of the time (based on very unscientific analysis of my code).  These features (desiered in many cases) slow the looping process down significantly (see benchmarks below).

BoostArray is like a Booster shot for JavaScript Arrays in that it adds addition fast versions of forEach and siblings to a plain ordinary array (POA) or all arrays (see usage below).  Switching between the standard method and the boosted methods can be as simple as adding a single character:

```
myArray.$forEach(myFunc);
```

# Usage

There are three ways to use BoostArray:

## As a boost for Plain Ordinary Arrays (POAs) (recommended method)

```
var boostedArray = BoostArray();

/* ...add some elements using push(), etc */

boostedArray.$forEach(myFunc);
```

boostedArray is initially an empty POA that has the boosted methods attached (see methods below).  Note that while `BoostArray` looks (and sort of acts) like a constructor it... it really isn't (see [here](http://www.bennadel.com/blog/2292-extending-javascript-arrays-while-keeping-native-bracket-notation-functionality.htm)).  BoostArray adds methods to existing arrays, but in the example above, since no array is passed to the "constructor" so BoostArray assumes you want a new array.  The following method for boosting an existing POA is recommended:

```
BoostArray(myArray);
myArray.$forEach(myFunc);
```

## As a boost for all arrays

```
BoostArray(Array.prototype);
myArray.$forEach(myFunc);
```

This will boost all POAs.  Any JavaScript array will now have the fast "boosted" methods.

## As a boosting toolset

```
BoostArray.prototype.$forEach.call(myArray, myFunc);
```

Using JavaScript's `Function.prototype.call()` the BoostArray methods can be applied to any array or array like object.

# Methods

A boosted array (by any of first two methods above) is still an ordinary JavaScript Array.  Therefore it contains all the standard [Array.prototype methods](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype).

In addition a boosted array contains the following additional methods (notice the dollar sign for boosted methods):

## BoostArray.prototype.$forEach(callback)
Calls the callback function for each element in the array in ascending order.

> Note: Unlike `Array.prototype.forEach` there is no thisArg used for callback binding, there is no handling of sparse arrays, and the callback function is invoked with only the element value (i.e. no element index or reference to the original array).

## BoostArray.prototype.$filter(callback)
Creates a new ordinary array with all of the elements of this array for which the provided filtering function returns true.

> Note: Unlike `Array.prototype.filter` there is no thisArg used for callback binding, there is no handling of sparse arrays, and the callback function is invoked with only the element value (i.e. no element index or reference to the original array).
> Also note that unless you have boosted the Array.prototype as discussed above the returned value will not have the boosted methods attached.

## BoostArray.prototype.$map(callback)
Creates a new ordinary array with the results of calling a provided function on every element in this array.

> Note: Unlike `Array.prototype.map` there is no thisArg used for callback binding, there is no handling of sparse arrays, and the callback function is invoked with only the element value (i.e. no element index or reference to the original array).
> Also note that unless you have boosted the Array.prototype as discussed above the returned value will not have the boosted methods attached.

## BoostArray.prototype.$reduce(callback, initialValue)
Apply a function against each value of the array (from left-to-right) as to reduce it to a single value.

> Note: Unlike `Array.prototype.reduce` the initialValue is not optional, there is no handling of sparse arrays, and the callback function is invoked with only the element value (i.e. no element index or reference to the original array).

# Benchmarks

For benchmarks see [Hypercubed/ArraySpeedTests](https://github.com/Hypercubed/ArraySpeedTests)

# Contributions

Pull requests are appreciated.  However, remember keep it fast by:

1) no callback binding
2) no type checking
3) no element index or reference to the original array

# Acknowledgements

BoostArray was inspired by PowerArray(https://github.com/techfort/PowerArray), fast.js(https://github.com/codemix/fast.js/tree/master), ramda(https://github.com/ramda/ramda), and lodash(https://github.com/lodash/lodash/).  Much of the Array sub-classing code based on [Extending JavaScript Arrays While Keeping Native Bracket-Notation Functionality](http://www.bennadel.com/blog/2292-extending-javascript-arrays-while-keeping-native-bracket-notation-functionality.htm).

## License
2014 Jayson Harshbarger

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
