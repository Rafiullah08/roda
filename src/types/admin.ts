
export interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string | null;
  permissions: string[];
}

export interface AdminSession {
  user: AdminUser;
  expires_at: number;
}
