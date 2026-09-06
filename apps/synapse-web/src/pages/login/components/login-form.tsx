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
import { login } from "../../../data/auth";

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
				return null;
			},
		},
	});

	async function handleSubmit(values: LoginValues) {
		setLoading(true);
		setError(null);

		try {
			await login(values.username, values.password);
			onSuccess?.();
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message.includes("401") ? "Invalid username or password" : "Login failed");
			} else {
				setError("Network error. Please check your connection.");
			}
		} finally {
			setLoading(false);
		}
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
