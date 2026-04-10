class Employee {
    constructor(name,position, email) {
        this.name = name;
        this.position = position;
        this.email = email;
    }
    getinfo() {
        return `Name: ${this.name}, Position: ${this.position}, Email: ${this.email}`;
    }
}

export default Employee;