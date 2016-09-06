/* eslint-env node, mocha */

let chai = require('chai')
let expect = chai.expect
chai.should()

let pf = require('../lib/main.cjs.js')

let I = require('immutable')

describe("use with immutable.js", () => {
  it('should test an Immutable.js List', () => {
    let isOdd = pf([1,3,5])
    expect(I.List.of(1,2,3).every(isOdd)).to.be.false;
  })
  it('should filter an Immutable.js List', () => {
    let aToC = pf('A','D')
    expect(I.List.of("Alpha","Gamma","Charlie").filter(aToC).toArray()).to.deep.equal(["Alpha","Charlie"]);
  })

});