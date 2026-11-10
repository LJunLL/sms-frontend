export interface Course {
  id: number;
  name: string;
  durationHours: number;
  level: number;
  description: string;
}

export interface CourseRequest {
  name: string;
  durationHours: number;
  level: number;
  description: string;
}
