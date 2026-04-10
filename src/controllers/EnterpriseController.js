import Enterprise from '../models/Enterprise.js';
import Department from '../models/Department.js';
import Employee from '../models/Employee.js';
import StorageHandler from '../utils/StorageHandler.js';

const savedData = StorageHandler.load();
const Enterprise = new Enterprise(savedDta?.enterpriseName || 'Tech Solutions Inc.');
if (savedData) {
    savedData.departments.forEach(dep => {
        const newDepartment = new Department(dep.name);
        dep.employees.forEach(emp => newDepartment.addEmployee(new Employee(emp.name, emp.position, emp.email)));
        myEnterprise.addDepartment(newDepartment);
    });
}

const myEnterprise = new Enterprise('Tech Solutions Inc.');

class EnterpriseController {

    static createDepartment(req, res) {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Department name is required' });
        }
        const newDepartment = new Department(name);
        myEnterprise.addDepartment(newDepartment);

        StorageHandler.save(myEnterprise.getEnterpriseData());
        res.status(201).json({ message: 'Department created successfully' });
    }
        

    static addEmployee(req, res) {
        const { departmentName, employeeName, position, email } = req.body;
        const department = myEnterprise.departments.find(dep => dep.name === departmentName);
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });

            }

             department.addEmployee(new Employee(employeeName, position, email));
           StorageHandler.save(myEnterprise.getEnterpriseData());
             res.status(201).json({ message: 'Employee added successfully' });

             const newEmployee = new Employee(employeeName, position, email);
        department.addEmployee(newEmployee);
         res.status(201).json({ message: 'Employee added successfully' });
    }

    static getEnterpriseData(req, res) {
        res.json(myEnterprise.getEnterpriseData());
    }

static deleteDepartment(req, res) {
    const { name } = req.params; // Usamos parámetros de URL para identificar el recurso
    const initialLength = myEnterprise.departments.length;
    
    myEnterprise.departments = myEnterprise.departments.filter(d => d.name !== name);
    
    if (myEnterprise.departments.length === initialLength) {
        return res.status(404).json({ error: "Departament not Found" });
    }
    
    StorageHandler.save(myEnterprise.getEnterpriseData());
    res.json({ message: `Departament '${name}' Deleted correctly` });
}

static updateEmployee(req, res) {
    const { deptName, empName } = req.params;
    const { newPosition } = req.body;
    
    const dept = myEnterprise.departments.find(d => d.name === deptName);
    if (!dept) return res.status(404).json({ error: "Departament not Found" });
    
    const employee = dept.employees.find(e => e.name === empName);
    if (!employee) return res.status(404).json({ error: "Employee not Found" });
    
    // Actualizamos el atributo
    employee.position = newPosition;
    
    StorageHandler.save(myEnterprise.getEnterpriseData());
    res.json({ message: "Puesto actualizado", employee: empName, newPosition });
}

}

export default EnterpriseController;
