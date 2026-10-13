import { Component, inject, OnInit, signal } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../interfaces/student.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-students-page',
  imports: [DatePipe],
  templateUrl: './students-page.html',
})
export default class StudentsPage implements OnInit {
  private studentService = inject(StudentService);

  students = signal<Student[]>([]);

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.studentService.getStudents().subscribe({
      next: (students) => this.students.set(students),
      error: (err) => console.error('Error cargando alumnos', err),
    });
  }
}
