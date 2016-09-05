
## Intention

As functional programming becomes more idiomatic in Javascript, it becomes
more common to pass conditions as arguments to functions like filter() and likes (dropWhile(), exclude()...)
over collections of any sort.

Arrow functions in ES6 provide an efficient syntax for expressing complex predicates,
but may not be very redable for complex conditions.

As it is very common to filter collections of objects, predicateFrom provides a very
easy and expression way to express conditions for objects

## Getting started

All examples suppose that **predicate-from** module is imported as predicateFrom
``` Javascript
let pf = require('predicate-from')
```

### Predicates from predicates
If passed a function, predicateFrom will do nothing and return it 

This behaviour allows nesting functions in complex objet predicates, where
**predicateFrom** is invoked recursively.

This is very useful for expressing complex predicates with arrow functions
or using curried comparison predicates

``` Javascript
// considering greaterThan is defined and curried
pf({age: greaterThan(45) }
```

### Predicates from simple values
When passed a primitive value (string, number, boolean of Symbol), **predicateFrom**
will return a predicate which tests with === operator

Mostly used indirectly when building complex predicates
``` Javascript
pf('Paris')('London') // false
pf(1)(2) // false
pf(false)(true) // false
```

### Predicates from regular expressions
When passed a RegExp, **predicateFrom**
will return a predicate which simply returns the result of [RegExp.test()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)

**Warning**:test() returns true for a match anywhere in the tested string. For a full match, be sure
to use RegExp special position characters ^ and $

``` Javascript
pf(/[0-9]+/)('abcd 1234') // true, partial match at index 5
pf(/^[0-9]+$/)('abcd 1234') // false, start of string is not a digit
```

### Predicates from ranges
When passed 2 numbers or 2 srings, **predicateFrom**
will return a range predicate which tests arg >= a && arg < b

Note: is also works with strings, which can be useful with ISO dates

Mostly used with an explicit invocation of **predicateFrom** for a property
```
pf({age:pf(18,35)})({name:'John',age:32}) // true
pf({name:pf('A','D')})({name:'John',age:32}) // false, only accepts names beginning with A, B or C
```

### Predicates from an array of values
Array are used to express an OR condition. 

***predicateFrom*** will be invoked on each value of the provided array
The resulting function will invoke each predicate on its argument and return
true immediately if one of them is satisfied
``` Javascript
pf([ 'Paris', 'London'] )('London') // true
pf([ 'Paris', x => x.startsWith('L') ] )('London') // true
```

### Predicates from object literals
When passed an Object literal, **predicateFor**, each key/value pair
will be used to generate a predicate for that specific property.
If multiple properties are set, then the resulting predicate will return true only
if all the predicate for each properties are satisfied.

For deep properties, just nest objects 

``` Javascript
let john = { name:'Smith, John'
          ,age:45
          ,job:'carpenter'
          ,address: { city:'Paris', country:'USA', state:'US-TX'} }

pf({job: 'carpenter'})(john) // true
pf({address: { city:'Paris' }})(john) // true
// nested objects are converted to predicates 
pf({job:'carpenter', address: { country:'US' }})(john) // true
// but this will fail
pf({job:'carpenter', address: { country:'FR' }})(john) // false
```




### putting is all together
``` Javascript
let inParisUSA = pf({city:'Paris',country:'US'})

// carpenters and plumbers in Paris, USA
pf( { job:['carpenter','plumber], address:inParisUSA})(john) // true
// all Smith in Texas
pf( {name: x => x.startsWith('Smith'), address:{state:'US-TX'}})
``` 
