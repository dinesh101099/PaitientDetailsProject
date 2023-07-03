import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../models/patient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpclient : HttpClient) { }

  baseurl = "https://localhost:7037/api/Patient";
  GetEmployee() : Observable<Patient[]>{
    return this.httpclient.get<Patient[]>(this.baseurl)
  }

  CreateEmployee(patient:Patient) : Observable<Patient>{
    patient.id = "00000000-0000-0000-0000-000000000000";
    return this.httpclient.post<Patient>(this.baseurl,patient)
  }

  UpdatePatient(patient: Patient): Observable<Patient>{
    return this.httpclient.put<Patient>(this.baseurl + '/' + patient.id, patient);
  }

  DeletePatient(id: string): Observable<Patient>{
    return this.httpclient.delete<Patient>(this.baseurl + '/' + id);
  }

}
