import { 
  Send, 
  Globe, 
  Share2, 
  MessageCircle, 
  Users 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Subscribe Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Exclusive</h2>
          <h3 className="text-lg">Subscribe</h3>
          <p className="text-sm">Get 10% off your first order</p>
          <div className="relative border border-white rounded px-4 py-2 flex items-center">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-transparent outline-none w-full text-sm"
            />
            <Send className="w-5 h-5 cursor-pointer" />
          </div>
        </div>

        {/* Support Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Support</h3>
          <p className="text-sm">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p className="text-sm">exclusive@gmail.com</p>
          <p className="text-sm">+88015-88888-9999</p>
        </div>

        {/* Account Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Account</h3>
          <ul className="space-y-2 text-sm">
            <li>My Account</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>

        {/* Quick Link Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Quick Link</h3>
          <ul className="space-y-2 text-sm">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Social Section (Using Lucide alternatives) */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Social</h3>
          <div className="flex gap-4">
            <Globe className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors" />
            <Share2 className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors" />
            <MessageCircle className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors" />
            <Users className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors" />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-12 pt-8 border-t border-gray-800 text-gray-500 text-sm">
        &copy; Copyright Rimel 2022. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;