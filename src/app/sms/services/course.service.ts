import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Course, CourseRequest } from '../interfaces/course.interface';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private http = inject(HttpClient);

  getCourses() {
    return this.http.get<Course[]>(`${environment.apiUrl}/courses`);
  }

  deleteCourse(id: number) {
    return this.http.delete<void>(`${environment.apiUrl}/courses/${id}`);
  }

  createCourse(request: CourseRequest) {
    return this.http.post<Course>(`${environment.apiUrl}/courses`, request);
  }

  getCourseById(id: number) {
    return this.http.get<Course>(`${environment.apiUrl}/courses/${id}`);
  }

  updateCourse(id: number, request: CourseRequest) {
    return this.http.put<Course>(`${environment.apiUrl}/courses/${id}`, request);
  }
}
