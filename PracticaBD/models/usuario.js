export class Usuario {
    constructor(id, nombre, fechaCreacion) {
        this.id = id;
        this.nombre = nombre;
        this.fechaCreacion = fechaCreacion || new Date().toISOString();
    }

    static validar(nombre) {
        if (!nombre || nombre.trim().length === 0) {
            throw new Error("El nombre no puede estar vacío");
        }
        if (nombre.trim().length > 50) {
            throw new Error("El nombre no debe exceder los 50 caracteres");
        }
        return true;
    }
}
