export class EmployeeModel {
    id: number;  // Add this line for the unique identifier
    empId: number;
    name: string;
    city: string;
    state: string;
    emailId: string;
    contactNo: string;
    address: string;
    pinCode: string;

    constructor() {
        this.id = 0;  // Initialize id (or set it to null if you prefer)
        this.address = '';
        this.city = '';
        this.contactNo = '';
        this.emailId = '';
        this.empId = 1;  // Ensure this starts from 1 as per your requirement
        this.name = '';
        this.state = '';
        this.pinCode = '';
    }
}
