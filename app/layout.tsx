import '../styles/globals.css';
import Header from '../components/Header';

export const metadata = {
  title: 'tacnbusiness.com',
  description: 'Business directory for church members in Nigeria',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen pt-14"> {/* pt-14 to offset fixed header height */}
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
