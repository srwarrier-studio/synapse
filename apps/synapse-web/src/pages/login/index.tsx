import {
	Center,
	Flex,
	Group,
	Image,
	Paper,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { LoginForm } from "./components/login-form";
import { TitleSegment } from "./components/title-segment";
import classes from "./style.module.css";

export function AuthenticationTitle() {
	const navigate = useNavigate();

	return (
		<Flex className={classes.wrapper}>
			<Stack align="center" gap="lg">
				<div className={classes.brand}>
					<TitleSegment />
				</div>

				<Paper className={classes.formCard}>
					<Stack gap="lg">
						<LoginForm onSuccess={() => navigate({ to: "/dashboard" })} />
					</Stack>
				</Paper>
			</Stack>
		</Flex>
	);
}
