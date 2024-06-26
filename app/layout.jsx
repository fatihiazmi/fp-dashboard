import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "First Pride | Dashboard",
  description: "First Pride Nugget Quest Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar>
            <main className="px-6 py-4">{children}</main>
          </Navbar>
        </AuthProvider>
      </body>
    </html>
  );
}
