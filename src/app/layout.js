import SmoothScrollProvider from "@/components/canvas/SmoothScrollProvider";

import "./globals.css";
import { Inter } from "next/font/google";
import CustomCursor from "@/lib/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata = {
  title: "Xai – Intelligence Workspace",
  description: "From raw data → structured intelligence → actionable insight → AI Automations.",
};

const RootLayout = ({ children }) => (
  <html lang="en" className={inter.variable}>
    <body className="bg-[#050816] text-[#f1f5f9] font-[var(--font-inter)] antialiased overflow-x-hidden">
      {/* <SmoothScrollProvider> */}
        <CustomCursor /> 
        {children}
      {/* </SmoothScrollProvider> */}
    </body>
  </html>
);

export default RootLayout;