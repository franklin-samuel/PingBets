import { Slot } from "expo-router";
import { ApostasProvider } from "@/context/ApostaContext";

export default function RootLayout() {
    return (
        <ApostasProvider>
            <Slot />
        </ApostasProvider>
    )
}