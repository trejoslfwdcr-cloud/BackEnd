/**
 * Clase principal que representa la Empresa.
 * Actúa como el orquestador de departamentos[cite: 7].
 */
class Enterprise {
    // Constructor que recibe el nombre con el que se instanciará la Empresa
    constructor(name) {
        // Asigna el nombre a la propiedad de la clase
        this.name = name;
        // Inicializa un arreglo vacío que contendrá los departamentos de la empresa
        this.departments = [];
    }
    
    // Método público para añadir un objeto departamento al arreglo interno
    addDepartment(department) {
        // Introduce el nuevo departamento al final del arreglo
        this.departments.push(department);
    }
    
    // Método que genera y devuelve una representación en formato objeto de toda la empresa
    getEnterpriseData() {
        // Retorna un objeto con las propiedades fundamentales estructuradas
        return {
            // Asigna el nombre de la empresa (corregido "enterpiseName" a "enterpriseName")
            enterpriseName: this.name,
            // Mapea la lista de departamentos para obtener un sub-objeto de cada uno
            departments: this.departments.map(department => ({
                // Nombre específico del departamento
                name: department.name,
                // Llama al método del departamento para adjuntar su lista de empleados
                employees: department.getEmployees()
            }))
        }
    }
}

// Permite que la clase Enterprise sea importada por otros módulos
export default Enterprise;
