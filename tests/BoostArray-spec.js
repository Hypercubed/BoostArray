
var BoostArray = require('../BoostArray.js'),
		chai = require('chai'),
		expect = chai.expect,
		sinon = require('sinon');

describe('BoostArray', function() {

	describe('constructor', function() {

		it('should create an new array', function() {
			var myArray = BoostArray();
			expect(myArray).to.be.instanceof(Array);
		});

		it('should attach to an existing array', function() {
			var myArray = BoostArray([1,2,3]);
			BoostArray(myArray)
			expect(myArray).to.be.instanceof(Array);
			expect(myArray.length).to.equal(3);
		});

	});

	describe('#forEach', function() {
		var plainArray, boostedArray, spy;

		beforeEach(function() {
			plainArray = [1,2,3,4,5,6];
			boostedArray = BoostArray(plainArray.slice(0));
			spy = sinon.spy();
		})

		it('should run on boosted array', function() {
			boostedArray.$forEach(spy);
			expect(spy.callCount).to.equal(6);
		});

		it('can be invoked on plain array', function() {
			BoostArray.$forEach.call(plainArray, spy);
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
			var result = BoostArray.$map.call(plainArray, spy);
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
		})

		it('should run on boosted array', function() {
			var result = boostedArray.$reduce(spy, 0);
			expect(spy.callCount).to.equal(6);
			expect(result).to.equal(21);
		});

		it('can be invoked on plain array', function() {
			var result = BoostArray.$reduce.call(plainArray, spy, 0);
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
		})

		it('should run on boosted array', function() {
			var result = boostedArray.$filter(spy);
			expect(spy.callCount).to.equal(7);
			expect(result).to.deep.equal([3,5,6,15]);
		});

		it('can be invoked on plain array', function() {
			var result = BoostArray.$filter.call(plainArray, spy);
			expect(spy.callCount).to.equal(7);
			expect(result).to.deep.equal([3,5,6,15]);
		});

	});

	describe('#indexOf', function() {
		var plainArray, boostedArray, spy;

		beforeEach(function() {
			plainArray = [1,2,3,4,'buzz',6];
			boostedArray = BoostArray(plainArray.slice(0));
		})

		it('should run on boosted array', function() {
			var result = boostedArray.$indexOf(3);
			expect(result).to.equal(2);
		});

		it('can be invoked on plain array', function() {
			var result = BoostArray.$indexOf.call(plainArray, 3);
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
