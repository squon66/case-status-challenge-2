import DatePicker from "@/components/ui/DatePicker";
import InputLabel from "@/components/ui/InputLabel";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type DateFieldProps = {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  required?: boolean;
}

export default function DateField({ 
  label, 
  registration, 
  error, 
  required 
}: DateFieldProps) {
  return (
    <>
      <InputLabel required={required}>{label}</InputLabel>
      <DatePicker registration={registration} error={error} />
    </>
  );
}