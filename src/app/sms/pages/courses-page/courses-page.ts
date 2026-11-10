import { Component, inject, signal } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../../auth/services/auth.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Course } from '../../interfaces/course.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses-page',
  imports: [RouterLink],
  templateUrl: './courses-page.html',
})
export default class CoursesPage {
  private courseService = inject(CourseService);
  public authService = inject(AuthService);

  errorMessage = signal<string | null>(null);

  coursesResource = rxResource({
    stream: () => this.courseService.getCourses(),
  });

  deleteCourse(course: Course) {
    if (!confirm(`Delete ${course.name}?`)) {
      return;
    }

    this.errorMessage.set(null);

    this.courseService.deleteCourse(course.id).subscribe({
      next: () => this.coursesResource.update((list) => list?.filter((c) => c.id !== course.id)),
      error: (err) => this.errorMessage.set(err.error?.message ?? 'Could not delete the course'),
    });
  }
}
