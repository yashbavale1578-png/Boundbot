import "./globals.css";

export const metadata = {
  title: "Boundbot Policies",
  description: "Legal and Privacy Policies for Boundbot"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="container">
          <nav className="nav">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
