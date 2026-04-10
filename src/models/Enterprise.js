/**
 * Clase principal que representa la Empresa.
 * Actúa como el orquestador de departamentos[cite: 7].
 */
class Enterprise {
    constructor(name) {
        this.name = name;
        this.departments = [];
    }
addDepartment(department) {
        this.departments.push(department);
    }
getEnterpriseData() {
        return {
            enterpiseName: this.name,
            departments: this.departments.map(department => ({
                name: department.name,
                employees: department.getEmployees()
            }))
        }
}
}

export default Enterprise;
