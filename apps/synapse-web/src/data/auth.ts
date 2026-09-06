import { request } from "./api-client";
import type { User } from "../domain/entities/auth";

interface LoginApiResponse {
	access_token: string;
	token_type: string;
	user: {
		id: number;
		username: string;
		role: string;
		full_name: string | null;
		avatar_url: string | null;
		email: string | null;
	};
}

interface LoginResult {
	token: string;
	user: User;
}

export async function login(username: string, password: string): Promise<LoginResult> {
	const data = await request<LoginApiResponse>("/auth/login", {
		method: "POST",
		body: JSON.stringify({ username, password }),
	});

	const user: User = {
		id: data.user.id,
		username: data.user.username,
		role: data.user.role as User["role"],
		fullName: data.user.full_name,
		avatarUrl: data.user.avatar_url,
		email: data.user.email,
	};

	localStorage.setItem("synapse_token", data.access_token);
	localStorage.setItem("synapse_user", JSON.stringify(user));

	return { token: data.access_token, user };
}

export function logout(): void {
	localStorage.removeItem("synapse_token");
	localStorage.removeItem("synapse_user");
	window.location.href = "/";
}

export function getStoredAuth(): { token: string; user: User } | null {
	const token = localStorage.getItem("synapse_token");
	const userJson = localStorage.getItem("synapse_user");

	if (!token || !userJson) return null;

	try {
		const user = JSON.parse(userJson) as User;
		return { token, user };
	} catch {
		localStorage.removeItem("synapse_token");
		localStorage.removeItem("synapse_user");
		return null;
	}
}
