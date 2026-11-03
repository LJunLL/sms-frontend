import { Component, inject, signal } from '@angular/core';
import { EnrollmentService } from '../../services/enrollment.service';
import { AuthService } from '../../../auth/services/auth.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Enrollment, EnrollmentStatus } from '../../interfaces/enrollment.interface';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-enrollments-page',
  imports: [RouterLink],
  templateUrl: './enrollments-page.html',
})
export default class EnrollmentsPage {
  private enrollmentService = inject(EnrollmentService);
  public authService = inject(AuthService);

  errorMessage = signal<string | null>(null);

  enrollmentsResource = rxResource({
    stream: () => this.enrollmentService.getEnrollments(),
  });

  deleteEnrollment(enrollment: Enrollment) {
    if (!confirm(`Delete ${enrollment.studentName} ${enrollment.subjectName}?`)) {
      return;
    }

    this.errorMessage.set(null);

    this.enrollmentService.deleteEnrollment(enrollment.id).subscribe({
      next: () =>
        this.enrollmentsResource.update((list) => list?.filter((e) => e.id !== enrollment.id)),
      error: (err) =>
        this.errorMessage.set(err.error?.message ?? 'Could not delete the enrollment'),
    });
  }

  statusBadgeClass(status: EnrollmentStatus): string {
    switch (status) {
      case 'APPROVED':
        return 'badge-success';
      case 'ENROLLED':
        return 'badge-ghost';
      case 'SUSPENDED':
        return 'badge-error';
    }
  }
}
