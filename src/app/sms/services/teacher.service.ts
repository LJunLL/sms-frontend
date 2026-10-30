import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Teacher, TeacherRequest } from '../interfaces/teacher.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TeacherService {
  private http = inject(HttpClient);

  getTeachers() {
    return this.http.get<Teacher[]>(`${environment.apiUrl}/teachers`);
  }

  deleteTeacher(id: number) {
    return this.http.delete<void>(`${environment.apiUrl}/teachers/${id}`);
  }

  createTeacher(request: TeacherRequest) {
    return this.http.post<Teacher>(`${environment.apiUrl}/teachers`, request);
  }

  getTeacherById(id: number) {
    return this.http.get<Teacher>(`${environment.apiUrl}/teachers/${id}`);
  }

  updateTeacher(id: number, request: TeacherRequest) {
    return this.http.put<Teacher>(`${environment.apiUrl}/teachers/${id}`, request);
  }
}
