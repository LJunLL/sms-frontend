import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TeacherService } from '../../services/teacher.service';
import { CourseService } from '../../services/course.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { SubjectRequest } from '../../interfaces/subject.interface';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-subject-form-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './subject-form-page.html',
})
export default class SubjectFormPage implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private actRouter = inject(ActivatedRoute);
  private teacherService = inject(TeacherService);
  private courseService = inject(CourseService);
  private subjectService = inject(SubjectService);
  private idParam = this.actRouter.snapshot.paramMap.get('id');

  errorMessage = signal<string | null>(null);
  isSaving = signal(false);
  subjectId = this.idParam ? Number(this.idParam) : null;
  isEditMode = this.subjectId !== null;

  teachersResource = rxResource({
    stream: () => this.teacherService.getTeachers(),
  });

  coursesResource = rxResource({
    stream: () => this.courseService.getCourses(),
  });

  subjectForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    weeklyHours: [0, [Validators.required, Validators.min(1)]],
    teacherId: this.fb.control<number | null>(null, Validators.required),
    courseId: this.fb.control<number | null>(null, Validators.required),
  });

  onSubmit() {
    const { name, description, weeklyHours, teacherId, courseId } = this.subjectForm.getRawValue();

    if (this.subjectForm.invalid) {
      this.subjectForm.markAllAsTouched();
      return;
    }

    if (
      teacherId === null ||
      courseId === null ||
      name === null ||
      description === null ||
      weeklyHours === null
    ) {
      return;
    }

    this.errorMessage.set(null);
    this.isSaving.set(true);

    const request: SubjectRequest = { name, description, weeklyHours, teacherId, courseId };

    const save$ =
      this.subjectId !== null
        ? this.subjectService.updateSubject(this.subjectId, request)
        : this.subjectService.createSubject(request);

    save$.subscribe({
      next: () => this.router.navigate(['/subjects']),
      error: (err) => {
        this.isSaving.set(false);
        this.errorMessage.set(err.error?.message ?? 'Could not save the subject');
      },
    });
  }

  ngOnInit() {
    if (this.subjectId !== null) {
      this.subjectService.getSubjectById(this.subjectId).subscribe({
        next: (subject) => this.subjectForm.patchValue(subject),
        error: (err) => this.errorMessage.set(err.error?.message ?? 'Could not load the subject'),
      });
    }
  }
}
