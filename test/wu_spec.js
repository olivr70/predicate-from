/* eslint-env node, mocha */

let chai = require('chai')
let expect = chai.expect
chai.should()

let pf = require('../lib/main.cjs.js')

let wu = require('wu')

describe("use with wu.js", () => {
  it('should test a wu collection', () => {
    let isOdd = pf([1,3,5])
    expect(wu.every(isOdd)([1,2,3])).to.be.false;
    expect(wu([1,2,3]).every(isOdd)).to.be.false;
  })
  it('should filter to wu collection', () => {
    let aToC = pf('A','D')
    expect([...(wu.filter(aToC)( ["Alpha","Gamma","Charlie"]))]).to.deep.equal(["Alpha","Charlie"]);
    expect([...(wu(["Alpha","Gamma","Charlie"]).filter(aToC))]).to.deep.equal(["Alpha","Charlie"]);
  })

});