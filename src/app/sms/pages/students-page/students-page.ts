import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { StudentService } from '../../services/student.service';
import { Student } from '../../interfaces/student.interface';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-students-page',
  imports: [DatePipe, RouterLink],
  templateUrl: './students-page.html',
})
export default class StudentsPage {
  private studentService = inject(StudentService);
  public authService = inject(AuthService);

  errorMessage = signal<string | null>(null);

  studentsResource = rxResource({
    stream: () => this.studentService.getStudents(),
  });

  deleteStudent(student: Student) {
    if (!confirm(`Delete ${student.name} ${student.lastName}?`)) {
      return;
    }

    this.errorMessage.set(null);

    this.studentService.deleteStudent(student.id).subscribe({
      next: () => this.studentsResource.update((list) => list?.filter((s) => s.id !== student.id)),
      error: (err) => this.errorMessage.set(err.error?.message ?? 'Could not delete the student'),
    });
  }
}
