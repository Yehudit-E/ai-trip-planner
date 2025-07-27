import { motion } from 'framer-motion';
import { ArrowRight, Brain } from 'lucide-react';

interface HeaderProps {
  onBackToHome: () => void;
  showBackButton: boolean;
}

const Header = ({ onBackToHome, showBackButton }: HeaderProps) => {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative z-20 p-6"
    >
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">AI Travel Planner</span>
        </div>
        
        {showBackButton && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBackToHome}
            className="flex items-center gap-2 bg-neural-700/50 hover:bg-neural-600/50 text-white px-4 py-2 rounded-lg transition-colors backdrop-blur-sm"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            חזרה לעמוד הראשי
          </motion.button>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
