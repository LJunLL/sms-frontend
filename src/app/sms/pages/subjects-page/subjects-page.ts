import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { SubjectService } from '../../services/subject.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Subject } from '../../interfaces/subject.interface';

@Component({
  selector: 'app-subjects-page',
  imports: [RouterLink],
  templateUrl: './subjects-page.html',
})
export default class SubjectsPage {
  private subjectService = inject(SubjectService);
  public authService = inject(AuthService);

  errorMessage = signal<string | null>(null);

  subjectsResource = rxResource({
    stream: () => this.subjectService.getSubjects(),
  });

  deleteSubject(subject: Subject) {
    if (!confirm(`Delete ${subject.name}?`)) {
      return;
    }

    this.errorMessage.set(null);

    this.subjectService.deleteSubject(subject.id).subscribe({
      next: () => this.subjectsResource.update((list) => list?.filter((s) => s.id !== subject.id)),
      error: (err) => this.errorMessage.set(err.error?.message ?? 'Could not delete the subject'),
    });
  }
}
