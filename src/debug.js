let { predicateFor } = common = require('./index')


function debug1() {
  let x = predicateFor("a")

  console.log(x);
}

debug1();