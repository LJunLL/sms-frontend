import { Component, inject, OnInit, signal } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../interfaces/student.interface';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-students-page',
  imports: [DatePipe],
  templateUrl: './students-page.html',
})
export default class StudentsPage implements OnInit {
  private studentService = inject(StudentService);
  public authService = inject(AuthService);

  students = signal<Student[]>([]);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.errorMessage.set(null);

    this.studentService.getStudents().subscribe({
      next: (students) => this.students.set(students),
      error: (err) => this.errorMessage.set(err.error?.message ?? 'Could not load the student'),
    });
  }

  deleteStudents(student: Student){
    if(!confirm(`Delete ${student.name} ${student.lastName}?`)){
      return
    }

    this.errorMessage.set(null);

    this.studentService.deleteStudent(student.id).subscribe({
      next: () => this.students.update(list => list.filter(s => s.id !== student.id)),
      error: (err) => this.errorMessage.set(err.error?.message ?? 'Could not delete the student'),
    })
  }
}
