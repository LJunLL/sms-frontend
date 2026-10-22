import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Student, StudentRequest } from '../interfaces/student.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private http = inject(HttpClient);

  getStudents() {
    return this.http.get<Student[]>(`${environment.apiUrl}/students`);
  }

  deleteStudent(id: number){
    return this.http.delete<void>(`${environment.apiUrl}/students/${id}`);
  }

  createStudent(request: StudentRequest){
    return this.http.post<Student>(`${environment.apiUrl}/students`, request);
  }

  getStudentById(id: number){
    return this.http.get<Student>(`${environment.apiUrl}/students/${id}`);
  }

  updateStudent(id: number, request: StudentRequest){
    return this.http.put<Student>(`${environment.apiUrl}/students/${id}`, request);
  }
}
