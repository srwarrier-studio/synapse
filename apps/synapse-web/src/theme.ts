import { createTheme } from "@mantine/core";

const synapseBlue = [
	"#e1effe",
	"#bddbfc",
	"#89bffa",
	"#4e9ef5",
	"#2680eb",
	"#0078d4",
	"#006cbd",
	"#004e8c",
	"#00396b",
	"#00254a",
] as const;

const samiGreen = [
	"#e6f4e6",
	"#c3e1c3",
	"#8fc78f",
	"#66ad66",
	"#3d933d",
	"#2e7d32",
	"#276b2b",
	"#1a531a",
	"#133f13",
	"#0d2b0d",
] as const;

const neutralGray = [
	"#fafafa",
	"#f5f5f5",
	"#f0f0f0",
	"#e0e0e0",
	"#c8c8c8",
	"#adadad",
	"#8a8a8a",
	"#6b6b6b",
	"#555555",
	"#424242",
] as const;

export const theme = createTheme({
	primaryColor: "synapse-blue",
	colors: {
		"synapse-blue": synapseBlue,
		"sami-green": samiGreen,
		gray: neutralGray,
		primary: synapseBlue,
		secondary: samiGreen,
		success: samiGreen,
		error: [
			"#fde7e9",
			"#f9c2c7",
			"#f28994",
			"#e9576a",
			"#dc3545",
			"#c82333",
			"#a71d2a",
			"#861520",
			"#660d17",
			"#4a0810",
		],
		warning: [
			"#fff4e5",
			"#ffe4b8",
			"#ffc966",
			"#ffad1a",
			"#ff9900",
			"#e68a00",
			"#b36b00",
			"#804d00",
			"#4d2e00",
			"#1a1000",
		],
		tooltip: ["#616161", "#616161", "#616161", "#616161", "#616161", "#616161", "#616161", "#616161", "#616161", "#616161"],
	},
	fontFamily:
		'"Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif',
	fontFamilyMonospace:
		'"Cascadia Code", "SF Mono", Consolas, "Courier New", monospace',
	fontSizes: {
		xs: "10px",
		sm: "12px",
		md: "14px",
		lg: "16px",
		xl: "20px",
		"2xl": "28px",
		"3xl": "42px",
	},
	lineHeights: {
		xs: "14px",
		sm: "16px",
		md: "20px",
		lg: "22px",
		xl: "28px",
		"2xl": "36px",
		"3xl": "52px",
	},
	radius: {
		xs: "2px",
		sm: "2px",
		md: "4px",
		lg: "4px",
		xl: "8px",
	},
	spacing: {
		xs: "4px",
		sm: "8px",
		md: "12px",
		lg: "16px",
		xl: "20px",
	},
	components: {
		Button: {
			defaultProps: {
				radius: "xs",
				variant: "filled",
			},
			styles: () => ({
				root: {
					height: "32px",
					paddingInline: "16px",
					fontSize: "14px",
					fontWeight: 600,
					lineHeight: "20px",
					borderRadius: "2px",
					textTransform: "none",
					boxShadow: "none",
					"&:active": {
						transform: "none",
					},
				},
				label: {
					whiteSpace: "nowrap",
				},
				filled: {
					"&:hover": {
						boxShadow: "none",
					},
				},
				outline: {
					borderWidth: "1px",
					"&:hover": {
						backgroundColor: "transparent",
					},
				},
				ghost: {
					"&:hover": {
						backgroundColor: "#f5f5f5",
					},
				},
			}),
		},
		TextInput: {
			defaultProps: {
				radius: "xs",
				size: "md",
			},
			styles: () => ({
				input: {
					height: "32px",
					minHeight: "32px",
					paddingInline: "10px",
					fontSize: "14px",
					borderRadius: "2px",
					borderColor: "#c8c8c8",
					backgroundColor: "#fff",
					boxShadow: "none",
					"&:focus": {
						borderColor: "#0078d4",
						boxShadow: "0 0 0 1px #0078d4",
					},
					"&:disabled": {
						backgroundColor: "#f0f0f0",
						borderColor: "#e0e0e0",
					},
				},
				label: {
					fontSize: "14px",
					fontWeight: 600,
					color: "#323130",
					marginBottom: "4px",
				},
				error: {
					fontSize: "12px",
				},
				description: {
					fontSize: "12px",
					color: "#6b6b6b",
				},
			}),
		},
		PasswordInput: {
			defaultProps: {
				radius: "xs",
				size: "md",
			},
			styles: () => ({
				input: {
					height: "32px",
					minHeight: "32px",
					paddingInline: "10px",
					fontSize: "14px",
					borderRadius: "2px",
					borderColor: "#c8c8c8",
					backgroundColor: "#fff",
					boxShadow: "none",
					"&:focus": {
						borderColor: "#0078d4",
						boxShadow: "0 0 0 1px #0078d4",
					},
				},
				label: {
					fontSize: "14px",
					fontWeight: 600,
					color: "#323130",
					marginBottom: "4px",
				},
				visibilityToggle: {
					color: "#0078d4",
				},
			}),
		},
		Checkbox: {
			defaultProps: {
				radius: "xs",
				size: "sm",
			},
			styles: () => ({
				input: {
					borderRadius: "2px",
					borderColor: "#8a8a8a",
					"&:checked": {
						backgroundColor: "#0078d4",
						borderColor: "#0078d4",
					},
				},
				label: {
					fontSize: "14px",
					color: "#323130",
				},
			}),
		},
		Anchor: {
			defaultProps: {
				underline: false,
			},
			styles: () => ({
				root: {
					color: "#0078d4",
					fontWeight: 600,
					"&:hover": {
						color: "#005a9e",
						textDecoration: "underline",
					},
				},
			}),
		},
		Text: {
			defaultProps: {
				size: "md",
			},
		},
		Title: {
			defaultProps: {
				order: 3,
			},
			styles: () => ({
				root: {
					fontWeight: 600,
				},
			}),
		},
		NavLink: {
			defaultProps: {
				variant: "subtle",
				radius: "xs",
			},
			styles: () => ({
				root: {
					borderRadius: "2px",
					fontSize: "14px",
					fontWeight: 400,
					color: "#323130",
					"&:hover": {
						backgroundColor: "#f5f5f5",
					},
				},
				label: {
					fontWeight: 400,
				},
				description: {
					fontSize: "12px",
				},
				indicator: {
					backgroundColor: "#0078d4",
					width: "3px",
					borderRadius: "2px",
				},
			}),
		},
		AppShell: {
			defaultProps: {
				navbar: { width: 260, breakpoint: "md" },
				header: { height: 48 },
			},
			styles: () => ({
				navbar: {
					backgroundColor: "#fafafa",
					borderRight: "1px solid #e0e0e0",
				},
				header: {
					backgroundColor: "#fafafa",
					borderBottom: "1px solid #e0e0e0",
				},
				main: {
					backgroundColor: "#ffffff",
				},
			}),
		},
		Paper: {
			defaultProps: {
				shadow: "xs",
				radius: "md",
				withBorder: false,
			},
			styles: () => ({
				root: {
					boxShadow: "none",
					borderRadius: "2px",
					border: "1px solid #e0e0e0",
				},
			}),
		},
		Card: {
			defaultProps: {
				shadow: "xs",
				radius: "md",
				withBorder: true,
			},
			styles: () => ({
				root: {
					boxShadow: "none",
					borderRadius: "2px",
					border: "1px solid #e0e0e0",
					padding: "16px",
				},
			}),
		},
		Stack: {
			defaultProps: {
				gap: "md",
			},
		},
		Group: {
			defaultProps: {
				gap: "md",
			},
		},
		Flex: {
			defaultProps: {
				gap: "md",
			},
		},
		Badge: {
			defaultProps: {
				radius: "xs",
				variant: "light",
			},
			styles: () => ({
				root: {
					fontSize: "12px",
					fontWeight: 600,
					textTransform: "none",
					paddingInline: "6px",
				},
			}),
		},
		Tooltip: {
			defaultProps: {
				radius: "xs",
				color: "#616161",
				position: "top",
			},
			styles: () => ({
				tooltip: {
					fontSize: "12px",
					backgroundColor: "#616161",
					padding: "6px 12px",
				},
			}),
		},
		Menu: {
			defaultProps: {
				radius: "xs",
				shadow: "md",
			},
			styles: () => ({
				dropdown: {
					border: "1px solid #e0e0e0",
					borderRadius: "2px",
				},
				item: {
					fontSize: "14px",
					padding: "6px 12px",
					"&:hover": {
						backgroundColor: "#f5f5f5",
					},
				},
			}),
		},
		Select: {
			defaultProps: {
				radius: "xs",
				size: "md",
			},
			styles: () => ({
				input: {
					height: "32px",
					minHeight: "32px",
					fontSize: "14px",
					borderRadius: "2px",
					borderColor: "#c8c8c8",
					boxShadow: "none",
					"&:focus": {
						borderColor: "#0078d4",
						boxShadow: "0 0 0 1px #0078d4",
					},
				},
				label: {
					fontSize: "14px",
					fontWeight: 600,
					color: "#323130",
					marginBottom: "4px",
				},
			}),
		},
		Textarea: {
			defaultProps: {
				radius: "xs",
				size: "md",
			},
			styles: () => ({
				input: {
					fontSize: "14px",
					borderRadius: "2px",
					borderColor: "#c8c8c8",
					boxShadow: "none",
					"&:focus": {
						borderColor: "#0078d4",
						boxShadow: "0 0 0 1px #0078d4",
					},
				},
				label: {
					fontSize: "14px",
					fontWeight: 600,
					color: "#323130",
					marginBottom: "4px",
				},
			}),
		},
		DateInput: {
			defaultProps: {
				radius: "xs",
				size: "md",
			},
			styles: () => ({
				input: {
					height: "32px",
					minHeight: "32px",
					fontSize: "14px",
					borderRadius: "2px",
					borderColor: "#c8c8c8",
					boxShadow: "none",
				},
				label: {
					fontSize: "14px",
					fontWeight: 600,
					color: "#323130",
					marginBottom: "4px",
				},
			}),
		},
		Popover: {
			defaultProps: {
				radius: "xs",
				shadow: "md",
			},
			styles: () => ({
				dropdown: {
					border: "1px solid #e0e0e0",
					borderRadius: "2px",
				},
			}),
		},
		Notification: {
			defaultProps: {
				radius: "xs",
			},
			styles: () => ({
				root: {
					borderRadius: "2px",
					border: "1px solid #e0e0e0",
					padding: "12px 16px",
				},
				title: {
					fontSize: "14px",
					fontWeight: 600,
				},
				description: {
					fontSize: "14px",
				},
			}),
		},
		Alert: {
			defaultProps: {
				radius: "xs",
			},
			styles: () => ({
				root: {
					borderRadius: "2px",
					padding: "12px 16px",
				},
				title: {
					fontSize: "14px",
					fontWeight: 600,
				},
				message: {
					fontSize: "14px",
				},
			}),
		},
		Tabs: {
			defaultProps: {
				radius: "xs",
			},
			styles: () => ({
				tab: {
					fontSize: "14px",
					fontWeight: 600,
					padding: "8px 12px",
					"&[data-active]": {
						borderColor: "#0078d4",
						color: "#323130",
					},
				},
				list: {
					borderBottom: "1px solid #e0e0e0",
				},
			}),
		},
		Table: {
			defaultProps: {
				radius: "xs",
			},
			styles: () => ({
				table: {
					borderCollapse: "collapse",
				},
				th: {
					fontSize: "12px",
					fontWeight: 600,
					color: "#323130",
					backgroundColor: "#fafafa",
					borderBottom: "1px solid #e0e0e0",
					padding: "8px 12px",
				},
				td: {
					fontSize: "14px",
					color: "#323130",
					borderBottom: "1px solid #e0e0e0",
					padding: "8px 12px",
				},
			}),
		},
		Loader: {
			defaultProps: {
				color: "#0078d4",
			},
		},
		Overlay: {
			defaultProps: {
				backgroundOpacity: 0.5,
				color: "#000",
			},
		},
		Modal: {
			defaultProps: {
				radius: "xs",
				shadow: "md",
			},
			styles: () => ({
				content: {
					borderRadius: "2px",
				},
				header: {
					borderRadius: "2px",
					borderBottom: "1px solid #e0e0e0",
				},
				title: {
					fontSize: "18px",
					fontWeight: 600,
					color: "#323130",
				},
			}),
		},
		Drawer: {
			defaultProps: {
				radius: "xs",
			},
			styles: () => ({
				content: {
					borderRadius: "2px",
				},
			}),
		},
		Skeleton: {
			defaultProps: {
				radius: "xs",
			},
		},
		Image: {
			defaultProps: {
				radius: "xs",
			},
		},
		Avatar: {
			defaultProps: {
				radius: "xs",
			},
			styles: () => ({
				root: {
					borderRadius: "2px",
				},
			}),
		},
		Burger: {
			defaultProps: {
				radius: "xs",
			},
		},
		ActionIcon: {
			defaultProps: {
				radius: "xs",
			},
			styles: () => ({
				root: {
					borderRadius: "2px",
				},
			}),
		},
		Chip: {
			defaultProps: {
				radius: "xs",
			},
		},
		Stepper: {
			defaultProps: {
				radius: "xs",
			},
			styles: () => ({
				step: {
					borderRadius: "2px",
				},
			}),
		},
		Accordion: {
			defaultProps: {
				radius: "xs",
			},
		},
		ThemeIcon: {
			defaultProps: {
				radius: "xs",
			},
			styles: () => ({
				root: {
					borderRadius: "2px",
				},
			}),
		},
		NumberInput: {
			defaultProps: {
				radius: "xs",
				size: "md",
			},
			styles: () => ({
				input: {
					height: "32px",
					minHeight: "32px",
					fontSize: "14px",
					borderRadius: "2px",
					borderColor: "#c8c8c8",
					boxShadow: "none",
				},
				label: {
					fontSize: "14px",
					fontWeight: 600,
					color: "#323130",
					marginBottom: "4px",
				},
			}),
		},
		Switch: {
			defaultProps: {
				radius: "xs",
				size: "md",
			},
			styles: () => ({
				track: {
					borderRadius: "2px",
				},
			}),
		},
		Radio: {
			defaultProps: {
				radius: "xs",
				size: "sm",
			},
			styles: () => ({
				radio: {
					borderRadius: "2px",
				},
				label: {
					fontSize: "14px",
				},
			}),
		},
		InputWrapper: {
			defaultProps: {
				inputWrapperOrder: ["label", "input", "description", "error"],
			},
		},
		Input: {
			defaultProps: {
				radius: "xs",
			},
			styles: () => ({
				input: {
					borderRadius: "2px",
				},
			}),
		},
		FocusTrap: {
			defaultProps: {
				tabIndex: -1,
			},
		},
		CloseButton: {
			defaultProps: {
				radius: "xs",
			},
		},
		Pagination: {
			defaultProps: {
				radius: "xs",
			},
		},
		Slider: {
			defaultProps: {
				radius: "xs",
			},
		},
		ColorInput: {
			defaultProps: {
				radius: "xs",
			},
		},
		ColorPicker: {
			defaultProps: {
				radius: "xs",
			},
		},
		MultiSelect: {
			defaultProps: {
				radius: "xs",
			},
			styles: () => ({
				input: {
					borderRadius: "2px",
				},
			}),
		},
		TransferList: {
			defaultProps: {
				radius: "xs",
			},
		},
		TimeInput: {
			defaultProps: {
				radius: "xs",
			},
			styles: () => ({
				input: {
					borderRadius: "2px",
				},
			}),
		},
		PinInput: {
			defaultProps: {
				radius: "xs",
			},
		},
		FileInput: {
			defaultProps: {
				radius: "xs",
			},
			styles: () => ({
				input: {
					borderRadius: "2px",
				},
			}),
		},
		Paper: {
			defaultProps: {
				radius: "md",
				withBorder: false,
			},
			styles: () => ({
				root: {
					boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
					transition: "box-shadow 0.2s ease, transform 0.2s ease",
					"&:hover": {
						boxShadow: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
					},
				},
			}),
		},
		NavLink: {
			defaultProps: {
				variant: "subtle",
				radius: "md",
			},
			styles: () => ({
				root: {
					borderRadius: "8px",
					padding: "8px 12px",
					marginBottom: "2px",
					transition: "all 0.15s ease",
					"&:hover": {
						backgroundColor: "rgba(0, 120, 212, 0.06)",
					},
				},
				label: {
					fontSize: "14px",
					fontWeight: 500,
				},
				leftSection: {
					color: "#6b6b6b",
				},
				active: {
					backgroundColor: "rgba(0, 120, 212, 0.08)",
					color: "#0078d4",
					"& .mantine-NavLink-leftSection": {
						color: "#0078d4",
					},
				},
			}),
		},
		Avatar: {
			defaultProps: {
				radius: "xl",
			},
		},
		Menu: {
			defaultProps: {
				shadow: "md",
				radius: "md",
			},
		},
	},
});
