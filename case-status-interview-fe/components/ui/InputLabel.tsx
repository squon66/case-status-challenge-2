export default function InputLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {children}
      {required && <span> *</span>}
    </label>
  );
}