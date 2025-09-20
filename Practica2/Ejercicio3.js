const personal = [
    {nombre: "Ana", edad: 22},
    {nombre: "Luis", edad: 35},
    {nombre: "Maria", edad: 28}
];

let person = personal.find(element => element.nombre == "Luis");

console.log(person);   

let nombreEdad = personal.forEach(element => console.log( element));

let SumaEdades = personal.reduce((acc, num) => {
        acc += num.edad;
        return acc;
    },
    0
);
console.log(SumaEdades);