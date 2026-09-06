import {
	Anchor,
	Button,
	Checkbox,
	Group,
	PasswordInput,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { ApiError, request } from "../../../data/api-client";

interface LoginValues {
	username: string;
	password: string;
}

interface LoginFormProps {
	onSuccess?: () => void;
}

const ALLOWED_USERNAME = /^[a-zA-Z0-9_]*$/;

function handleUsernameKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
	if (!ALLOWED_USERNAME.test(e.key) && !["Backspace", "Tab", "Enter"].includes(e.key)) {
		e.preventDefault();
	}
}

function handleUsernamePaste(e: React.ClipboardEvent<HTMLInputElement>) {
	const pasted = e.clipboardData.getData("text");
	if (!ALLOWED_USERNAME.test(pasted)) {
		e.preventDefault();
	}
}

async function loginRequest(
	values: LoginValues,
	onSuccess?: () => void,
): Promise<{ error?: string }> {
	try {
		await request("/auth/login", {
			method: "POST",
			body: JSON.stringify(values),
		});
		onSuccess?.();
		return {};
	} catch (err) {
		if (err instanceof ApiError) {
			return {
				error:
					err.status === 401
						? "Invalid username or password"
						: "Login failed. Please try again.",
			};
		}
		return { error: "Network error. Please check your connection." };
	}
}

export function LoginForm({ onSuccess }: LoginFormProps) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<LoginValues>({
		mode: "uncontrolled",
		initialValues: {
			username: "",
			password: "",
		},
		validate: {
			username: (value) => (value.length >= 1 ? null : "Username is required"),
			password: (value) => {
				if (!value) return "Password is required";
				if (/\s/.test(value)) return "Password must not contain spaces";
				if (value.length < 8) return "Password must be at least 8 characters";
				if (!/[A-Z]/.test(value)) return "Password must contain an uppercase letter";
				if (!/[a-z]/.test(value)) return "Password must contain a lowercase letter";
				if (!/[0-9]/.test(value)) return "Password must contain a number";
				if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return "Password must contain a special character";
				return null;
			},
		},
	});

	async function handleSubmit(values: LoginValues) {
		setLoading(true);
		setError(null);

		const result = await loginRequest(values, onSuccess);

		if (result.error) {
			setError(result.error);
		}

		setLoading(false);
	}

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack gap="md">
				<TextInput
					label="Username"
					placeholder="Enter your username"
					required
					radius="md"
					size="md"
					autoComplete="username"
					onKeyDown={handleUsernameKeyDown}
					onPaste={handleUsernamePaste}
					{...form.getInputProps("username")}
				/>

				<PasswordInput
					label="Password"
					placeholder="Enter your password"
					required
					radius="md"
					size="md"
					autoComplete="current-password"
					{...form.getInputProps("password")}
				/>

				<Group justify="space-between">
					<Checkbox label="Remember me" size="sm" />
					<Anchor component="button" size="sm" type="button">
						Forgot password?
					</Anchor>
				</Group>

				{error && (
					<Text c="red" size="sm" ta="center">
						{error}
					</Text>
				)}

				<Button
					fullWidth
					radius="md"
					size="md"
					mt="sm"
					type="submit"
					loading={loading}
				>
					Sign in
				</Button>
			</Stack>
		</form>
	);
}
