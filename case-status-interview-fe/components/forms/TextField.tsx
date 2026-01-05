
import InputLabel from "@/components/ui/InputLabel";
import { TextInput } from "@/components/ui/TextInput";
import clsx from "clsx";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
      
type TextFieldProps = {
    label: string;
    error?: FieldError;
    registration: UseFormRegisterReturn;
    type?: string;
    required?: boolean;
    placeholder?: string;
};
      
export function TextField({ label, error, registration, type="text", required, placeholder }: TextFieldProps) {
    return (
        <div className={clsx(error ? "mb-1" : "mb-6")}>
            <InputLabel required={required}>{label}</InputLabel>
            <TextInput registration={registration} type={type} placeholder={placeholder} />
        
        {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    );
}