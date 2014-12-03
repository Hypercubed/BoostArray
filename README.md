BoostArray
==========

Booster shot for JavaScript Arrays

Adds "boosted" iterator methods to ordinary JavaScript arrays.

> Note: BoostArray is experimental.  Feedback is appreciated.  Please see [techfort/PowerArray](https://github.com/techfort/PowerArray) for an alternative approach.

# Introduction

The fastest way to iterate over an array in JavaScript is always going to be writing out the explicit `for` or `while` loop like this<sup>[*citation needed*]</sup>:

```
for (var i = 0, len = myArray.length; i < len; i++) {
	myFunc(myArray[i]);
}
```

However, nothing beats the convenience of JavaScript's `forEach` and sibling functions (`map`, `reduce`, `filter`):

```
myArray.forEach(myFunc);
```

However convenience comes at a cost.  `forEach`, and siblings, do various type checking and have various extra features not needed 93%<sup>[*based on very unscientific analysis of my own code*]</sup> of the time.  These features, desired in many cases, slow the looping process down significantly (see benchmarks below).

BoostArray is like a Booster shot for JavaScript Arrays in that it adds additional fast versions of forEach and siblings to a ordinary JavaScript arrays or, optionally, all native arrays (see usage below).  Switching between the standard method and the similar boosted method can be as simple as adding a single character:

```
myArray.$forEach(myFunc);
```

# Usage

There are three ways to use BoostArray:

## As a boost for ordinary JavaScript arrays (recommended method)

```
var boostedArray = BoostArray();

/* ...add some elements using push(), etc */

boostedArray.$forEach(myFunc);
```

boostedArray is initially an empty array that has the boosted methods attached (see methods below).  Note that while `BoostArray` looks (and sort of acts) like a constructor it... it really isn't (see [here](http://www.bennadel.com/blog/2292-extending-javascript-arrays-while-keeping-native-bracket-notation-functionality.htm)).  BoostArray adds methods to existing arrays, but in the example above, since no array is passed to the "constructor" so BoostArray assumes you want a new array.  The following method for boosting an existing array is recommended:

```
BoostArray(myArray);
myArray.$forEach(myFunc);
```

> Note: using this method, any array returned from Array.prototype or BoostArray.prototype methods will be an ordinary JavaScript array.  You will need subsequently to boost any array's returned from these methods (if you want to later use the boosted methods).

```
BoostArray(myArray);
var resultArray = BoostArray(myArray.$map(myFunc));
```

## As a boost for all arrays (use with caution)

```
BoostArray(Array.prototype);

/* ... */

myArray.$forEach(myFunc);
```

This will boost all JavaScript arrays.  All JavaScript arrays will now have the fast "boosted" methods.

> Note: In general extending JavaScript natives is not recommended (see [Extending JavaScript Natives](http://javascriptweblog.wordpress.com/2011/12/05/extending-javascript-natives/)) and may break other libraries.  Use with caution.

## As a boosting toolset

```
BoostArray.prototype.$forEach.call(myArray, myFunc);
```

Using JavaScript's `Function.prototype.call()` method the BoostArray methods can be applied to any array or array like object.

# Methods

A boosted array (by any of first two methods above) is still an ordinary JavaScript Array.  Therefore it contains all the standard [Array.prototype methods](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype).

### BoostArray.isBoostedArray(element)
Returns true if an element is a boosted array, if not false.

## Accessor methods
In addition to `Array.prototype` accessor methods a boosted array contains the following additional fast methods.

> Notice the dollar sign for boosted methods.

### BoostArray.prototype.$indexOf(searchElement)
Returns the first index of an element within the array that is strictly equal (the same method used by the === operator) to the searchElement, or -1 if none is found.

> Note: Unlike `Array.prototype.indexOf` there is no fromIndex used start the search at, there is no handling of sparse arrays.

## Iteration methods
In addition to `Array.prototype` iteration methods a boosted array contains the following additional fast methods.

> Notice the dollar sign for boosted methods.

### BoostArray.prototype.$forEach(callback)
Calls the callback function for each element in the array in ascending order.

> Note: Unlike `Array.prototype.forEach` there is no thisArg used for callback binding, there is no handling of sparse arrays, and the callback function is invoked with only the element value (i.e. no element index or reference to the original array).

### BoostArray.prototype.$filter(callback)
Creates a new ordinary array with all of the elements of this array for which the provided filtering function returns true.

> Note: Unlike `Array.prototype.filter` there is no thisArg used for callback binding, there is no handling of sparse arrays, and the callback function is invoked with only the element value (i.e. no element index or reference to the original array).
> Also note that unless you have boosted the Array.prototype as discussed above the returned value will not have the boosted methods attached.

### BoostArray.prototype.$map(callback)
Creates a new ordinary array with the results of calling a provided function on every element in this array.

> Note: Unlike `Array.prototype.map` there is no thisArg used for callback binding, there is no handling of sparse arrays, and the callback function is invoked with only the element value (i.e. no element index or reference to the original array).
> Also note that unless you have boosted the Array.prototype as discussed above the returned value will not have the boosted methods attached.

### BoostArray.prototype.$reduce(callback, initialValue)
Apply a the callback function against each value of the array (in ascending order) reducing it to a single value.

> Note: Unlike `Array.prototype.reduce` the initialValue is not optional, there is no handling of sparse arrays, and the callback function is invoked with only the element value (i.e. no element index or reference to the original array).

# Benchmarks

For benchmarks see [Hypercubed/ArraySpeedTests](https://github.com/Hypercubed/ArraySpeedTests)

# Contributions

Pull requests are appreciated.  However, remember keep it fast by:

1. no callback binding,
2. no type checking,
3. no element index or reference to the original array.

# Acknowledgements

BoostArray was inspired by [PowerArray](https://github.com/techfort/PowerArray) by Joe Minichino, [fast.js](https://github.com/codemix/fast.js/tree/master), [ramda](https://github.com/ramda/ramda), and [lodash](https://github.com/lodash/lodash/).  Much of the Array sub-classing code based on *[Extending JavaScript Arrays While Keeping Native Bracket-Notation Functionality](http://www.bennadel.com/blog/2292-extending-javascript-arrays-while-keeping-native-bracket-notation-functionality.htm)* by Ben Nadel.

## License
2014 Jayson Harshbarger

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
