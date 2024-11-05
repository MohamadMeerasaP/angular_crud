import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeModel } from './model/Employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  employeeForm: FormGroup = new FormGroup({});
  employeeList: EmployeeModel[] = [];

  constructor() {
    this.createForm();
    const oldData = localStorage.getItem("EmpData");
    if (oldData) {
      this.employeeList = JSON.parse(oldData);
    }
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(null),
      name: new FormControl(''),
      city: new FormControl(''),
      address: new FormControl(''),
      contactNo: new FormControl(''),
      emailId: new FormControl(''),
      pinCode: new FormControl(''),
      state: new FormControl(''),
    });
  }

  reset() {
    this.employeeForm.reset();
    this.employeeForm.controls['empId'].setValue(null);
  }

  onSave() {
    if (!this.employeeForm.valid) {
      return;
    }
    this.employeeForm.controls["empId"].setValue(this.employeeList.length + 1);
    this.employeeList.unshift(this.employeeForm.value);
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    this.reset();
  }

  onEdit(item: EmployeeModel) {
    this.employeeForm.patchValue(item);
  }

  onUpdate() {
    const updatedEmpId = this.employeeForm.get('empId')?.value;
    const record = this.employeeList.find(m => m.empId === updatedEmpId);
    if (record) {
      Object.assign(record, this.employeeForm.value);
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
      this.reset();
    }
  }

  onDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete?");
    if (isDelete) {
      const index = this.employeeList.findIndex(m => m.empId === id);
      if (index > -1) {
        this.employeeList.splice(index, 1);
        localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
      }
    }
  }
}
