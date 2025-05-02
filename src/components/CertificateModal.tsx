import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificateUrl: string;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose, certificateUrl }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-[90vw] h-[90vh] bg-gray-900 rounded-xl p-4"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 z-50 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200 border-2 border-gray-700"
          >
            <X className="w-6 h-6 text-gray-300 hover:text-white" />
          </button>
          
          <div className="w-full h-full overflow-hidden rounded-lg">
            <div className="linkedin-embed-container">
              <iframe
                src={certificateUrl}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                title="LinkedIn Certificate"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CertificateModal;