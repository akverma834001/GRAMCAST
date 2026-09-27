import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { PanchayatData, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AudioNarratorProps {
  weather: PanchayatData;
  lang: Language;
}

export const AudioNarrator: React.FC<AudioNarratorProps> = ({ weather, lang }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleVoice = () => {
    if (!('speechSynthesis' in window)) {
      alert("Speech synthesis is not supported on this browser.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    let textToSpeak = "";
    let speechLang = "en-IN";

    if (lang === 'hi') {
      speechLang = "hi-IN";
      textToSpeak = `ग्रामकास्ट मौसम बुलेटिन। ${weather.name} में आज का तापमान ${weather.current.temp} अंश सेल्सियस है। वर्षा की संभावना ${weather.current.rainProb} प्रतिशत है, और ${weather.current.rainfallExpected} वर्षा हो सकती है। कृषि सलाह: ${weather.guidance[0]?.hindiRecommendation || ''}`;
    } else {
      speechLang = "en-IN";
      textToSpeak = `GRAMCAST weather bulletin for ${weather.name}. Today's temperature is ${weather.current.temp} degrees celsius. Rain probability is ${weather.current.rainProb} percent, with ${weather.current.rainfallExpected} expected rainfall. Farm advisory: ${weather.guidance[0]?.recommendation || ''}`;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = speechLang;
    utterance.rate = 0.95;

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  return (
    <button
      onClick={handleToggleVoice}
      className="btn btn-secondary btn-sm"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: isPlaying ? '#fef2f2' : '#ffffff',
        borderColor: isPlaying ? '#dc2626' : 'var(--neutral-300)',
        color: isPlaying ? '#dc2626' : 'var(--neutral-700)',
        fontWeight: 600
      }}
      title={isPlaying ? t.stopAudio : t.listenAdvisory}
    >
      {isPlaying ? (
        <>
          <VolumeX size={15} color="#dc2626" />
          <span>{t.stopAudio}</span>
        </>
      ) : (
        <>
          <Volume2 size={15} color="var(--gov-navy)" />
          <span>{t.listenAdvisory}</span>
        </>
      )}
    </button>
  );
};
