export interface StripeUserEntity {
  id?: number;
  id_stripe?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthDate: Date;
  gender: string;
  phone: string;
  role: Role;
  roleId: number;
  updatedAt: string;
  createdAt: string;
}

interface Role {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
