"use client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { UserProvider } from "../lib/UserContext";

// Initialize the Convex client
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export function ConvexProviderWithAuth({ children }) {
  return (
    <ConvexProvider client={convex}>
      <UserProvider>
        {children}
      </UserProvider>
    </ConvexProvider>
  );
}