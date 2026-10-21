import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentRequest } from '../../interfaces/student.interface';
import { StudentService } from '../../services/student.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-form-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './student-form-page.html',
})
export default class StudentFormPage {
  private fb = inject(FormBuilder);
  private studentService = inject(StudentService);
  private router = inject(Router);

  errorMessage = signal<string | null>(null);
  isSaving = signal(false);

  studentForm = this.fb.nonNullable.group({
    dni: ['', Validators.required],
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    birthday: ['', Validators.required],
    enrollmentDate: ['', Validators.required],
  });

  onSubmit(){
    if(this.studentForm.invalid){
      this.studentForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);
    this.isSaving.set(true);

    const request: StudentRequest = this.studentForm.getRawValue();
    this.studentService.createStudent(request).subscribe({
      next: () => this.router.navigate(["/students"]),
      error: (err) => {
        this.isSaving.set(false);
        this.errorMessage.set(err.error?.message ?? 'Cannot create student');
      },
    })
  }
}
