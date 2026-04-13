// Importamos el módulo 'fs' (File System) de Node.js para interactuar con el sistema de archivos
import fs from 'fs';

// Definimos la ruta constante donde se guardará y leerá el archivo JSON con los datos
const FILE_PATH = './data.json';

// Clase utilitaria para manejar la persistencia de datos (guardar y cargar)
class StorageHandler {

    // Método estático para guardar los datos en el archivo local
    static save(data) {
        try {
            // Convertimos el objeto 'data' a una cadena JSON formateada (con 2 espacios de indentación) 
            // y la escribimos de forma síncrona en el archivo definido por FILE_PATH
            fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
        } catch (error) {
            // Si ocurre algún error durante la escritura, lo capturamos e imprimimos en la consola de errores
            console.error('Error saving data:', error);
        }
    }

    // Método estático para cargar y recuperar los datos del archivo JSON
    static load() {
        try {
            // Verificamos si el archivo existe en la ruta especificada antes de intentar leerlo
            if (fs.existsSync(FILE_PATH)) {
                // Si existe, leemos el contenido del archivo de forma síncrona en formato de texto UTF-8
                const data = fs.readFileSync(FILE_PATH, 'utf-8');
                // Convertimos la cadena JSON leída en un objeto JavaScript y lo retornamos
                return JSON.parse(data);
            }
        } catch (error) {
            // Si ocurre algún error durante la lectura o el parseo del JSON, lo capturamos e imprimimos
            console.error('Error loading data:', error);
        }
        // Si el archivo no existe o hubo un error, retornamos 'null' indicando que no hay datos disponibles
        return null;
    }
}

// Exportamos la clase por defecto para poder utilizarla en otras partes de la aplicación (como los controladores)
export default StorageHandler;
