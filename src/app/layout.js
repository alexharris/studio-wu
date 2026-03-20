export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen m-0">
        {children}
      </body>
    </html>
  );
}
