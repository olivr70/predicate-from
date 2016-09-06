/* eslint-env node, mocha */

let chai = require('chai')
let expect = chai.expect
chai.should()

let pf = require('../lib/main.cjs.js')

let R = require('ramda')

describe("use with ramda", () => {
  it('should filter a ramda collection', () => {
    let isOdd = pf([1,3,5])
    let aToC = pf('A','D')
    expect(R.all(isOdd, [1,2,3])).to.be.false;
    expect(R.filter(aToC, ["Alpha","Gamma","Charlie"])).to.deep.equal(["Alpha","Charlie"]);
  })

});