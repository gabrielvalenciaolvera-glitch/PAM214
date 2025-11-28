import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

class DatabaseService {
  constructor() {
    this.db = null;
    this.storageKey = 'usuarios';
  }

  async initialize() {
    if (Platform.OS === 'web') {
      console.log('Usando LocalStorage para web');
    } else {
      console.log('Usando SQLite para móvil');
      this.db = await SQLite.openDatabaseAsync('miapp.db');
      await this.db.execAsync(
        `CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
        );`
      );
    }
  }

  async getAll() {
    if (Platform.OS === 'web') {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } else {
      // Nota: La consulta SQL en la imagen tiene un error ("SELECT FROM usuarios..."). Se usa una versión corregida para Select All.
      // return await this.db.getAllAsync('SELECT FROM usuarios ORDER BY id DESC');
      return await this.db.getAllAsync('SELECT * FROM usuarios ORDER BY id DESC'); 
    }
  }

  async add(nombre) {
    if (Platform.OS === 'web') {
      const usuarios = await this.getAll();
      const nuevoUsuario = {
        id: Date.now(),
        nombre,
        fecha_creacion: new Date().toISOString()
      };
      usuarios.unshift(nuevoUsuario);
      localStorage.setItem(this.storageKey, JSON.stringify(usuarios));
      return nuevoUsuario;
    } else {
      const result = await this.db.runAsync(
        'INSERT INTO usuarios (nombre) VALUES(?)',
        nombre
      );
      return {
        id: result.lastInsertRowId,
        nombre,
        fecha_creacion: new Date().toISOString()
      };
    }
  }

  

async update(id, nombre) {
  if (Platform.OS === 'web') {
    const usuarios = await this.getAll();
    const usuarioIndex = usuarios.findIndex(u => u.id === id);
    if (usuarioIndex !== -1) {
      usuarios[usuarioIndex].nombre = nombre;
      localStorage.setItem(this.storageKey, JSON.stringify(usuarios));
      return usuarios[usuarioIndex];
    }
    throw new Error('Usuario no encontrado');
  } else {
    const result = await this.db.runAsync(
      'UPDATE usuarios SET nombre = ? WHERE id = ?',
      nombre, id
    );
    if (result.changes > 0) {
      return {
        id,
        nombre,
        fecha_creacion: new Date().toISOString()
      };
    }
    throw new Error('Usuario no encontrado');
  }
}

async delete(id) {
  if (Platform.OS === 'web') {
    const usuarios = await this.getAll();
    const usuarioIndex = usuarios.findIndex(u => u.id === id);
    if (usuarioIndex !== -1) {
      const usuarioEliminado = usuarios.splice(usuarioIndex, 1)[0];
      localStorage.setItem(this.storageKey, JSON.stringify(usuarios));
      return usuarioEliminado;
    }
    throw new Error('Usuario no encontrado');
  } else {
    const result = await this.db.runAsync(
      'DELETE FROM usuarios WHERE id = ?',
      id
    );
    if (result.changes > 0) {
      return { id };
    }
    throw new Error('Usuario no encontrado');
  }
}
}

// Exportar instancia de la clase
export default new DatabaseService();