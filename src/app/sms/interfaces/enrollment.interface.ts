export interface Enrollment {
  id: number;
  studentName: string;
  subjectName: string;
  grade: number | null;
  enrollmentDate: string;
  status: EnrollmentStatus;
}

export interface EnrollmentRequest {
  studentId: number;
  subjectId: number;
  enrollmentDate: string;
}

export type EnrollmentStatus = 'ENROLLED' | 'APPROVED' | 'SUSPENDED';
