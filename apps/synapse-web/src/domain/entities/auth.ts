export type UserRole = "admin" | "management" | "finance" | "operations" | "sales";

export interface User {
	id: number;
	username: string;
	role: UserRole;
	fullName: string | null;
	avatarUrl: string | null;
	email: string | null;
}

export interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
}
