// import { Geist, Geist_Mono } from "next/font/google";
// import { Poppins } from "next/font/google";
// import "./globals.css";
// import { Toaster } from "react-hot-toast";
// import Script from "next/script";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "600", "700"],
// });

// export const metadata = {
//   title: "Praveers Foundation – Empowering Rural Futures",
//   description: "Praveera Foundation is a community-led NGO focused on rural education, women empowerment, and environmental sustainability.",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         {/* Include Razorpay only if donation support is added */}
//         <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
//       </head>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} bg-[#fff6f8] text-[#1a1a1a] antialiased`}
//       >
//         <Toaster position="top-center" />
//         {children}
//       </body>
//     </html>
//   );
// }
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: "Praveers Foundation – Empowering Rural Futures",
  description: "Praveera Foundation is a community-led NGO focused on rural education, women empowerment, and environmental sustainability.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Include Razorpay only if donation support is added */}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} bg-[#fff6f8] text-[#1a1a1a] antialiased`} >
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}