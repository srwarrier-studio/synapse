import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { User, UserRole } from "../domain/entities/auth";
import { login as apiLogin, logout as apiLogout, getStoredAuth } from "../data/auth";

interface AuthContextValue {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
	hasRole: (...roles: UserRole[]) => boolean;
	canAccess: (module: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const MODULE_ACCESS: Record<string, UserRole[]> = {
	dashboard: ["admin", "management", "finance", "operations", "sales"],
	sales: ["admin", "management", "sales"],
	purchases: ["admin", "management", "finance", "operations"],
	inventory: ["admin", "management", "operations"],
	manufacturing: ["admin", "management", "operations"],
	quality: ["admin", "management", "operations"],
	research: ["admin", "management"],
	"supply-chain": ["admin", "management", "operations"],
	hr: ["admin", "management"],
	reports: ["admin", "management", "finance"],
};

export function AuthProvider({ children }: { children: ReactNode }) {
	const [authState, setAuthState] = useState(() => {
		const stored = getStoredAuth();
		return {
			user: stored?.user ?? null,
			token: stored?.token ?? null,
			isAuthenticated: stored !== null,
		};
	});

	const login = useCallback(async (username: string, password: string) => {
		const result = await apiLogin(username, password);
		setAuthState({
			user: result.user,
			token: result.token,
			isAuthenticated: true,
		});
	}, []);

	const logout = useCallback(() => {
		apiLogout();
		setAuthState({ user: null, token: null, isAuthenticated: false });
	}, []);

	const hasRole = useCallback(
		(...roles: UserRole[]) => {
			if (!authState.user) return false;
			if (authState.user.role === "admin") return true;
			return roles.includes(authState.user.role);
		},
		[authState.user],
	);

	const canAccess = useCallback(
		(module: string) => {
			if (!authState.user) return false;
			if (authState.user.role === "admin") return true;
			const allowed = MODULE_ACCESS[module];
			if (!allowed) return true;
			return allowed.includes(authState.user.role);
		},
		[authState.user],
	);

	const contextValue: AuthContextValue = {
		user: authState.user,
		token: authState.token,
		isAuthenticated: authState.isAuthenticated,
		login,
		logout,
		hasRole,
		canAccess,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth(): AuthContextValue {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return ctx;
}
