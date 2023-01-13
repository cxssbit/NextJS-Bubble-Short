import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className="flex flex-col bg-gray-100 min-h-screen">
          {children}
          <footer className="flex">
            <div className="container mx-auto">
              <div className="flex justify-center border-t py-4">
                <div className="inline-block align-middle text-lg">
                  © 2023 Kelompok Algoritma
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
