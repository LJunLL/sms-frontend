import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { EnrollmentService } from '../../services/enrollment.service';
import { StudentService } from '../../services/student.service';
import { SubjectService } from '../../services/subject.service';
import { EnrollmentRequest } from '../../interfaces/enrollment.interface';

@Component({
  selector: 'app-enrollment-form-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './enrollment-form-page.html',
})
export default class EnrollmentFormPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private enrollmentService = inject(EnrollmentService);
  private studentService = inject(StudentService);
  private subjectService = inject(SubjectService);

  errorMessage = signal<string | null>(null);
  isSaving = signal(false);

  studentsResource = rxResource({
    stream: () => this.studentService.getStudents(),
  });

  subjectsResource = rxResource({
    stream: () => this.subjectService.getSubjects(),
  });

  enrollmentForm = this.fb.group({
    studentId: this.fb.control<number | null>(null, Validators.required),
    subjectId: this.fb.control<number | null>(null, Validators.required),
    enrollmentDate: this.fb.nonNullable.control('', Validators.required),
  });

  onSubmit() {
    const { studentId, subjectId, enrollmentDate } = this.enrollmentForm.getRawValue();

    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
      return;
    }

    if (studentId === null || subjectId === null) {
      return;
    }

    this.errorMessage.set(null);
    this.isSaving.set(true);

    const request: EnrollmentRequest = { studentId, subjectId, enrollmentDate };

    this.enrollmentService.createEnrollment(request).subscribe({
      next: () => this.router.navigate(['/enrollments']),
      error: (err) => {
        this.isSaving.set(false);
        this.errorMessage.set(err.error?.message ?? 'Cannot create enrollment');
      },
    });
  }
}
