const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export class ApiError extends Error {
	status: number;
	constructor(status: number, message: string) {
		super(message);
		this.status = status;
	}
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
	const res = await fetch(`${BASE_URL}${path}`, {
		...init,
		headers: {
			"Content-Type": "application/json",
			...init?.headers,
		},
	});
	if (!res.ok) {
		throw new ApiError(res.status, `API error: ${res.status}`);
	}
	return res.json();
}
