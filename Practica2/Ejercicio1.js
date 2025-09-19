const persona = {
    nombre: "Ivan Isay",
    edad: 37,
    direccion: {
        cuidad: "Qro",
        pais: "MX"
    }

};

let {nombre, edad, direccion:{cuidad, pais} }= persona ;

let saludo = "Hola me llamo " + nombre + ", tengo " + edad + " años y vivo en " + cuidad + ".";

console.log(saludo);



