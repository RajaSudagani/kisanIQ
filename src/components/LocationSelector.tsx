import React, { useState } from 'react';
import { MapPin, Navigation, Check, Loader2 } from 'lucide-react';

interface LocationSelectorProps {
  location?: { lat?: number; lon?: number; name?: string };
  onLocationChange: (loc: { lat?: number; lon?: number; name?: string }) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({ location, onLocationChange }) => {
  const [loadingGeo, setLoadingGeo] = useState(false);
  const [manualInput, setManualInput] = useState(location?.name || '');

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setLoadingGeo(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLoadingGeo(false);
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        onLocationChange({
          lat,
          lon,
          name: `Field (${lat.toFixed(4)}°, ${lon.toFixed(4)}°)`
        });
      },
      (err) => {
        setLoadingGeo(false);
        alert('Could not access current location. Using fallback regional weather location.');
        onLocationChange({
          lat: 16.3067,
          lon: 80.4365,
          name: 'Guntur District, Andhra Pradesh'
        });
      },
      { timeout: 8000 }
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        
        {/* Geolocation CTA */}
        <button
          type="button"
          onClick={handleGeolocate}
          disabled={loadingGeo}
          className="btn-secondary text-xs py-2.5 px-4 flex items-center justify-center gap-2 shrink-0 border-emerald-700 text-emerald-900 hover:bg-emerald-50"
        >
          {loadingGeo ? (
            <Loader2 className="w-4 h-4 text-emerald-700 animate-spin" />
          ) : (
            <Navigation className="w-4 h-4 text-emerald-700 fill-emerald-100" />
          )}
          <span>{loadingGeo ? 'Acquiring GPS...' : 'Use My GPS Location'}</span>
        </button>

        <span className="text-xs text-slate-400 text-center font-medium">or</span>

        {/* Manual Location Input */}
        <div className="relative flex-1">
          <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={manualInput}
            onChange={(e) => {
              setManualInput(e.target.value);
              onLocationChange({ name: e.target.value });
            }}
            placeholder="Enter District or Village (e.g. Guntur, AP)"
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg outline-none focus:border-emerald-500 focus:bg-white text-slate-800 font-medium"
          />
        </div>

      </div>

      {/* Selected Location Pill */}
      {location?.name && (
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold px-3 py-1 rounded-full">
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span>Weather Target: {location.name}</span>
        </div>
      )}
    </div>
  );
};
