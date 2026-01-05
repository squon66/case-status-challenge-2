export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row w-full">
      <div className="w-full text-center p-8 text-red-500">
        {children}
      </div>
    </div>
  );
}