/**
 * Created by carolineperier on 4/05/2017.
 */
function myFunction() {
    console.log('Function was called');
}

var myString = "string!";

module.exports.myFunction = myFunction;
module.exports.myString = myString;

//myFunction();