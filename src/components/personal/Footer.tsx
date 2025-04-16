import { 

  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="text-gray-300 bg-gray-900">
      {/* Top footer section with benefits */}
      <div className="border-b border-gray-800">
        <div className="px-4 py-8 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="flex items-center justify-center md:justify-start">
              <Truck className="w-10 h-10 mr-4 text-indigo-500" />
              <div>
                <h3 className="font-semibold text-white">Free Shipping</h3>
                <p className="text-sm">On orders over $100</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-start">
              <ShieldCheck className="w-10 h-10 mr-4 text-indigo-500" />
              <div>
                <h3 className="font-semibold text-white">Secure Payment</h3>
                <p className="text-sm">100% secure transactions</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-start">
              <CreditCard className="w-10 h-10 mr-4 text-indigo-500" />
              <div>
                <h3 className="font-semibold text-white">Easy Returns</h3>
                <p className="text-sm">30-day return policy</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-start">
              <Phone className="w-10 h-10 mr-4 text-indigo-500" />
              <div>
                <h3 className="font-semibold text-white">Customer Support</h3>
                <p className="text-sm">24/7 dedicated support</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      {/* Main footer content */}
      <div className="px-4 py-12 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-white">ShopNow</h2>
            <p className="mb-4">Your one-stop destination for quality products at affordable prices. We've been serving customers since 2010.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center text-gray-400 transition-colors hover:text-white">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-400 transition-colors hover:text-white">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-400 transition-colors hover:text-white">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-400 transition-colors hover:text-white">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-400 transition-colors hover:text-white">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-400 transition-colors hover:text-white">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Blog
                </a>
              </li>
            </ul>
          </div>
          
          {/* Customer service */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center text-gray-400 transition-colors hover:text-white">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  My Account
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-400 transition-colors hover:text-white">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-400 transition-colors hover:text-white">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Wishlist
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-400 transition-colors hover:text-white">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-400 transition-colors hover:text-white">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-gray-400 transition-colors hover:text-white">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="flex-shrink-0 w-5 h-5 mt-1 mr-3 text-indigo-500" />
                <span>123 Shopping Street, New York, NY 10001, USA</span>
              </li>
              <li className="flex items-center">
                <Phone className="flex-shrink-0 w-5 h-5 mr-3 text-indigo-500" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="flex-shrink-0 w-5 h-5 mr-3 text-indigo-500" />
                <span>support@shopnow.com</span>
              </li>
            </ul>
            
            {/* Newsletter subscription */}
            <div className="mt-6">
              <h4 className="mb-2 font-semibold text-white">Subscribe to Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full px-4 py-2 text-white bg-gray-800 rounded-l focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button className="px-4 py-2 text-white transition-colors bg-indigo-600 rounded-r hover:bg-indigo-700">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom footer */}
      <div className="border-t border-gray-800">
        <div className="px-4 py-6 mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p>&copy; {new Date().getFullYear()} ShopNow. All rights reserved.</p>
            
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 transition-colors hover:text-white">Privacy Policy</a>
                <a href="#" className="text-gray-400 transition-colors hover:text-white">Terms of Service</a>
                <a href="#" className="text-gray-400 transition-colors hover:text-white">Sitemap</a>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <img src="/api/placeholder/240/40" alt="Payment Methods" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
