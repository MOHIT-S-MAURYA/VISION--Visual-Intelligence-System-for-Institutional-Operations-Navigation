// Context Exports
export { AuthProvider, useAuth, ROLES, PERMISSIONS } from "./AuthContext";
export { GlobalProvider, useGlobal } from "./GlobalContext";

// Combined Providers Component
import React from "react";
import { AuthProvider } from "./AuthContext";
import { GlobalProvider } from "./GlobalContext";

export function AppProviders({ children }) {
  return (
    <GlobalProvider>
      <AuthProvider>{children}</AuthProvider>
    </GlobalProvider>
  );
}

export default AppProviders;
