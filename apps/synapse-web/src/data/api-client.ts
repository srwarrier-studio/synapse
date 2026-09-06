const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export class ApiError extends Error {
	status: number;
	constructor(status: number, message: string) {
		super(message);
		this.status = status;
	}
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
	const token = localStorage.getItem("synapse_token");

	const headers = new Headers(init?.headers);
	headers.set("Content-Type", "application/json");
	if (token) {
		headers.set("Authorization", `Bearer ${token}`);
	}

	const res = await fetch(`${BASE_URL}${path}`, {
		...init,
		headers,
	});

	if (res.status === 401) {
		localStorage.removeItem("synapse_token");
		localStorage.removeItem("synapse_user");
		window.location.href = "/";
		throw new ApiError(401, "Session expired");
	}

	if (!res.ok) {
		throw new ApiError(res.status, `API error: ${res.status}`);
	}
	return res.json();
}
