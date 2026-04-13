// Importamos los modelos de Empresa, Departamento y Empleado para gestionar sus instancias
import Enterprise from '../models/Enterprise.js';
import Department from '../models/Department.js';
import Employee from '../models/Employee.js';
// Importamos nuestro utilitario que se encarga de leer y escribir en el archivo JSON
import StorageHandler from '../utils/StorageHandler.js';

// Cargamos los datos de nuestro archivo persistente local (si es que existe alguno)
const savedData = StorageHandler.load();
// Intentamos crear una instancia de Enterprise. OJO: hay un error de tipeo en 'savedDta' y la variable tiene el mismo nombre que la clase importada.
const Enterprise = new Enterprise(savedDta?.enterpriseName || 'Tech Solutions Inc.');

// Si efectivamente logramos recuperar datos del archivo
if (savedData) {
    // Recorremos el arreglo de departamentos guardados
    savedData.departments.forEach(dep => {
        // Creamos una nueva instancia de la clase Departamento con el nombre recuperado
        const newDepartment = new Department(dep.name);
        // Si tiene empleados, recorremos el arreglo y los instanciamos de nuevo, añadiéndolos al departamento
        dep.employees.forEach(emp => newDepartment.addEmployee(new Employee(emp.name, emp.position, emp.email)));
        // Añadimos finalmente el departamento armado a nuestra empresa
        myEnterprise.addDepartment(newDepartment);
    });
}

// Inicializamos un nuevo objeto Empresa que sobreescribe la lógica anterior. Esta variable almacena la empresa globalmente.
const myEnterprise = new Enterprise('Tech Solutions Inc.');

// Controlador principal que manejará todas las lógicas y respuestas de nuestra API
class EnterpriseController {

    // Endpoint (Método) para crear un nuevo departamento
    static createDepartment(req, res) {
        // Extraemos la variable "name" (nombre) desde el cuerpo de la petición (JSON)
        const { name } = req.body;
        // Si el usuario no mandó el nombre, le devolvemos un error 400 (Bad Request)
        if (!name) {
            return res.status(400).json({ error: 'Department name is required' });
        }
        // Instanciamos el nuevo departamento
        const newDepartment = new Department(name);
        // Lo añadimos a nuestra empresa global en memoria
        myEnterprise.addDepartment(newDepartment);

        // Guardamos el estado actual (convertido en JSON estructurado) en nuestro archivo
        StorageHandler.save(myEnterprise.getEnterpriseData());
        // Devolvemos la confirmación de la creación con código 201
        res.status(201).json({ message: 'Department created successfully' });
    }
        

    // Endpoint (Método) para agregar un empleado a un departamento que ya exista
    static addEmployee(req, res) {
        // Sacamos del cuerpo de la petición los datos: nombre depto, nombre empleado, posición y email
        const { departmentName, employeeName, position, email } = req.body;
        // Buscamos dentro de la empresa si existe un departamento con ese nombre
        const department = myEnterprise.departments.find(dep => dep.name === departmentName);
        // Si no se encuentra, respondemos con código 404 (Not Found)
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });

            }

        // Agregamos un nuevo empleado a la lista del departamento
        department.addEmployee(new Employee(employeeName, position, email));
        // Sobreescribimos nuestro archivo local con los datos actualizados
        StorageHandler.save(myEnterprise.getEnterpriseData());
        // Devolvemos la respuesta exitosa
        res.status(201).json({ message: 'Employee added successfully' });
        
        // OJO: Estas siguientes 3 líneas estaban duplicadas en tu código y causarán un error ("headers already sent"). Deberías eliminarlas en tu código final.
        const newEmployee = new Employee(employeeName, position, email);
        department.addEmployee(newEmployee);
        res.status(201).json({ message: 'Employee added successfully' });
    }

    // Endpoint (Método) para obtener y consultar la empresa completa
    static getEnterpriseData(req, res) {
        // Llama a la función que agrupa la estructura y usa 'res.json' para mandarla de vuelta al cliente
        res.json(myEnterprise.getEnterpriseData());
    }

    // Endpoint (Método) para eliminar un departamento específico
static deleteDepartment(req, res) {
    // Extraemos el nombre a eliminar desde los parámetros de la URL directamente (/api/departaments/Ventas)
    const { name } = req.params; // Usamos parámetros de URL para identificar el recurso
    // Obtenemos cuántos departamentos hay para verificar después si se borró algo
    const initialLength = myEnterprise.departments.length;
    
    // Dejamos en el arreglo todos los departamentos excepto el que se llame igual al enviado
    myEnterprise.departments = myEnterprise.departments.filter(d => d.name !== name);
    
    // Si la cantidad de elementos quedó igual, quiere decir que no existía el nombre
    if (myEnterprise.departments.length === initialLength) {
        return res.status(404).json({ error: "Departament not Found" });
    }
    
    // Guardamos la eliminación persistiéndola en el archivo
    StorageHandler.save(myEnterprise.getEnterpriseData());
    // Enviamos el mensaje de éxito de la eliminación
    res.json({ message: `Departament '${name}' Deleted correctly` });
}

    // Endpoint (Método) para modificar solamente la posición/puesto de un empleado
static updateEmployee(req, res) {
    // Recuperamos por URL de qué departamento y qué empleado vamos a modificar
    const { deptName, empName } = req.params;
    // En el body esperamos recibir el nuevo puesto en formato JSON
    const { newPosition } = req.body;
    
    // Buscamos primero que el departamento en cuestión realmente exista
    const dept = myEnterprise.departments.find(d => d.name === deptName);
    // Retornamos error 404 si no se encuentra ese departamento
    if (!dept) return res.status(404).json({ error: "Departament not Found" });
    
    // Una vez dentro de ese departamento, buscamos al empleado específico
    const employee = dept.employees.find(e => e.name === empName);
    // Retornamos error 404 si el empleado tampoco existía allí
    if (!employee) return res.status(404).json({ error: "Employee not Found" });
    
    // Actualizamos el atributo del puesto con la información enviada en el body
    employee.position = newPosition;
    
    // Guardamos nuestro árbol de objetos en el almacenamiento local
    StorageHandler.save(myEnterprise.getEnterpriseData());
    // Confirmamos al cliente devolviendo los datos involucrados
    res.json({ message: "Puesto actualizado", employee: empName, newPosition });
}

}

// Exportamos el controlador
export default EnterpriseController;
