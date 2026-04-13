/**
 * Clase que gestiona los empleados dentro de un área específica[cite: 13].
 */
class Deparment {
    // El constructor recibe el nombre del departamento y opcionalmente un array de empleados
    // (Se añade un arreglo vacío por defecto para que no falle al instanciar solo con el nombre)
    constructor(name, employees = []) {
        // Asignamos el nombre a la propiedad del departamento
        this.name = name;
        // Asignamos el arreglo de empleados
        this.employees = employees;
    }
    
    // Método para agregar un nuevo objeto Empleado a este departamento
    addEmployee(employee) {
        // Lo añadimos al arreglo local
        this.employees.push(employee);
    }
    
    // Método para obtener a todos los empleados de este departamento
    getEmployees() {
        // Devolvemos el arreglo completo para que en getEnterpriseData() 
        // se genere un JSON válido en lugar de un texto concatenado con '\n'
        return this.employees;
    }

}

// Habilitamos la exportación de esta clase
export default Deparment;