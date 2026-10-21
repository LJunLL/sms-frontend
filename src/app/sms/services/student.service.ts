import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Student } from '../interfaces/student.interface';
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
}
