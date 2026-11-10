import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Subject, SubjectRequest } from '../interfaces/subject.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SubjectService {
  private http = inject(HttpClient);

  getSubjects() {
    return this.http.get<Subject[]>(`${environment.apiUrl}/subjects`);
  }

  deleteSubject(id: number) {
    return this.http.delete<void>(`${environment.apiUrl}/subjects/${id}`);
  }

  createSubject(request: SubjectRequest) {
    return this.http.post<Subject>(`${environment.apiUrl}/subjects`, request);
  }

  getSubjectById(id: number) {
    return this.http.get<Subject>(`${environment.apiUrl}/subjects/${id}`);
  }

  updateSubject(id: number, request: SubjectRequest) {
    return this.http.put<Subject>(`${environment.apiUrl}/subjects/${id}`, request);
  }
}
