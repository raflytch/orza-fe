import QueryProvider from "@/providers/query-provider";
import ReduxProvider from "@/providers/redux-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Orza - Login",
  description: "Masuk ke platform teknologi pertanian",
};

export default function AuthLayout({ children }) {
  return (
    <div className="bg-white min-h-screen">
      <ReduxProvider>
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </ReduxProvider>
    </div>
  );
}
