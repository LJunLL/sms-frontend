import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TeacherRequest } from '../../interfaces/teacher.interface';

@Component({
  selector: 'app-teacher-form-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './teacher-form-page.html',
})
export default class TeacherFormPage implements OnInit {
  private fb = inject(FormBuilder);
  private teacherService = inject(TeacherService);
  private router = inject(Router);
  private actRouter = inject(ActivatedRoute);
  private idParam = this.actRouter.snapshot.paramMap.get('id');

  errorMessage = signal<string | null>(null);
  isSaving = signal(false);
  teacherId = this.idParam ? Number(this.idParam) : null;
  isEditMode = this.teacherId !== null;

  teacherForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    specialty: ['', Validators.required],
  });

  onSubmit() {
    if (this.teacherForm.invalid) {
      this.teacherForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);
    this.isSaving.set(true);

    const request: TeacherRequest = this.teacherForm.getRawValue();

    const save$ =
      this.teacherId !== null
        ? this.teacherService.updateTeacher(this.teacherId, request)
        : this.teacherService.createTeacher(request);

    save$.subscribe({
      next: () => this.router.navigate(['/teachers']),
      error: (err) => {
        this.isSaving.set(false);
        this.errorMessage.set(err.error?.message ?? 'Cannot create teacher');
      },
    });
  }

  ngOnInit() {
    if (this.teacherId !== null) {
      this.teacherService.getTeacherById(this.teacherId).subscribe({
        next: (teacher) => this.teacherForm.patchValue(teacher),
        error: (err) => this.errorMessage.set(err.error?.message ?? 'Could not load the teacher'),
      });
    }
  }
}
