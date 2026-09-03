import { Group, Image, Stack, Text, Title } from "@mantine/core";
import classes from "../style.module.css";

export function TitleSegment() {
    return (
        <Group gap="sm" align="center" justify="center">
            <div className={classes.logoWrapper}>
                <Image src="logo.png" w={44} h={44} />
            </div>
            <Stack gap={0}>
                <Title className={classes.brandTitle}>Sami Synapse</Title>
                <Text className={classes.brandTagline}>
                    Sami Business Intelligence Platform
                </Text>
            </Stack>
        </Group>
    );
}
