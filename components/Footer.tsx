// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold">tacnbusiness.com</h2>
          <p className="mt-2 text-sm">
            A trusted business directory for members of The Apostolic Church Nigeria.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/list-business" className="hover:underline">List Business</a></li>
            <li><a href="/pricing" className="hover:underline">Pricing</a></li>
            <li><a href="/profile" className="hover:underline">Profile</a></li>
          </ul>
        </div>

        {/* Territories & Contact */}
        <div>
          <h3 className="font-semibold mb-2">Nigerian Territories</h3>
          <ul className="space-y-1 text-sm">
            <li>LAWNA Territory</li>
            <li>Igboland Territory</li>
            <li>Akwa-Ibom Territory</li>
            <li>Cross River Territory</li>
            <li>Maritime Territory</li>
          </ul>
          <p className="mt-4 text-sm">Email: support@tacnbusiness.com</p>
        </div>
      </div>

      <div className="bg-blue-700 text-center py-3 text-sm">
        &copy; {new Date().getFullYear()} tacnbusiness.com. All rights reserved.
      </div>
    </footer>
  );
}
