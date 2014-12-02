
var BoostArray = require('../BoostArray.js'),
		chai = require('chai'),
		expect = chai.expect,
		sinon = require('sinon');

describe('BoostArray', function() {

	describe('constructor', function() {

		it('should be a constructor-like method', function() {
			expect(BoostArray).to.be.a('function');
		});

		it('should add a isArray method', function() {
			expect(BoostArray).to.have.ownProperty('isArray');
			expect(BoostArray.isArray([1,2,3])).to.be.true();
		});

		it('should add a isBoostedArray method', function() {
			expect(BoostArray).to.have.ownProperty('isBoostedArray');
			expect(BoostArray.isBoostedArray([1,2,3])).to.be.false();
			expect(BoostArray.isBoostedArray(BoostArray())).to.be.true();
		});

		it('should create an new array', function() {
			var myArray = BoostArray();
			expect(myArray).to.have.length(0);
			expect(myArray).to.be.instanceof(Array);
			expect(Array.isArray(myArray)).to.equal(true);
		});

		it('should attach to an existing array', function() {
			var myArray = [1,2,3];
			BoostArray(myArray);
			expect(myArray).to.have.length(3);
			expect(myArray).to.be.instanceof(Array);
			expect(Array.isArray(myArray)).to.equal(true);
		});

		it('should add a $boosted flag', function() {
			var myArray = BoostArray();
			expect(myArray.$boosted).to.equal(true);
		});

	});

	describe('#forEach', function() {
		var plainArray, boostedArray, spy;

		beforeEach(function() {
			plainArray = [1,2,3,4,5,6];
			boostedArray = BoostArray(plainArray.slice(0));
			spy = sinon.spy();
		});

		it('should be non-enumerable', function() {
			var myArray = BoostArray([1,2,3]);
			expect(myArray).to.have.ownProperty('$forEach');
			expect(myArray.propertyIsEnumerable('$forEach')).to.be.false();
		});

		it('should run on boosted array', function() {
			boostedArray.$forEach(spy);
			expect(spy.callCount).to.equal(6);
		});

		it('can be invoked on plain array', function() {
			BoostArray.prototype.$forEach.call(plainArray, spy);
			expect(spy.callCount).to.equal(6);
		});

	});

	describe('#map', function() {
		var plainArray, boostedArray, spy;

		beforeEach(function() {
			plainArray = [1,2,3,4,5,6,15];
			boostedArray = BoostArray(plainArray.slice(0));
			spy = sinon.spy(function(d) {
				var s = [];
				if (d % 3 === 0) { s.push('Fizz'); }
				if (d % 5 === 0) { s.push('Buzz'); }

				return s.length > 0 ? s.join(' ') : d;
			});
		});

		it('should run on boosted array', function() {
			var result = boostedArray.$map(spy);
			expect(spy.callCount).to.equal(7);
			expect(result).to.deep.equal([1,2,'Fizz',4,'Buzz','Fizz','Fizz Buzz']);
		});

		it('can be invoked on plain array', function() {
			var result = BoostArray.prototype.$map.call(plainArray, spy);
			expect(spy.callCount).to.equal(7);
			expect(result).to.deep.equal([1,2,'Fizz',4,'Buzz','Fizz','Fizz Buzz']);
		});

	});

	describe('#reduce', function() {
		var plainArray, boostedArray, spy;

		beforeEach(function() {
			plainArray = [1,2,3,4,5,6];
			boostedArray = BoostArray(plainArray.slice(0));
			spy = sinon.spy(function(p, d) {
				return p+d;
			});
		});

		it('should run on boosted array', function() {
			var result = boostedArray.$reduce(spy, 0);
			expect(spy.callCount).to.equal(6);
			expect(result).to.equal(21);
		});

		it('can be invoked on plain array', function() {
			var result = BoostArray.prototype.$reduce.call(plainArray, spy, 0);
			expect(spy.callCount).to.equal(6);
			expect(result).to.equal(21);
		});

	});

	describe('#filter', function() {
		var plainArray, boostedArray, spy;

		beforeEach(function() {
			plainArray = [1,2,3,4,5,6,15];
			boostedArray = BoostArray(plainArray);
			spy = sinon.spy(function(d) {
				return d % 3 === 0 || d % 5 === 0;
			});
		});

		it('should run on boosted array', function() {
			var result = boostedArray.$filter(spy);
			expect(spy.callCount).to.equal(7);
			expect(result).to.deep.equal([3,5,6,15]);
		});

		it('can be invoked on plain array', function() {
			var result = BoostArray.prototype.$filter.call(plainArray, spy);
			expect(spy.callCount).to.equal(7);
			expect(result).to.deep.equal([3,5,6,15]);
		});

	});

	describe('#indexOf', function() {
		var plainArray, boostedArray, spy;

		beforeEach(function() {
			plainArray = [1,2,3,4,'buzz',6];
			boostedArray = BoostArray(plainArray.slice(0));
		});

		it('should run on boosted array', function() {
			var result = boostedArray.$indexOf(3);
			expect(result).to.equal(2);
		});

		it('can be invoked on plain array', function() {
			var result = BoostArray.prototype.$indexOf.call(plainArray, 3);
			expect(result).to.equal(2);
		});

		it('should return -1 if not found', function() {
			var result = boostedArray.$indexOf('fizz');
			expect(result).to.equal(-1);
		});

		it('should return -1 if array is empty', function() {
			var result = BoostArray([]).$indexOf('buzz');
			expect(result).to.equal(-1);
		});


	});

});
