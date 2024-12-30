// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
          <head>
              <title>Wizard Flow</title>
          </head>
          <body>
              <header>
                  <h1>Welcome to the Wizard App</h1>
              </header>
              <main>{children}</main>
              <footer>© 2024 Wizard App</footer>
          </body>
      </html>
  );
}

