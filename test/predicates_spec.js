/* eslint-env node, mocha */

let chai = require('chai')
let expect = chai.expect
chai.should()

let pf = require('../lib/main.cjs.js')

let is = require('predicates')

describe("use with predicates", () => {
  let john = {name:'John', age:45 }
  let jimmy = {name:'Jimmy', age:22 }
  it('should accept predicates', () => {
    expect(pf({name:is.string})(john)).to.be.true;
    expect(pf({age:is.string})(john)).to.be.false;
    expect(pf({age:is.greater(40)})(john)).to.be.true;
    expect(pf({age:is.greater(40)})(jimmy)).to.be.false;
  })

});