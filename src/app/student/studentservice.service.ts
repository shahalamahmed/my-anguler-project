import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentModel } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentserviceService {
  baseUrl: string = "http://localhost:3000/students/";

  constructor(private httpClient: HttpClient) { }
  getAllStudent(): Observable<any> {
    return this.httpClient.get(this.baseUrl)
  }
  createStudent(student: StudentModel): Observable<any> {
    return this.httpClient.post(this.baseUrl, student);
  }
  deleteStudent(studentId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}${studentId}`);
  }
  
  updateStudent(id: string, student: StudentModel): Observable<any> {
    return this.httpClient.put<StudentModel>(`${this.baseUrl}/${id}`, student);
  }

  getById(id: string): Observable<any> {
    return this.httpClient.get<StudentModel>(`${this.baseUrl}/${id}`);
  }


}
