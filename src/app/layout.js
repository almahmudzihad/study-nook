import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/shared/Navbar";
import Footer from "@/Components/shared/Footer";
import { ToastContainer } from "react-toastify";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Study Nook",
  description: "Study Nook",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      
    >
      <body className={`${inter.variable} ${poppins.variable}`}>
        <Navbar />
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
