import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center p-6">
      <div className="fixed top-4 left-4 z-50">
        <Link href="/" className="flex items-center text-white bg-black/20 hover:bg-black/30 backdrop-blur-sm p-2 rounded-full transition-all duration-200">
          <ArrowLeft size={24} />
        </Link>
      </div>
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
        {children}
      </div>
    </div>
  );
}
