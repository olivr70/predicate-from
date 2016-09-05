/* eslint-env node, mocha */

let chai = require('chai')
let expect = chai.expect

let predicateFrom = require("../lib/main.cjs.js")

describe('predicateFrom', function () {
  let isEven = function (x) { return x % 2 === 0 }
  it("should leave a function untouched", () => {
    expect(predicateFrom(isEven)).to.be.a.function;
    expect(predicateFrom(isEven)).to.equal(isEven);
    expect(predicateFrom(isEven)(4)).to.be.true;
    expect(predicateFrom(isEven)(3)).to.be.false;
  });
  it("should convert a string to a predicate", () => {
    expect(predicateFrom('a')).to.be.a.function;
    expect(predicateFrom('a')("a")).to.be.true;
    expect(predicateFrom('a')("aa")).to.be.false;
  });
  it("should convert a number to a predicate", () => {
    expect(predicateFrom(1)).to.be.a.function;
    expect(predicateFrom(1)(1)).to.be.true;
    expect(predicateFrom(1)(2)).to.be.false;
  });
  it("should convert a boolean to a predicate", () => {
    expect(predicateFrom(true)).to.be.a.function;
    expect(predicateFrom(true)(true)).to.be.true;
    expect(predicateFrom(true)(false)).to.be.false;
    expect(predicateFrom(false)(false)).to.be.true;
    expect(predicateFrom(false)(true)).to.be.false;
  });
  it("should convert a regular expression to a predicate", () => {
    let digits = /[0-9]+/
    let onlyDigits = /^[0-9]+$/
    expect(predicateFrom(digits)).to.be.a.function;
    expect(predicateFrom(digits)('0')).to.be.true;
    expect(predicateFrom(digits)('01232')).to.be.true;
    expect(predicateFrom(digits)('aa 01232 bb')).to.be.true;
    expect(predicateFrom(digits)('abcd')).to.be.false;

    expect(predicateFrom(onlyDigits)('01232')).to.be.true;
    expect(predicateFrom(onlyDigits)('a 01232')).to.be.false;
    expect(predicateFrom(onlyDigits)('01232 b')).to.be.false;
  });
  it("should return a range predicate from a pair of numbers", () => {
    expect(predicateFrom(0,10)(0)).to.be.true;
    expect(predicateFrom(0,10)(5)).to.be.true;
    expect(predicateFrom(0,10)(9)).to.be.true;
    expect(predicateFrom(0,10)(-1)).to.be.false;
    expect(predicateFrom(0,10)(10)).to.be.false;
  });
  it("should return a range predicate from a pair of strings", () => {
    expect(predicateFrom('E','H')('E')).to.be.true;
    expect(predicateFrom('E','H')('Echo')).to.be.true;
    expect(predicateFrom('E','H')('Foxtrot')).to.be.true;
    expect(predicateFrom('E','H')('Golf')).to.be.true;
    expect(predicateFrom('E','H')('Hotel')).to.be.false;
    expect(predicateFrom('E','H')('Alpha')).to.be.false;
  });
  it("should convert an array of primitive values to a or predicate", () => {
    expect(predicateFrom([])('a')).to.be.true;
    expect(predicateFrom(['a'])('a')).to.be.true;
    expect(predicateFrom(['a', 'b'])('a')).to.be.true;
    expect(predicateFrom(['a', 'b'])('c')).to.be.false;
  });
  it("should convert a plain JS object with native properties to a predicate", () => {
    expect(predicateFrom({ a: 1 })).to.be.a.function;
    expect(predicateFrom({ a: 1 })({ a: 1 })).to.be.true;
    expect(predicateFrom({ a: 1 })({ a: 1, b: 2 })).to.be.true;
    expect(predicateFrom({ a: 1 })({ a: 2 })).to.eq(false);
  });
  it("should convert an array of object to a predicate", () => {
    let arg = [{ a: 1 }, {b:2}];
    expect(predicateFrom(arg)({a:1})).to.be.true;
    expect(predicateFrom(arg)({b:2})).to.be.true;
    expect(predicateFrom(arg)({a:1,b:2})).to.be.true;
    expect(predicateFrom(arg)({a:9,b:2})).to.be.true;
    expect(predicateFrom(arg)({a:1,b:9})).to.be.true;
    expect(predicateFrom(arg)({a:9,b:9})).to.be.false;
    expect(predicateFrom(arg)({})).to.be.false;
  });
});

