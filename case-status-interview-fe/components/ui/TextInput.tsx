import { cn } from "@/lib/utils/tailwindUtils";
import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  registration: UseFormRegisterReturn;
};

export function TextInput({ registration, className, ...props }: TextInputProps) {
  const baseClass = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500";
  return <input {...registration} {...props} className={cn(baseClass, className)} />;
}