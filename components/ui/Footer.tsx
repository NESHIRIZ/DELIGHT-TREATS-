import Link from 'next/link'

export default function Footer(){
  return (
    <footer className="bg-brand-muted text-gray-700 mt-12">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-xl font-semibold">Delight Treats</h3>
          <p className="mt-2 text-sm">Freshly Baked Happiness Delivered Daily. Handcrafted pastries and custom cakes made with love.</p>
        </div>

        <div>
          <h4 className="font-medium mb-2">Quick Links</h4>
          <ul className="text-sm space-y-1">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/custom-cakes">Custom Cakes</Link></li>
            <li><Link href="/events">Events</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-2">Contact</h4>
          <p className="text-sm">hello@delighttreats.example</p>
          <p className="text-sm">+1 (555) 123-4567</p>
          <div className="mt-4 flex gap-3">
            <a aria-label="Instagram" href="#" className="text-gray-700">IG</a>
            <a aria-label="Facebook" href="#" className="text-gray-700">FB</a>
            <a aria-label="Twitter" href="#" className="text-gray-700">TW</a>
          </div>
        </div>
      </div>
      <div className="border-t bg-brand-muted/90 py-4">
        <div className="container text-sm text-center">© {new Date().getFullYear()} Delight Treats. All rights reserved.</div>
      </div>
    </footer>
  )
}
