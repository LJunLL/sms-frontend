import { Component, inject, signal } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { AuthService } from '../../../auth/services/auth.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Teacher } from '../../interfaces/teacher.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teachers-page',
  imports: [RouterLink],
  templateUrl: './teachers-page.html',
})
export default class TeachersPage {
  private teacherService = inject(TeacherService);
  public authService = inject(AuthService);

  errorMessage = signal<string | null>(null);

  teacherResource = rxResource({
    stream: () => this.teacherService.getTeachers(),
  });

  deleteTeacher(teacher: Teacher) {
    if (!confirm(`Delete ${teacher.name} ${teacher.lastName}?`)) {
      return;
    }

    this.errorMessage.set(null);

    this.teacherService.deleteTeacher(teacher.id).subscribe({
      next: () => this.teacherResource.update((list) => list?.filter((s) => s.id !== teacher.id)),
      error: (err) => this.errorMessage.set(err.error?.message ?? 'Could not delete the teacher'),
    });
  }
}
