"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          backgroundColor: "#f8fafc",
          color: "#0f172a",
        }}
      >
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              maxWidth: "28rem",
              width: "100%",
              backgroundColor: "#ffffff",
              border: "1px solid #fecaca",
              borderRadius: "24px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              padding: "32px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                backgroundColor: "#fee2e2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <AlertTriangle
                style={{ height: "32px", width: "32px", color: "#ef4444" }}
              />
            </div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "700",
                marginBottom: "8px",
              }}
            >
              Application Error
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#64748b",
                marginBottom: "24px",
              }}
            >
              A critical application error occurred. Please try reloading the
              page.
            </p>
            <button
              onClick={() => reset()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#0ea5e9",
                color: "#ffffff",
                fontWeight: "600",
                padding: "12px 24px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
            >
              <RefreshCw style={{ height: "16px", width: "16px" }} />
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
};
export default GlobalError;
