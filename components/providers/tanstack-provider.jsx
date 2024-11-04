//@/components/providers/tanstack-provider.jsx

"use client"

import { useState } from "react";
import {QueryClient, QueryClientProvider } from "@tanstack/react-query";


export const TanstackProvider = ({children}) => {
    const [queryClient] = useState(() => new QueryClient());

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}