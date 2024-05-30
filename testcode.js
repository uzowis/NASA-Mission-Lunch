const fruits = {
    vitaminA : 'Carrot',
    vitaminB : 'Mango',
    vitaminC : 'Udara',
    vitaminD : 'Okro'
}

console.log(`First Fruits Object : ${JSON.stringify(fruits)}`);
console.log('');

const newFruits = Object.assign(fruits, {
    vitaminF : 'Ginger',
    vitaminY : 'PawPaw',
    vitaminK : 'Apple'
});

console.log(`First Fruits Object : ${JSON.stringify(fruits)}`);
console.log('');
console.log(`New Fruits Object : ${JSON.stringify(newFruits)}`);
