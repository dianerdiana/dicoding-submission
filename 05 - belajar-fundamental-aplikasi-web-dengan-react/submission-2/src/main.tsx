import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import { LanguageContextProvider } from "./utils/context/LanguangeContext.tsx";
import { ThemeContextProvider } from "./utils/context/ThemeContext.tsx";
import { AuthContextProvider } from "./utils/context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <ThemeContextProvider>
        <LanguageContextProvider>
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toasterId="default"
            toastOptions={{
              // Define default options
              className: "",
              duration: 5000,
              removeDelay: 1000,
              style: {
                background: "#f5f5f5",
                color: "#203562",
              },

              // Default options for specific types
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "#203562",
                  secondary: "#f5f5f5",
                },
              },
            }}
          />
          <App />
        </LanguageContextProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
