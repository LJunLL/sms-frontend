import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Enrollment, EnrollmentRequest } from '../interfaces/enrollment.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private http = inject(HttpClient);

  getEnrollments() {
    return this.http.get<Enrollment[]>(`${environment.apiUrl}/enrollments`);
  }

  deleteEnrollment(id: number) {
    return this.http.delete<void>(`${environment.apiUrl}/enrollments/${id}`);
  }

  createEnrollment(request: EnrollmentRequest) {
    return this.http.post<Enrollment>(`${environment.apiUrl}/enrollments`, request);
  }

  getEnrollmentById(id: number) {
    return this.http.get<Enrollment>(`${environment.apiUrl}/enrollments/${id}`);
  }

  updateGrade(id: number, grade: number) {
    return this.http.put<Enrollment>(`${environment.apiUrl}/enrollments/${id}/grade`, null, {
      params: { grade },
    });
  }
}
