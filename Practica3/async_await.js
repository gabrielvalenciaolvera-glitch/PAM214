function simularPeticionAPI(){
    return new Promise(resolve =>{
        setTimeout(() => {
            resolve("Datos recibidos correctamente");
        },5000);
    })
}

async function obtenerDatos() {
     //Usa await para esperar la promesa de simulationPeticion
    let espera = await simularPeticionAPI(); 
   
    console.log(espera);
    // imprimir el resultado
}

//usa la funcion async

console.log(obtenerDatos());