/* eslint-env node, mocha */

let chai = require('chai')
let expect = chai.expect
chai.should()

let pf = require('../lib/main.cjs.js')

let _ = require('lodash')
let fp = require('lodash/fp')

describe("use with lodash", () => {
  it('should filter a lodash collection', () => {
    console.log(_.toArray(_.filter([1,2,3,4, 5,6, 7], pf(2,4))))
    _.toArray(_.filter([1,2,3,4, 5,6, 7], pf(2,4))).should.deep.equal([2,3])
  })

});
describe("use with lodash/fp", () => {
  it('should filter a lodash/fp collection', () => {
    let keep2to4 = fp.filter(pf(2,4));
    keep2to4([1,2,3,4,5,6,7]).should.deep.equal([2,3])
  })

});