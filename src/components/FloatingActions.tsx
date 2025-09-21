import React from 'react';
import { MessageCircle, Phone, Mail } from 'lucide-react';

interface FloatingActionsProps {
  onInquiryClick: () => void;
}

const FloatingActions: React.FC<FloatingActionsProps> = ({ onInquiryClick }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col space-y-3">
        {/* WhatsApp */}
        <a
          href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </a>

        {/* Phone */}
        <a
          href={`tel:${import.meta.env.VITE_CONTACT_PHONE}`}
          className="bg-blue-500 hover:bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        >
          <Phone className="w-6 h-6" />
        </a>

        {/* Quick Inquiry */}
        <button
          onClick={onInquiryClick}
          className="bg-red-600 hover:bg-red-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        >
          <Mail className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default FloatingActions;