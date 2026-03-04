export type UserRole = 'Customer' | 'Farmer' | 'Bulk_Farmer' | 'Business' | 'Admin' | 'Super_Admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  isKycVerified?: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
}
