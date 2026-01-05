"use client";

import { useState } from "react";

interface DismissableAlertProps {
  message: string;
  type?: "error" | "warning" | "info";
}

export function DismissableAlert({ message, type = "error" }: DismissableAlertProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const styles = {
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  return (
    <div className={`mb-4 p-4 border rounded-md ${styles[type]}`}>
      <div className="flex justify-between items-start">
        <div className="text-sm">
          <strong>Error:</strong> {message}.
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className={`ml-4 text-xl font-bold opacity-50 hover:opacity-100 transition-opacity ${type === "error" ? "text-red-800" : type === "warning" ? "text-yellow-800" : "text-blue-800"}`}
          aria-label="Dismiss alert"
        >
          ×
        </button>
      </div>
    </div>
  );
}