import { Component, inject, signal } from '@angular/core';
import { EnrollmentService } from '../../services/enrollment.service';
import { AuthService } from '../../../auth/services/auth.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Enrollment, EnrollmentStatus } from '../../interfaces/enrollment.interface';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-enrollments-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './enrollments-page.html',
})
export default class EnrollmentsPage {
  private fb = inject(FormBuilder);
  private enrollmentService = inject(EnrollmentService);
  public authService = inject(AuthService);

  errorMessage = signal<string | null>(null);
  selectedEnrollment = signal<Enrollment | null>(null);
  isSavingGrade = signal(false);
  gradeError = signal<string | null>(null);

  gradeControl = this.fb.control<number | null>(null, [
    Validators.required,
    Validators.min(0),
    Validators.max(10),
    Validators.pattern(/^\d+(\.\d)?$/),
  ]);

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

  openGradeModal(enrollment: Enrollment) {
    this.gradeError.set(null);
    this.gradeControl.reset(enrollment.grade);
    this.selectedEnrollment.set(enrollment);
  }

  closeGradeModal() {
    this.selectedEnrollment.set(null);
  }

  saveGrade() {
    const enrollment = this.selectedEnrollment();
    const grade = this.gradeControl.value;

    if (this.gradeControl.invalid) {
      this.gradeControl.markAsTouched();
      return;
    }

    if (enrollment === null || grade === null) {
      return;
    }

    this.gradeError.set(null);
    this.isSavingGrade.set(true);

    this.enrollmentService.updateGrade(enrollment.id, grade).subscribe({
      next: (updated) => {
        this.isSavingGrade.set(false);
        this.enrollmentsResource.update((list) =>
          list?.map((e) => (e.id === updated.id ? updated : e)),
        );
        this.closeGradeModal();
      },
      error: (err) => {
        this.isSavingGrade.set(false);
        this.gradeError.set(err.error?.message ?? 'Could not save the grade');
      },
    });
  }
}
