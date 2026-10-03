import React, { useState, useEffect } from 'react';
import {
  MapPin,
  X,
  Navigation,
  ExternalLink,
  Sparkles,
  Phone,
  Star,
  CheckCircle2,
  AlertCircle,
  LocateFixed,
  Building2,
} from 'lucide-react';
import { fetchWithFallback } from '../lib/api-config';

interface MapsGroundingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLocationName?: string;
}

export const MapsGroundingModal: React.FC<MapsGroundingModalProps> = ({
  isOpen,
  onClose,
  defaultLocationName = 'Delhi',
}) => {
  const [cityName, setCityName] = useState(defaultLocationName);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [places, setPlaces] = useState<any[]>([]);
  const [overview, setOverview] = useState('');
  const [error, setError] = useState('');

  const popularCities = [
    { name: 'दिल्ली (Delhi NCR)', lat: 28.6139, lng: 77.209 },
    { name: 'मुंबई (Mumbai)', lat: 19.076, lng: 72.8777 },
    { name: 'बेंगलुरु (Bengaluru)', lat: 12.9716, lng: 77.5946 },
    { name: 'लखनऊ (Lucknow)', lat: 26.8467, lng: 80.9462 },
    { name: 'वाराणसी (Varanasi)', lat: 25.3176, lng: 82.9739 },
    { name: 'जयपुर (Jaipur)', lat: 26.9124, lng: 75.7873 },
  ];

  useEffect(() => {
    if (isOpen && places.length === 0) {
      handleSearchClinics(28.6139, 77.209, 'Delhi NCR');
    }
  }, [isOpen]);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError('आपके ब्राउज़र में जीपीएस सपोर्ट नहीं है। कृपया नीचे दी गई सूची से शहर चुनें।');
      return;
    }
    setIsDetectingGps(true);
    setError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsDetectingGps(false);
        const { latitude, longitude } = pos.coords;
        setCoordinates({ lat: latitude, lng: longitude });
        setCityName('मेरी वर्तमान लोकेशन (My Location)');
        handleSearchClinics(latitude, longitude, 'मेरी वर्तमान लोकेशन');
      },
      (err) => {
        setIsDetectingGps(false);
        console.warn('Geolocation denied or unavailable:', err);
        setError('लोकेशन अनुमति नहीं मिली। दिल्ली-एनसीआर के नजदीकी क्लिनिक दिखाए जा रहे हैं।');
        handleSearchClinics(28.6139, 77.209, 'Delhi NCR');
      },
      { timeout: 7000 }
    );
  };

  const handleSearchClinics = async (lat: number, lng: number, placeLabel: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchWithFallback('https://chotelalji-tts.sumitshrivas24.workers.dev/api/ayurveda/find-clinics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude: lat,
          longitude: lng,
          query: `Ayurvedic clinics, Panchakarma therapy centers, and herbal pharmacies in ${placeLabel}`,
        }),
      });

      if (!res.ok) throw new Error('Clinic finder error');
      const data = await res.json();
      setPlaces(data.places || []);
      setOverview(data.overview || '');
    } catch (err: any) {
      console.warn('Maps grounding note:', err);
      setError('क्लिनिक खोजने में त्रुटि। कृपया शहर चुनें।');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight">सत्यापित आयुर्वेदिक क्लिनिक एवं पंचकर्म केंद्र</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
                  Google Maps Grounded
                </span>
              </div>
              <p className="text-xs text-slate-300">
                gemini-3.5-flash द्वारा लाइव Google Maps स्थान एवं दिशा-निर्देश (Navigation)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Location selector & GPS */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              onClick={detectLocation}
              disabled={isDetectingGps || loading}
              className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <LocateFixed className={`w-4 h-4 ${isDetectingGps ? 'animate-spin' : ''}`} />
              <span>{isDetectingGps ? 'GPS से खोज रहे हैं...' : 'मेरे पास खोजें (Use My GPS)'}</span>
            </button>

            {/* City presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap">शहर चुनें:</span>
              {popularCities.map((city, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCityName(city.name);
                    setCoordinates({ lat: city.lat, lng: city.lng });
                    handleSearchClinics(city.lat, city.lng, city.name);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-700 hover:text-emerald-800 bg-white hover:bg-emerald-50 border border-slate-200 whitespace-nowrap transition-colors"
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Places List Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin mx-auto" />
              <p className="text-xs sm:text-sm font-bold text-slate-700">
                Google Maps से आसपास के आयुर्वेदिक अस्पताल और केंद्र खोजे जा रहे हैं...
              </p>
              <span className="text-xs text-slate-400">gemini-3.5-flash Google Maps Grounding सक्रिय है</span>
            </div>
          ) : (
            <div className="space-y-6">
              {overview && (
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                  <strong className="text-emerald-950 font-black block mb-1">स्थान सारांश:</strong>
                  {overview}
                </div>
              )}

              {/* List of Places with Google Maps navigation links */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  सत्यापित केंद्र एवं गूगल मैप्स लिंक ({places.length})
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {places.map((place, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-lg transition-all flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <h5 className="text-sm font-black text-slate-900 leading-snug">
                              {place.title}
                            </h5>
                          </div>
                        </div>

                        {place.snippets && place.snippets.length > 0 && (
                          <div className="p-2.5 rounded-xl bg-slate-50 text-[11px] text-slate-600 italic">
                            "{place.snippets[0]}"
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> सत्यापित केंद्र
                        </span>

                        {/* Direct Google Maps Navigation Link (MANDATORY REQUIREMENT) */}
                        <a
                          href={place.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
                        >
                          <Navigation className="w-3 h-3" />
                          <span>मैप्स पर रास्ता देखें</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
