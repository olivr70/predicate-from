
## Intention

As functional programming becomes more idiomatic in Javascript, it becomes
more common to pass conditions as arguments to functions like filter() and likes (dropWhile(), exclude()...)
over collections of any sort.

Arrow functions in ES6 provide an efficient syntax for expressing complex predicates,
but may not be very redable for complex conditions.

As it is very common to filter collections of objects, predicateFrom provides a very
easy and expression way to express conditions for objects

### Predicates from predicates
If passed a function, predicateFrom will do nothing and return it 

This behaviour allows nesting functions in complex objet predicates 


## Getting started

All examples suppose that **predicate-from** module is imported as predicateFrom
``` Javascript
let pf = require('predicate-from')
```

### Predicates from simple values
When passed a primitive value (string, number, boolean of Symbol), **predicateFrom**
will return a predicate which tests with === operator

Mostly used indirectly when building complex predicates
```
pf('Paris')('London') // false
pf(1)(2) // false
pf(false)(true) // false
```


### Predicates from an array of values
Array are used to express an OR condition. 

***predicateFrom*** will be invoked on each value of the provided array
The resulting function will invoke each predicate on its argument and return
true immediately if one of them is satisfied
``` Javascript
pf([ 'Paris', 'London'] )('London') // true
```

### Predicates from object literals
When passed an Object literal, **predicateFor**, each key/value pair
will be used to generate a predicate for that specific property.
If multiple properties are set, then the resulting predicate will return true only
if all the predicate for each properties are satisfied

``` Javascript
let john = { name:'Smith, John'
          ,age:45
          ,job:'carpenter'
          ,address: { city:'Paris', country:'USA', state:'US-TX'} }

pf({job: 'carpenter'})(john) // true
pf({address: { city:'Paris' }})(john) // true
pf({job:'carpenter', address: { country:'US' }})(john) // true
// but this will fail
pf({job:'carpenter', address: { country:'FR' }})(john) // false
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


### putting is all together
``` Javascript
let inParisUSA = pf({city:'Paris',country:'US'})

// carpenters and plumbers in Paris, USA
pf( { job:['carpenter','plumber], address:inParisUSA})(john) // true
// all Smith in Texas
pf( {name: x => x.startsWith('Smith'), address:{state:'US-TX'}})
``` 
