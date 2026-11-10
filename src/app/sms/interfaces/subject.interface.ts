export interface Subject {
  id: number;
  name: string;
  description: string;
  weeklyHours: number;
  teacherId: number;
  teacherName: string;
  courseId: number;
  courseName: string;
}

export interface SubjectRequest {
  name: string;
  description: string;
  weeklyHours: number;
  teacherId: number;
  courseId: number;
}
