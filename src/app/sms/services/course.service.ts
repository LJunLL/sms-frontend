import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Course } from '../interfaces/course.interface';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private http = inject(HttpClient);

  getCourses() {
    return this.http.get<Course[]>(`${environment.apiUrl}/courses`);
  }
}
