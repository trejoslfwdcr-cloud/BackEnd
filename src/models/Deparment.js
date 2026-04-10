/**
 * Clase que gestiona los empleados dentro de un área específica[cite: 13].
 */
class Deparment {
    constructor(name, employees) {
        this.name = name;
        this.employees = employees;
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
getEmployees() {
        return this.employees.map(employee => employee.getinfo()).join('\n');
}

}

export default Deparment;