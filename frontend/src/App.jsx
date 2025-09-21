import React from "react";
import { RouterProvider } from "react-router-dom";
import { AppProviders } from "./context/index.jsx";
import { router } from "./routes.jsx";

function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;
