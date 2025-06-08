import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';


export const metadata = {
  title: 'tacnbusiness.com',
  description: 'Business directory for church members in Nigeria',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen pt-14 px-4 sm:px-6 lg:px-8">
        <Header />
        <main className="max-w-7xl mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
