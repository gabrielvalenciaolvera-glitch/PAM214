document.write("<h1>hello word</h1>")

//tipos de datos

"hello Word"//String
'Hello Word'//String


console.log({"username":"ryan" "score":70.4})
1000000// number
-2,3

// boolean
true
false

//array
['joe','ryan','marthe']
[1,2,3]
[true,false,true,false]

// object
/*
{
    "username": 'ryan',
    "score": 70.4,
    "hours": 14,
    "proffesional": true
}
{
    "username": 'joe',
    "score": 0.4,
    "hours": 1,
    "proffesional": false

}
*/
//variable

 var nameuser = "jhon";
 let lastname = "carter";

nameuser = "pepe";

const PI = 3.1415;



console.log(PI);
 console.log(lastname);

//camelcase

let userName = "gordon";


// OPERADORES---------------------------

let NumberOne = 50;
let NumberTwo = 100;

let result = NumberOne + NumberTwo;
console.log(result);

let Name = "Jhon";
let lastName = "Carter";

let CompleteName = Name + LastName;
console.log(CompleteName);


let NumOne = 50;
let NumTwo = 100;

let res = NumOne > NumTwo;
console.log(res);



let passwordDBD = 'holaMundo'

let input = 'asdasdasdadassdasdsa'

let Resul = input == passwordDBD;

console.log(Resul);
//IF----------------------------------

if (result == true){
    console.log("login correcto");
}else{
    console.log("Constraseña incorrecta");
}


let score = 20;

if (score > 30){
    console.log("You need to practice more");
}else if(score > 15){
    console.log("Estas mejorando");
}else{
    console.log("You need to follow this tutorial");
}
//--------------Switch Case---------------

let typeCard = 'Debid Card';

switch(typeCard){
    case'Debid Card':
        console.log('This is a debid card');
        break;
    case 'Credit Card':
        console.log("This is a Credit Card");
        break;
    default:
        console.log("No card");        
        
}



// BUCLES------------------------------------------------


//while

let count = 50;

while(count > 0){
    console.log(count);
    count = count - 1;
}


//For

let names = ['ryan',  'joe', 'pepe'];

console.log(names.length);


for (let i = 0; i < names.length; i++){
    console.log("hola "+names[i]);
}



// Funciones-----------------------------------------------

function greeting(nombre){
    console.leg( 'Hello' + nombre);
}

greeting('Gabo');

function sumar(n1,n2){
    console.log(n1 + n2);
}

sumar(5,6);

