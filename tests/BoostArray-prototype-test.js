
var BoostArray = require('../BoostArray.js'),
		chai = require('chai'),
		expect = chai.expect,
		sinon = require('sinon');

describe('BoostArray(Array.prototype)', function() {
	BoostArray(Array.prototype);

	describe('constructor', function() {

		it('should add a $boosted flag', function() {
			var myArray = [];
			expect(myArray.$boosted).to.equal(true);
		});

		it('should add a isBoostedArray method', function() {
			expect(BoostArray.isBoostedArray([1,2,3])).to.be.true();
			expect(BoostArray.isBoostedArray(BoostArray())).to.be.true();
		});

	});

	describe('#forEach', function() {
		var plainArray, spy;

		beforeEach(function() {
			plainArray = [1,2,3,4,5,6];
			spy = sinon.spy();
		});

		it('should run on plain array', function() {
			plainArray.$forEach(spy);
			expect(spy.callCount).to.equal(6);
		});

	});

	describe('#map', function() {
		var plainArray, spy;

		beforeEach(function() {
			plainArray = [1,2,3,4,5,6,15];
			spy = sinon.spy(function(d) {
				var s = [];
				if (d % 3 === 0) { s.push('Fizz'); }
				if (d % 5 === 0) { s.push('Buzz'); }

				return s.length > 0 ? s.join(' ') : d;
			});
		});

		it('should run on boosted array', function() {
			var result = plainArray.$map(spy);
			expect(spy.callCount).to.equal(7);
			expect(result).to.deep.equal([1,2,'Fizz',4,'Buzz','Fizz','Fizz Buzz']);
		});

	});

	describe('#reduce', function() {
		var plainArray, spy;

		beforeEach(function() {
			plainArray = [1,2,3,4,5,6];
			spy = sinon.spy(function(p, d) {
				return p+d;
			});
		});

		it('should run on boosted array', function() {
			var result = plainArray.$reduce(spy, 0);
			expect(spy.callCount).to.equal(6);
			expect(result).to.equal(21);
		});

	});

	describe('#filter', function() {
		var plainArray, spy;

		beforeEach(function() {
			plainArray = [1,2,3,4,5,6,15];
			spy = sinon.spy(function(d) {
				return d % 3 === 0 || d % 5 === 0;
			});
		});

		it('should run on boosted array', function() {
			var result = plainArray.$filter(spy);
			expect(spy.callCount).to.equal(7);
			expect(result).to.deep.equal([3,5,6,15]);
		});

	});
});
