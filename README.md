1️⃣ What is the difference between var, let, and const?
Ans: Here are the differences between var, let, and const:

var: It is function-scoped. Variables declared with var can be reassigned and redeclared.

let: It is block-scoped. Variables declared with let can be reassigned but not redeclared.

const: It is also block-scoped. Variables declared with const cannot be reassigned or redeclared.

JavaScript
// Example:
var a = 10;
var a = 20; // Allowed

let b = 10;
b = 20; // Allowed
// let b = 30; // Not allowed

const c = 10;
// c = 20 // Not allowed

2️⃣ What is the spread operator (...)?
Ans: The spread operator is used for expanding an array or object. It can be used to copy arrays, merge multiple arrays, and pass array elements as individual arguments to a function.

JavaScript
// Copying array
const number = [10, 20, 30];
const copyNumber = [...number]; // Result: [10, 20, 30]

// Merging array
const fruits = ["apple", "banana"];
const veggies = ["carrot", "potato"];
const groceryList = [...fruits, ...veggies, "milk"]; 
// Result: ["apple", "banana", "carrot", "potato", "milk"]

3️⃣ What is the difference between map(), filter(), and forEach()?
Ans: Here is the difference between map(), filter(), and forEach():

map(): Creates a new array with the results of calling a function on every element. It updates and transforms the elements.

filter(): Selects specific items based on a condition and returns a new array containing only the items that passed the test.

forEach(): Executes a function for every item in an array but does not return anything. It works like a simple loop.

JavaScript
// map() example
const numbers = [10, 20, 30];
const doubled = numbers.map(num => num * 2); // [20, 40, 60]

// filter() example
const nums = [1, 2, 3, 4];
const evens = nums.filter(num => num % 2 === 0); // [2, 4]

// forEach() example
const list = [1, 2, 3];
list.forEach(num => console.log(num)); // result: 1, 2, 3

4️⃣ What is an arrow function?
Ans: An arrow function is a shorter and modern syntax for writing functions in JavaScript (introduced in ES6). It makes the code cleaner and easier to read.

JavaScript
const add = (a, b) => {
  return (a + b);
};

5️⃣ What are template literals?
Ans: Template literals are a modern way to handle strings in JavaScript using backticks (`).

Benefits: Easily insert variables using ${}, supports multi-line strings, and provides cleaner syntax.

JavaScript
const name = "Jony";
const age = 22;
const message = `My name is ${name} and I am ${age} years old.`;
// Result: My name is Jony and I am 22 years old.
