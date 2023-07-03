import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PatientService } from './service/patient.service';
import { Patient } from './models/patient';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  Patientarray: Patient[] = [];

  Patientformgroup: FormGroup;
  isFormSubmitted = false;


  constructor(private patservice: PatientService, private fb: FormBuilder) {
    this.Patientformgroup = this.fb.group({
      id: [""],
      name: [""],
      mobileNo: [""],
      emailID: [""]
    })

  }
  ngOnInit(): void {
    this.GetPatients();
  }

  GetPatients() {
    this.patservice.GetEmployee().subscribe(response => {
      console.log(response);
      this.Patientarray = response;
    })
    this.isFormSubmitted = false;
  }

  Onsubmit() {
    console.log(this.Patientformgroup.value);
    if (this.Patientformgroup.value.name === "" || this.Patientformgroup.value.mobileNo === "" || this.Patientformgroup.value.emailID === "") {
      this.isFormSubmitted = true;
      return;
    }
    if (this.Patientformgroup.value.id != null && this.Patientformgroup.value.id != "") {
      this.patservice.UpdatePatient(this.Patientformgroup.value).subscribe(response => {
        console.log(response);
        this.GetPatients();
        this.Patientformgroup.setValue({
          id: "",
          name: "",
          mobileNo: "",
          emailID: "",
        })
      });
      this.isFormSubmitted = false;
    }
    else {
      this.patservice.CreateEmployee(this.Patientformgroup.value).subscribe(response => {
        console.log(response);
        this.GetPatients();
        this.Patientformgroup.setValue({
          id: "",
          name: "",
          mobileNo: "",
          emailID: "",
        })
      });
      this.isFormSubmitted = false;
    }
  }

  Fillform(patient: Patient) {
    this.Patientformgroup.setValue({
      id: patient.id,
      name: patient.name,
      mobileNo: patient.mobileNo,
      emailID: patient.emailID,
    })
    this.isFormSubmitted = false;
  }

  DeletePatient(id : string)
  {
    this.patservice.DeletePatient(id).subscribe(res =>{
      console.log(res);
      this.GetPatients();
      this.Patientformgroup.setValue({
        id: "",
        name: "",
        mobileNo: "",
        emailID: "",
      })
    })
    this.isFormSubmitted = false;
  }



  title = 'PatientDetailsAnglr';
}
