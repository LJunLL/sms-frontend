export interface Student{
  id: number;
  dni: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  birthday: string;
  enrollmentDate: string;
}

export interface StudentRequest{
  dni: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  birthday: string;
  enrollmentDate: string;
}
