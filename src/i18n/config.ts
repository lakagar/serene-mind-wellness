import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          brand: {
            name: 'Healing Minds',
            tagline: 'Mindful Connection: Mental wellness and support for everyone, anytime, anywhere.',
          },
          footer: {
            services: 'Services',
            tools: 'Tools',
            legal: 'Legal',
            privacy: 'Privacy Policy',
            terms: 'Terms of Service',
            contact: 'Contact Us',
            copyright: '© 2025 SereneMinds. All rights reserved.',
          },
          nav: {
            home: 'Home',
            aiChat: 'AI Chat',
            counseling: 'Counseling',
            groups: 'Group Sessions',
            meditation: 'Meditation',
            selfHelp: 'Self Help',
            medication: 'Medication',
            moodTracker: 'Mood Tracker',
          },
          mood: {
            title: 'Mood Tracker',
            selectDate: 'Select Date',
            today: 'Today',
            happy: 'Happy',
            calm: 'Calm',
            anxious: 'Anxious',
            sad: 'Sad',
            angry: 'Angry',
            noMood: 'No mood recorded',
            suggestion: 'Select a mood to get a personalized suggestion',
            generateReport: 'Generate Report',
            generating: 'Generating Report...',
            history: 'Your Mood',
            last7Days: 'Your Mood for Past 7 Days',
            allTime: 'Your Mood (All Time)',
            show7Days: 'Show 7 Days',
            showAll: 'Show All',
            therapistReport: 'Therapist Report',
          }
        }
      },
      hi: {
        translation: {
          brand: {
            name: 'हीलिंग माइंड्स',
            tagline: 'माइंडफुल कनेक्शन: सभी के लिए मानसिक स्वास्थ्य और सहायता, कभी भी, कहीं भी।',
          },
          footer: {
            services: 'सेवाएं',
            tools: 'टूल्स',
            legal: 'कानूनी',
            privacy: 'गोपनीयता नीति',
            terms: 'सेवा की शर्तें',
            contact: 'संपर्क करें',
            copyright: '© 2025 सेरेनमाइंड्स। सर्वाधिकार सुरक्षित।',
          },
          nav: {
            home: 'होम',
            aiChat: 'एआई चैट',
            counseling: 'काउंसलिंग',
            groups: 'ग्रुप सेशन',
            meditation: 'ध्यान',
            selfHelp: 'सेल्फ हेल्प',
            medication: 'दवाएं',
            moodTracker: 'मूड ट्रैकर',
          },
          mood: {
            title: 'मूड ट्रैकर',
            selectDate: 'तारीख चुनें',
            today: 'आज',
            happy: 'खुश',
            calm: 'शांत',
            anxious: 'चिंतित',
            sad: 'उदास',
            angry: 'क्रोधित',
            noMood: 'कोई मूड दर्ज नहीं',
            suggestion: 'सुझाव के लिए मूड चुनें',
            generateReport: 'रिपोर्ट बनाएं',
            generating: 'रिपोर्ट बन रही है...',
            history: 'आपका मूड',
            last7Days: 'पिछले 7 दिनों का मूड',
            allTime: 'सभी समय का मूड',
            show7Days: '7 दिन दिखाएं',
            showAll: 'सभी दिखाएं',
            therapistReport: 'चिकित्सक की रिपोर्ट',
          }
        }
      },
      es: {
        translation: {
          brand: {
            name: 'Healing Minds',
            tagline: 'Conexión Consciente: Bienestar mental y apoyo para todos, en cualquier momento, en cualquier lugar.',
          },
          footer: {
            services: 'Servicios',
            tools: 'Herramientas',
            legal: 'Legal',
            privacy: 'Política de Privacidad',
            terms: 'Términos de Servicio',
            contact: 'Contáctenos',
            copyright: '© 2025 SereneMinds. Todos los derechos reservados.',
          },
          nav: {
            home: 'Inicio',
            aiChat: 'Chat IA',
            counseling: 'Consejería',
            groups: 'Sesiones Grupales',
            meditation: 'Meditación',
            selfHelp: 'Autoayuda',
            medication: 'Medicación',
            moodTracker: 'Registro de Ánimo',
          },
          mood: {
            title: 'Registro de Ánimo',
            selectDate: 'Seleccionar Fecha',
            today: 'Hoy',
            happy: 'Feliz',
            calm: 'Tranquilo',
            anxious: 'Ansioso',
            sad: 'Triste',
            angry: 'Enojado',
            noMood: 'Sin registro de ánimo',
            suggestion: 'Selecciona un estado de ánimo para recibir una sugerencia',
            generateReport: 'Generar Informe',
            generating: 'Generando Informe...',
            history: 'Tu Estado de Ánimo',
            last7Days: 'Tu Estado de Ánimo (Últimos 7 días)',
            allTime: 'Tu Estado de Ánimo (Todo el tiempo)',
            show7Days: 'Mostrar 7 días',
            showAll: 'Mostrar Todo',
            therapistReport: 'Informe del Terapeuta',
          }
        }
      }
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
