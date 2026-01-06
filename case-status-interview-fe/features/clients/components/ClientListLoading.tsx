import { DismissableAlert } from "@/components/DismissableAlert";
import LoadingMessage from "@/components/ui/LoadingMessage";

export function ClientListError({ error }: { error: Error }) {
    return <DismissableAlert type="error" message={`Error loading clients: ${error.message}`} />;
}

export function ClientListLoading() {
  return <LoadingMessage>Loading clients...</LoadingMessage>
}

export function ClientsPageHeader({children}: {children: React.ReactNode}) {
  return <h1 className="text-2xl font-bold text-center">{children}</h1>;
}