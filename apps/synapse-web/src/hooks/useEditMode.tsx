import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface EditModeContextType {
	isEditing: boolean;
	toggle: () => void;
}

const EditModeContext = createContext<EditModeContextType | null>(null);

export function EditModeProvider({ children }: { children: ReactNode }) {
	const [isEditing, setIsEditing] = useState(false);
	const toggle = () => setIsEditing((prev) => !prev);

	return (
		<EditModeContext.Provider value={{ isEditing, toggle }}>
			{children}
		</EditModeContext.Provider>
	);
}

export function useEditMode() {
	const ctx = useContext(EditModeContext);
	if (!ctx) throw new Error("useEditMode must be used within EditModeProvider");
	return ctx;
}
