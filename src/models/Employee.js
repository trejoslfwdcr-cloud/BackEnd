// Clase que representa un empleado de la empresa
class Employee {
    // El constructor recibe el nombre, el puesto (posición) y el correo electrónico al instanciar un Empleado
    constructor(name,position, email) {
        // Asignamos el nombre recibido a la propiedad del empleado
        this.name = name;
        // Asignamos el puesto (cargo) recibido a la propiedad del empleado
        this.position = position;
        // Asignamos el correo electrónico recibido a la propiedad del empleado
        this.email = email;
    }
    
    // Método que devuelve una cadena de texto formateada con la información principal del empleado
    getinfo() {
        // Retornamos un string literal que interpola las propiedades nombre, puesto y correo
        return `Name: ${this.name}, Position: ${this.position}, Email: ${this.email}`;
    }
}

// Exportamos la clase para que pueda ser importada desde los departamentos y el controlador principal
export default Employee;