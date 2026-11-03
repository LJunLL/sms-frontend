import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Subject } from '../interfaces/subject.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SubjectService {
  private http = inject(HttpClient);

  getSubjects() {
    return this.http.get<Subject[]>(`${environment.apiUrl}/subjects`);
  }
}
