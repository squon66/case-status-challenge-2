import { TextInput } from "@/components/ui/TextInput";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type DatePickerProps = {
  registration: UseFormRegisterReturn;
  error?: FieldError;
}
export default function DatePicker({ 
  registration, 
  error,
}: DatePickerProps) {
  return (
    <div>
      <TextInput type="date" registration={registration} />
      {error && <span className="text-red-500 text-sm">{String(error.message)}</span>}
    </div>
  );
}