import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { CourseRequest } from '../../interfaces/course.interface';

@Component({
  selector: 'app-course-form-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './course-form-page.html',
})
export default class CourseFormPage implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private courseService = inject(CourseService);
  private actRouter = inject(ActivatedRoute);
  private idParam = this.actRouter.snapshot.paramMap.get('id');

  errorMessage = signal<string | null>(null);
  isSaving = signal(false);
  courseId = this.idParam ? Number(this.idParam) : null;
  isEditMode = this.courseId !== null;

  courseForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    durationHours: [0, [Validators.required, Validators.min(1)]],
    level: [0, [Validators.required, Validators.min(1)]],
    description: ['', Validators.required],
  });

  onSubmit() {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);
    this.isSaving.set(true);

    const request: CourseRequest = this.courseForm.getRawValue();

    const save$ =
      this.courseId !== null
        ? this.courseService.updateCourse(this.courseId, request)
        : this.courseService.createCourse(request);

    save$.subscribe({
      next: () => this.router.navigate(['/courses']),
      error: (err) => {
        this.isSaving.set(false);
        this.errorMessage.set(err.error?.message ?? 'Cannot create course');
      },
    });
  }

  ngOnInit() {
    if (this.courseId !== null) {
      this.courseService.getCourseById(this.courseId).subscribe({
        next: (course) => this.courseForm.patchValue(course),
        error: (err) => this.errorMessage.set(err.error?.message ?? 'Could not load the course'),
      });
    }
  }
}
