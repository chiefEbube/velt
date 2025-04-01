'use client'

import { WagmiProvider } from "wagmi";
import { config } from "@/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";


export function Providers(props: {
    children: ReactNode
}) {
    const queryClient = new QueryClient()
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {props.children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}