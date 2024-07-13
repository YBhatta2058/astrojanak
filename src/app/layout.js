import { Inter } from "next/font/google";
import { AuthContextProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import './styles/globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Astro Janak",
  description: "This is an astrological service website of Jyotish. Dr. Janak Raj Bhatta",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        <AuthContextProvider>
          {children}
          <Toaster position="top-right" />
        </AuthContextProvider>
      </body>
    </html>
  );
}