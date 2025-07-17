import Navbar from "@/components/navbar";
import QueryProvider from "@/providers/query-provider";
import ReduxProvider from "@/providers/redux-provider";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout({ children }) {
  return (
    <div className="bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] relative min-h-screen">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      <ReduxProvider>
        <QueryProvider>
          <Navbar />
          {children}
          <Toaster />
        </QueryProvider>
      </ReduxProvider>
    </div>
  );
}
