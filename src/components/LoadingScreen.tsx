import { motion } from 'framer-motion';
import { 
  Brain, 
  Sparkles, 
  Cpu, 
  Zap,
  Activity,
  Database
} from 'lucide-react';

const LoadingScreen = () => {
  const loadingSteps = [
    { icon: Brain, text: 'מנתח את העדפותיכם', delay: 0 },
    { icon: Database, text: 'סורק מאגרי מידע גלובליים', delay: 0.5 },
    { icon: Cpu, text: 'מעבד אלגוריתמים מתקדמים', delay: 1 },
    { icon: Activity, text: 'מייעל את המסלול', delay: 1.5 },
    { icon: Sparkles, text: 'יוצר התוכנית המושלמת', delay: 2 },
    { icon: Zap, text: 'כמעט מוכן!', delay: 2.5 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="text-center max-w-2xl mx-auto px-4">
        {/* Main AI Brain Animation */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="w-32 h-32 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-8 relative"
        >
          <Brain className="w-16 h-16 text-white" />
          
          {/* Pulse rings */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-primary-400/30"
              animate={{
                scale: [1, 2, 3],
                opacity: [0.8, 0.4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.7,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold mb-4 glow-text bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent"
        >
          הבינה המלאכותית עובדת עבורכם
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 text-lg mb-12"
        >
          אנחנו מעבדים את הבקשה שלכם ויוצרים תוכנית טיול מותאמת אישית
        </motion.p>

        {/* Loading Steps */}
        <div className="space-y-6">
          {loadingSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: step.delay }}
              className="flex items-center justify-center gap-4 text-gray-300"
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity, delay: step.delay }
                }}
                className="w-8 h-8 text-primary-400"
              >
                <step.icon className="w-full h-full" />
              </motion.div>
              
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: step.delay + 0.2 }}
                className="text-lg"
              >
                {step.text}
              </motion.span>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: step.delay + 0.5, duration: 0.5 }}
                className="h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex-1 max-w-32"
              />
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <div className="w-full bg-neural-700 rounded-full h-2 mb-4">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="h-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
            />
          </div>
          
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gray-400"
          >
            זה יקח רק כמה שניות...
          </motion.div>
        </motion.div>

        {/* Floating particles around */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary-400/30 rounded-full"
              style={{
                left: `${20 + (i * 60) % 80}%`,
                top: `${30 + (i * 40) % 60}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
