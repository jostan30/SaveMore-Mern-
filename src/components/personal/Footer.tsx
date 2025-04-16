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
      <footer className="bg-gray-900 text-gray-300">
        {/* Top footer section with benefits */}
        <div className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="flex items-center justify-center md:justify-start">
                <Truck className="h-10 w-10 text-indigo-500 mr-4" />
                <div>
                  <h3 className="font-semibold text-white">Free Shipping</h3>
                  <p className="text-sm">On orders over $100</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:justify-start">
                <ShieldCheck className="h-10 w-10 text-indigo-500 mr-4" />
                <div>
                  <h3 className="font-semibold text-white">Secure Payment</h3>
                  <p className="text-sm">100% secure transactions</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:justify-start">
                <CreditCard className="h-10 w-10 text-indigo-500 mr-4" />
                <div>
                  <h3 className="font-semibold text-white">Easy Returns</h3>
                  <p className="text-sm">30-day return policy</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center md:justify-start">
                <Phone className="h-10 w-10 text-indigo-500 mr-4" />
                <div>
                  <h3 className="font-semibold text-white">Customer Support</h3>
                  <p className="text-sm">24/7 dedicated support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company info */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">ShopNow</h2>
              <p className="mb-4">Your one-stop destination for quality products at affordable prices. We've been serving customers since 2010.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            {/* Quick links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Shop
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Customer service */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    My Account
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Order Tracking
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Wishlist
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Shipping Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Contact info */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-indigo-500 mr-3 mt-1 flex-shrink-0" />
                  <span>123 Shopping Street, New York, NY 10001, USA</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0" />
                  <span>(123) 456-7890</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0" />
                  <span>support@shopnow.com</span>
                </li>
              </ul>
              
              {/* Newsletter subscription */}
              <div className="mt-6">
                <h4 className="text-white font-semibold mb-2">Subscribe to Newsletter</h4>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full"
                  />
                  <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-white rounded-r transition-colors">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom footer */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>&copy; {new Date().getFullYear()} ShopNow. All rights reserved.</p>
              
              <div className="mt-4 md:mt-0">
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Sitemap</a>
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