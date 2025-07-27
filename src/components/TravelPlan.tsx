import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Clock,
  Star,
  ArrowLeft,
  Download,
  Share,
  Heart,
  CheckCircle,
  Info,
  DollarSign,
  CloudSun,
  AlertTriangle
} from 'lucide-react';
import { GeneratedTravelPlan } from '../services/openai';

interface TravelPlanProps {
  plan: GeneratedTravelPlan;
  onBack: () => void;
}

const TravelPlan = ({ plan, onBack }: TravelPlanProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="min-h-screen py-8"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle className="w-12 h-12 text-green-400" />
            <h1 className="text-4xl font-bold glow-text bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              התוכנית שלכם מוכנה!
            </h1>
          </div>
          <p className="text-gray-300 text-lg">
            תוכנית טיול מותאמת אישית ליעד {plan.destination}
          </p>
        </motion.div>

        {/* Trip Overview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl p-8 mb-8"
        >
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 text-primary-400 mb-2" />
              <span className="text-gray-400 text-sm">יעד</span>
              <span className="text-white font-semibold text-lg">{plan.destination}</span>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 text-accent-400 mb-2" />
              <span className="text-gray-400 text-sm">משך הטיול</span>
              <span className="text-white font-semibold text-lg">{plan.duration}</span>
            </div>
            <div className="flex flex-col items-center">
              <DollarSign className="w-8 h-8 text-green-400 mb-2" />
              <span className="text-gray-400 text-sm">תקציב</span>
              <span className="text-white font-semibold text-lg">₪{plan.budget.toLocaleString()}</span>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-8 h-8 text-yellow-400 mb-2" />
              <span className="text-gray-400 text-sm">דירוג AI</span>
              <span className="text-white font-semibold text-lg">9.7/10</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center mb-8"
        >
          <button className="btn-ai bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
            <Download className="w-4 h-4" />
            הורד כ-PDF
          </button>
          <button className="btn-ai bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
            <Share className="w-4 h-4" />
            שתף עם חברים
          </button>
          <button className="btn-ai bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
            <Heart className="w-4 h-4" />
            שמור למועדפים
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Itinerary */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-xl p-8"
            >
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-primary-400" />
                תוכנית יום ביום
              </h2>
              
              <div className="space-y-6">
                {plan.itinerary.map((day, index) => (
                  <motion.div
                    key={day.day}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="relative"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold">
                        {day.day}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-3">{day.title}</h3>
                        <div className="grid md:grid-cols-2 gap-2">
                          {day.activities.map((activity, actIndex) => (
                            <motion.div
                              key={actIndex}
                              whileHover={{ scale: 1.02, x: 5 }}
                              className="bg-neural-800/30 rounded-lg p-3 text-gray-300 border border-neural-600/50 hover:border-primary-500/50 transition-all cursor-pointer"
                            >
                              <span className="text-sm">• {activity}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {index < plan.itinerary.length - 1 && (
                      <div className="absolute right-6 top-12 w-0.5 h-8 bg-gradient-to-b from-primary-500 to-accent-500"></div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recommendations Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="glass rounded-xl p-6 sticky top-8"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-accent-400" />
                עצות חכמות מה-AI
              </h3>
              
              <div className="space-y-4">
                {plan.recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 rounded-lg p-4 text-gray-300"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{rec}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* AI Confidence Score */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">97%</div>
                  <div className="text-sm text-gray-400">רמת ביטחון AI</div>
                  <div className="text-xs text-gray-500 mt-2">
                    התוכנית מותאמת בצורה מושלמת להעדפות שלכם
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Back Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-12"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-8 py-3 bg-neural-700 hover:bg-neural-600 text-white rounded-lg transition-colors mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            תכנן טיול נוסף
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TravelPlan;
