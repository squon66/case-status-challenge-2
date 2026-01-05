export default function LoadingMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row w-full">
        <div className="w-full text-center p-8 text-gray-500">
            {children}
        </div>
    </div>
  );
}