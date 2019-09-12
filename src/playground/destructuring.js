// console.log('destructuring');

// const person = {
//     name: 'Andrew',
//     age: 26,
//     location: {
//         city: 'Philadelphia',
//         temp: 92
//     }
// };

// const {city, temp: temperature} = person.location;

// console.log(`It's ${temperature} in ${city}.`);


// const book = {
//     title: 'Ego is the enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };


// const {name: publisherName = 'Self-Pubished' } = book.publisher


// console.log(publisherName);


// ARRAY DESCTRUCTURING

const address = ["1299 S Juniper Street", "Philadelphia", "Pennsylvania", "19147"];
const [,city, state,] = address;
console.log(`You are in ${city} ${state}`);

const item = ['Coffee (hot)', '$2.00','$2.50', '$2.75'];

const [product, , price] = item;

console.log(`A medium ${product} costs ${price}`);

