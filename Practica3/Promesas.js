function verificarUsuario(usuario){
    //Retorna promesa aq
    return promesa = new Promise((resolve, reject) =>{
        if(usuario === 'admin')
            resolve("Acceso concedido");
        else
            reject("Acceso Denegado"); 
})};

// usa .then() y catch() para manejar el resultado

verificarUsuario("admin")
.then (res => console.log(res))
.catch(err => console.log(err));

verificarUsuario("Ivan")
.then(res => console.log(res))
.catch(err => console.log(err));