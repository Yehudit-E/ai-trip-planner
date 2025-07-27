import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  MapPin, 
  Users, 
  Zap, 
  Brain,
  Plane,
  Heart,
  Clock
} from 'lucide-react';
import TravelForm from './components/TravelForm';
import TravelPlan from './components/TravelPlan';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import { openAIService } from './services/openai';

export interface TravelFormData {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
  interests: string[];
  travelStyle: string;
}

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'form' | 'plan' | 'loading'>('home');
  const [travelData, setTravelData] = useState<TravelFormData | null>(null);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const handleStartPlanning = () => {
    setCurrentView('form');
  };

  const handleFormSubmit = async (data: TravelFormData) => {
    setTravelData(data);
    setCurrentView('loading');
    
    try {
      const plan = await openAIService.generateTravelPlan(data);
      setGeneratedPlan(plan);
      setCurrentView('plan');
    } catch (error) {
      console.error('Error generating travel plan:', error);
      // במקרה של שגיאה, נחזור לטופס
      setCurrentView('form');
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setTravelData(null);
    setGeneratedPlan(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neural-900 via-neural-800 to-primary-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 neural-bg"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400 rounded-full particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <Header onBackToHome={handleBackToHome} showBackButton={currentView !== 'home'} />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="container mx-auto px-4 py-12"
            >
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mb-8 mx-auto"
                >
                  <Brain className="w-10 h-10 text-white" />
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-6xl font-bold mb-6 glow-text bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent"
                >
                  AI Travel Planner
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto typewriter"
                >
                  מתכנן הטיולים החכם שיוצר עבורך את החוויה המושלמת
                </motion.div>
              </div>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto"
              >
                {[
                  { icon: Zap, title: 'תכנון מיידי', desc: 'קבלו תוכנית מלאה תוך שניות' },
                  { icon: Brain, title: 'בינה מלאכותית', desc: 'אלגוריתמים מתקדמים לחוויה אישית' },
                  { icon: Sparkles, title: 'המלצות חכמות', desc: 'גלו מקומות חבויים ומיוחדים' }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="glass rounded-xl p-6 text-center group"
                  >
                    <feature.icon className="w-12 h-12 text-primary-400 mx-auto mb-4 group-hover:text-accent-400 transition-colors" />
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
                className="text-center"
              >
                <button
                  onClick={handleStartPlanning}
                  className="btn-ai bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 text-white font-bold py-4 px-12 rounded-full text-xl shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center gap-3">
                    <Plane className="w-6 h-6" />
                    התחל לתכנן את הטיול שלך
                    <Sparkles className="w-6 h-6" />
                  </span>
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-2xl mx-auto"
              >
                {[
                  { icon: Users, value: '10K+', label: 'משתמשים' },
                  { icon: MapPin, value: '150+', label: 'יעדים' },
                  { icon: Heart, value: '95%', label: 'שביעות רצון' },
                  { icon: Clock, value: '30s', label: 'זמן תכנון' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <stat.icon className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {currentView === 'form' && (
            <TravelForm onSubmit={handleFormSubmit} onBack={handleBackToHome} />
          )}

          {currentView === 'loading' && (
            <LoadingScreen />
          )}

          {currentView === 'plan' && generatedPlan && (
            <TravelPlan plan={generatedPlan} onBack={handleBackToHome} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
