import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Heart,
  Camera,
  Mountain,
  Utensils,
  ShoppingBag,
  Music,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { TravelFormData } from '../App';

interface TravelFormProps {
  onSubmit: (data: TravelFormData) => void;
  onBack: () => void;
}

const TravelForm = ({ onSubmit, onBack }: TravelFormProps) => {
  const [formData, setFormData] = useState<TravelFormData>({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: 1000,
    interests: [],
    travelStyle: 'balanced'
  });

  const interestOptions = [
    { id: 'culture', label: 'תרבות והיסטוריה', icon: Camera },
    { id: 'nature', label: 'טבע והרפתקאות', icon: Mountain },
    { id: 'food', label: 'אוכל וקולינריה', icon: Utensils },
    { id: 'shopping', label: 'קניות', icon: ShoppingBag },
    { id: 'nightlife', label: 'חיי לילה', icon: Music },
    { id: 'relaxation', label: 'נופש ומנוחה', icon: Heart }
  ];

  const travelStyleOptions = [
    { id: 'budget', label: 'חסכוני', desc: 'מקסימום חוויה במינימום עלות' },
    { id: 'balanced', label: 'מאוזן', desc: 'שילוב של נוחות וחסכון' },
    { id: 'luxury', label: 'יוקרתי', desc: 'חוויה מפנקת ואיכותית' }
  ];

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.destination && formData.startDate && formData.endDate) {
      onSubmit(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen py-8"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 glow-text bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
            בואו נתכנן את הטיול המושלם שלכם
          </h1>
          <p className="text-gray-300 text-lg">
            ספרו לנו על הטיול שחולמים עליו ואנחנו נדאג לשאר
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-xl p-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-primary-400" />
              פרטי הטיול
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">יעד הטיול</label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                  placeholder="לאן הייתם רוצים לטוס?"
                  className="w-full p-3 bg-neural-800/50 border border-neural-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all backdrop-blur-sm"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">תאריך התחלה</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full p-3 bg-neural-800/50 border border-neural-600 rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all backdrop-blur-sm"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">תאריך סיום</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full p-3 bg-neural-800/50 border border-neural-600 rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all backdrop-blur-sm"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-gray-300 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  מספר נוסעים
                </label>
                <select
                  value={formData.travelers}
                  onChange={(e) => setFormData(prev => ({ ...prev, travelers: parseInt(e.target.value) }))}
                  className="w-full p-3 bg-neural-800/50 border border-neural-600 rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all backdrop-blur-sm"
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'נוסע' : 'נוסעים'}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  תקציב (₪)
                </label>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                  className="w-full accent-primary-500"
                />
                <div className="text-center text-primary-400 font-semibold mt-2">
                  ₪{formData.budget.toLocaleString()}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-xl p-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <Heart className="w-6 h-6 text-accent-400" />
              מה מעניין אתכם?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              {interestOptions.map((interest) => (
                <motion.button
                  key={interest.id}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.interests.includes(interest.id)
                      ? 'border-primary-500 bg-primary-500/20 text-primary-300'
                      : 'border-neural-600 bg-neural-800/30 text-gray-300 hover:border-primary-600'
                  }`}
                >
                  <interest.icon className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-medium">{interest.label}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-xl p-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">סגנון הטיול</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              {travelStyleOptions.map((style) => (
                <motion.button
                  key={style.id}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData(prev => ({ ...prev, travelStyle: style.id }))}
                  className={`p-6 rounded-lg border-2 transition-all text-center ${
                    formData.travelStyle === style.id
                      ? 'border-accent-500 bg-accent-500/20 text-accent-300'
                      : 'border-neural-600 bg-neural-800/30 text-gray-300 hover:border-accent-600'
                  }`}
                >
                  <div className="font-semibold text-lg mb-2">{style.label}</div>
                  <div className="text-sm opacity-80">{style.desc}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 px-8 py-3 bg-neural-700 hover:bg-neural-600 text-white rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              חזרה
            </button>
            
            <button
              type="submit"
              className="btn-ai bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 text-white font-bold py-3 px-12 rounded-lg text-lg shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center gap-3">
                תן לי ליצור את התוכנית המושלמת
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default TravelForm;
