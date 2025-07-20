import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import QueryProvider from "@/providers/query-provider";
import ReduxProvider from "@/providers/redux-provider";

export default function MainLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-purple-500/5 dark:from-green-400/10 dark:via-blue-400/10 dark:to-purple-400/10"></div>
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-green-100/20 via-blue-100/10 to-transparent dark:from-green-900/20 dark:via-blue-900/10 dark:to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-blue-100/20 via-green-100/10 to-transparent dark:from-blue-900/20 dark:via-green-900/10 dark:to-transparent"></div>
      <div className="relative z-10">
        <ReduxProvider>
          <QueryProvider>
            <Navbar />
            {children}
            <Footer />
          </QueryProvider>
        </ReduxProvider>
      </div>
    </div>
  );
}
