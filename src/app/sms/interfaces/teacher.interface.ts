export interface Teacher {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: string;
}

export interface TeacherRequest {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: string;
}
