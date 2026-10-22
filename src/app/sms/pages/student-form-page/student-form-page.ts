import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentRequest } from '../../interfaces/student.interface';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-form-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './student-form-page.html',
})
export default class StudentFormPage implements OnInit {
  private fb = inject(FormBuilder);
  private studentService = inject(StudentService);
  private router = inject(Router);
  private actRouter = inject(ActivatedRoute);
  private idParam = this.actRouter.snapshot.paramMap.get('id');

  errorMessage = signal<string | null>(null);
  isSaving = signal(false);
  studentId = this.idParam ? Number(this.idParam) : null;
  isEditMode = this.studentId !== null;

  studentForm = this.fb.nonNullable.group({
    dni: ['', Validators.required],
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    birthday: ['', Validators.required],
    enrollmentDate: ['', Validators.required],
  });

  onSubmit() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);
    this.isSaving.set(true);

    const request: StudentRequest = this.studentForm.getRawValue();

    const save$ =
      this.studentId !== null
        ? this.studentService.updateStudent(this.studentId, request)
        : this.studentService.createStudent(request);

    save$.subscribe({
      next: () => this.router.navigate(['/students']),
      error: (err) => {
        this.isSaving.set(false);
        this.errorMessage.set(err.error?.message ?? 'Cannot create student');
      },
    });
  }

  ngOnInit() {
    if (this.studentId !== null) {
      this.studentService.getStudentById(this.studentId).subscribe({
        next: (student) => this.studentForm.patchValue(student),
        error: (err) => this.errorMessage.set(err.error?.message ?? 'Could not load the student'),
      });
    }
  }
}
