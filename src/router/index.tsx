import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
  breadcrumbs: { label: string; path: string }[];
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
  breadcrumbs: [],
});

const PAGE_TITLES: Record<string, { title: string; desc: string }> = {
  '/': {
    title: 'छोटेलाल जी हेल्थ (Chotelal Ji Health) - मुफ़्त आयुर्वेदिक सलाह व AI निदान',
    desc: 'घर बैठे 100% मुफ़्त AI आयुर्वेदिक स्वास्थ्य जांच और जड़ी-बूटी उपचार। बवासीर, तनाव, बाल झड़ना और पाचन की विश्वसनीय सलाह।',
  },
  '/diagnose': {
    title: 'AI लक्षण जांच व निदान - Chotelal Ji Health',
    desc: 'अपने लक्षण बताएं और 30 वर्षों के अनुभव पर आधारित सटीक आयुर्वेदिक परामर्श और घरेलू नुस्खे 1 मिनट में पाएं।',
  },
  '/categories': {
    title: 'स्वास्थ्य श्रेणियां (Health Categories) - Chotelal Ji Health',
    desc: 'बवासीर, मानसिक स्वास्थ्य, बाल, पाचन, त्वचा, नींद, रोग प्रतिरोधक क्षमता और सामान्य स्वास्थ्य उपचार।',
  },
  '/remedies': {
    title: 'आयुर्वेदिक घरेलू नुस्खे (Ayurvedic Remedies) - Chotelal Ji Health',
    desc: 'प्राचीन व वैज्ञानिक आयुर्वेदिक औषधियां, काढ़े, लेप और प्राकृतिक चिकित्सा विधियां।',
  },
  '/herbs': {
    title: 'जड़ी-बूटी ज्ञानकोष (Herbs Encyclopedia) - Chotelal Ji Health',
    desc: 'त्रिफला, अश्वगंधा, गिलोय, ब्राह्मी, नीम, तुलसी जैसी 50+ औषधीय जड़ी-बूटियों के गुण, सेवन विधि व लाभ।',
  },
  '/yoga': {
    title: 'योग एवं प्राणायाम निर्देशिका (Yoga & Exercises) - Chotelal Ji Health',
    desc: 'रोगानुसार योगासन, भ्रामरी, अश्विनी मुद्रा, कपालभाति और सूर्य नमस्कार के प्रामाणिक तरीके।',
  },
  '/diet': {
    title: 'आयुर्वेदिक आहार एवं पोषण चार्ट (Diet & Nutrition) - Chotelal Ji Health',
    desc: 'वात, पित्त और कफ प्रकृति के अनुसार संतुलित भोजन, पथ्य-अपथ्य और मौसमी ऋतुचर्या नियम।',
  },
  '/blog': {
    title: 'स्वास्थ्य ब्लॉग व ज्ञान लेख (Health Articles) - Chotelal Ji Health',
    desc: 'दैनिक जीवन में आयुर्वेद, रोग निवारण और निरोगी जीवनशैली पर सरल और उपयोगी लेख।',
  },
  '/about': {
    title: 'छोटेलाल जी के बारे में (About Chotelal Ji) - 30 वर्षों का अनुभव',
    desc: 'छोटेलाल जी का 30 वर्षों का अनुभव, सेवा भावना और हर भारतीय तक सुलभ व निशुल्क स्वास्थ्य पहुंचाने का संकल्प।',
  },
  '/contact': {
    title: 'संपर्क करें (Contact Us) - Chotelal Ji Health',
    desc: 'छोटेलाल जी हेल्थ से संपर्क करें। सहायता ईमेल: overactingofficial7@gmail.com एवं Google Support Form।',
  },
  '/diet-expert': {
    title: 'AI डाइट एक्सपर्ट (Diet Expert) - Chotelal Ji Health',
    desc: 'वजन घटाने, वजन बढ़ाने और स्वस्थ फिटनेस के लिए 5-मील आयुर्वेदिक एवं वैज्ञानिक डाइट चार्ट 1 मिनट में पाएं।',
  },
  '/category/piles': {
    title: 'बवासीर व सिटिंग समस्या (Piles & Sitting Care) - Chotelal Ji Health',
    desc: 'अर्श, फिशर, सिटिंग दर्द, गुदा जलन के लिए 100% प्राकृतिक त्रिफला, सिट्ज बाथ व आयुर्वेदिक नुस्खे।',
  },
  '/category/hair': {
    title: 'बाल झड़ना व बाल विकास (Hair Growth & Care) - Chotelal Ji Health',
    desc: 'खालित्य, रूसी, डैंड्रफ और असमय सफेद बालों के लिए भृंगराज, आंवला और प्राकृतिक तेल चिकित्सा।',
  },
  '/category/mental-health': {
    title: 'तनाव, चिंता व अनिद्रा (Mental Health & Peace) - Chotelal Ji Health',
    desc: 'ओवरथिंकिंग, डिप्रेशन, घबराहट के लिए मेध्य रसायन, ब्राह्मी, अश्वगंधा व शांत योग।',
  },
  '/category/digestion': {
    title: 'पाचन, गैस व एसिडिटी (Digestion & Gut Health) - Chotelal Ji Health',
    desc: 'कब्ज, मंदाग्नि, सीने में जलन और अपच को ठीक करने के अचूक आयुर्वेदिक उपाय।',
  },
  '/category/skin': {
    title: 'त्वचा रोग व रक्त शुद्धि (Skin Care & Glow) - Chotelal Ji Health',
    desc: 'कील-मुहासे, दाद, खुजली और एलर्जी के लिए नीम, मंजिष्ठा और रक्तशोधक घरेलू उपचार।',
  },
  '/category/sleep': {
    title: 'गहरी नींद व अनिद्रा उपचार (Sleep & Relaxation) - Chotelal Ji Health',
    desc: 'अनिद्रा, देर रात जागने और बेचैनी से मुक्ति के लिए पाद-अभ्यंग और प्राकृतिक स्लीप रूटीन।',
  },
  '/category/immunity': {
    title: 'रोग प्रतिरोधक क्षमता (Immunity Boost & Ojas) - Chotelal Ji Health',
    desc: 'ओजस वृद्धि, गिलोय काढ़ा, च्यवनप्राश और मौसमी बीमारियों से बचाव के सशक्त उपाय।',
  },
  '/category/general': {
    title: 'सामान्य स्वास्थ्य व बुखार (General Health & Vitality) - Chotelal Ji Health',
    desc: 'मौसमी बुखार, कमजोरी, थकान और शरीर की ऊर्जा बहाल करने के लिए आयुर्वेदिक मार्गदर्शन।',
  },
  '/privacy': {
    title: 'गोपनीयता नीति (Privacy Policy) - Chotelal Ji Health',
    desc: 'छोटेलाल जी हेल्थ आपकी व्यक्तिगत जानकारी की सुरक्षा और 100% गोपनीयता सुनिश्चित करता है।',
  },
  '/terms': {
    title: 'नियम और शर्तें (Terms & Conditions) - Chotelal Ji Health',
    desc: 'छोटेलाल जी हेल्थ प्लेटफॉर्म के उपयोग संबंधी आधिकारिक नियम और शर्तें।',
  },
  '/disclaimer': {
    title: 'चिकित्सीय अस्वीकरण (Medical Disclaimer) - Chotelal Ji Health',
    desc: 'महत्वपूर्ण सूचना: छोटेलाल जी हेल्थ एक AI आधारित शैक्षिक मंच है, यह डॉक्टर का विकल्प नहीं है।',
  },
  '/faq': {
    title: 'अक्सर पूछे जाने वाले प्रश्न (FAQ) - Chotelal Ji Health',
    desc: 'छोटेलाल जी, AI डायग्नोसिस, निशुल्क सेवा और स्वास्थ्य सुझावों से जुड़े सभी सामान्य सवाल।',
  },
};

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const navigate = (path: string) => {
    if (typeof window === 'undefined') return;
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update HTML Document Title and Meta Description for SEO
  useEffect(() => {
    const meta = PAGE_TITLES[currentPath] || PAGE_TITLES['/'];
    if (typeof document !== 'undefined') {
      document.title = meta.title;
      let descTag = document.querySelector('meta[name="description"]');
      if (!descTag) {
        descTag = document.createElement('meta');
        descTag.setAttribute('name', 'description');
        document.head.appendChild(descTag);
      }
      descTag.setAttribute('content', meta.desc);
    }
  }, [currentPath]);

  // Compute breadcrumbs
  const buildBreadcrumbs = (path: string) => {
    if (path === '/') return [];
    const crumbs = [{ label: 'Home', path: '/' }];
    const segments = path.split('/').filter(Boolean);

    let accrued = '';
    for (let i = 0; i < segments.length; i++) {
      accrued += `/${segments[i]}`;
      const name = segments[i].replace(/-/g, ' ');
      const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
      crumbs.push({ label: capitalized, path: accrued });
    }
    return crumbs;
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate, breadcrumbs: buildBreadcrumbs(currentPath) }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({
  href,
  className = '',
  activeClassName = '',
  children,
  onClick,
  ...props
}) => {
  const { currentPath, navigate } = useRouter();
  const isActive = currentPath === href;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    // If not middle-click, command-click, etc.
    if (!e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${className} ${isActive ? activeClassName : ''}`}
      {...props}
    >
      {children}
    </a>
  );
};
