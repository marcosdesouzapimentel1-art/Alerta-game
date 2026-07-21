import React, { useState, useEffect } from "react";
import { 
  Home, 
  Tag, 
  Newspaper, 
  Heart, 
  User, 
  Bell, 
  Search, 
  Flame, 
  Sparkles, 
  Share2, 
  SlidersHorizontal, 
  X, 
  ChevronRight, 
  Check, 
  LogOut, 
  Moon, 
  Sun, 
  Smartphone, 
  Play, 
  Mail, 
  Lock, 
  UserPlus, 
  ArrowLeft, 
  AlertCircle, 
  Info,
  Laptop,
  CheckCircle2,
  Gamepad2,
  ChevronDown,
  PlusCircle,
  Send,
  Trash2,
  ShieldAlert,
  Ticket,
  Copy,
  ExternalLink
} from "lucide-react";

// Interfaces mimicking Dart models
export interface GameDeal {
  id: string;
  title: string;
  imageUrl: string;
  originalPrice: number;
  currentPrice: number;
  discountPercent: number;
  platform: "Steam" | "Epic Games" | "PlayStation" | "Xbox" | "Nintendo";
  dealUrl: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  category: "GTA" | "Fortnite" | "EA Sports FC" | "Call of Duty" | "Minecraft" | "PlayStation" | "Xbox" | "Nintendo";
  publishedAt: string;
  sourceName: string;
}

export interface FreeGame {
  id: string;
  title: string;
  imageUrl: string;
  platform: "Epic Games" | "Steam" | "Prime Gaming" | "Outras";
  freeGameUrl: string;
  endDate: string;
}

export interface AffiliateCoupon {
  id: string;
  code: string;
  discount: string;
  storeName: string;
  category: "Jogos" | "Hardware" | "Acessórios" | "Consoles" | "Outros";
  description: string;
  affiliateUrl: string;
  expiresAt: string;
  isVerified: boolean;
}

const INITIAL_COUPONS: AffiliateCoupon[] = [
  {
    id: "c1",
    code: "ALERTAGAMER10",
    discount: "10% OFF",
    storeName: "Nuuvem",
    category: "Jogos",
    description: "Válido em todos os lançamentos para PC e chaves ativáveis na Steam/Epic Games.",
    affiliateUrl: "https://www.nuuvem.com",
    expiresAt: "Expira em 31/12/2026",
    isVerified: true
  },
  {
    id: "c2",
    code: "HARDWAREGA20",
    discount: "20% OFF",
    storeName: "Kabum",
    category: "Hardware",
    description: "Cupom exclusivo de afiliado para mouses, teclados mecânicos e headsets gamer selecionados.",
    affiliateUrl: "https://www.kabum.com.br",
    expiresAt: "Expira em 15/08/2026",
    isVerified: true
  },
  {
    id: "c3",
    code: "GAMESPITCH5",
    discount: "5% OFF",
    storeName: "Pichau",
    category: "Consoles",
    description: "Aplicável na compra de consoles (PlayStation 5 e Xbox Series X/S) e PCs prontos.",
    affiliateUrl: "https://www.pichau.com.br",
    expiresAt: "Expira em 30/09/2026",
    isVerified: true
  },
  {
    id: "c4",
    code: "GEARBESTGA",
    discount: "15% OFF",
    storeName: "Aliexpress",
    category: "Acessórios",
    description: "Cupom especial para controles Bluetooth e adaptadores na loja oficial de acessórios gamer.",
    affiliateUrl: "https://aliexpress.com",
    expiresAt: "Expira em 31/10/2026",
    isVerified: true
  },
  {
    id: "c5",
    code: "GREENMAN8",
    discount: "8% OFF",
    storeName: "Green Man Gaming",
    category: "Jogos",
    description: "Cupom adicional cumulativo sobre jogos em promoção na loja Green Man Gaming.",
    affiliateUrl: "https://www.greenmangaming.com",
    expiresAt: "Expira em 31/12/2026",
    isVerified: true
  }
];

// Simulated Database
const INITIAL_DEALS: GameDeal[] = [
  {
    id: "d1",
    title: "Elden Ring",
    imageUrl: "https://images.unsplash.com/photo-1655821888788-6107699e173b?auto=format&fit=crop&w=600&q=80",
    originalPrice: 249.90,
    currentPrice: 149.94,
    discountPercent: 40,
    platform: "Steam",
    dealUrl: "https://store.steampowered.com/app/1245620/ELDEN_RING/"
  },
  {
    id: "d2",
    title: "Marvel's Spider-Man 2",
    imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
    originalPrice: 349.90,
    currentPrice: 209.94,
    discountPercent: 40,
    platform: "PlayStation",
    dealUrl: "https://store.playstation.com"
  },
  {
    id: "d3",
    title: "Forza Horizon 5",
    imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=600&q=80",
    originalPrice: 249.00,
    currentPrice: 99.60,
    discountPercent: 60,
    platform: "Xbox",
    dealUrl: "https://www.xbox.com"
  },
  {
    id: "d4",
    title: "Zelda: Tears of the Kingdom",
    imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    originalPrice: 357.00,
    currentPrice: 249.90,
    discountPercent: 30,
    platform: "Nintendo",
    dealUrl: "https://www.nintendo.com"
  },
  {
    id: "d5",
    title: "Hades II",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
    originalPrice: 89.99,
    currentPrice: 71.99,
    discountPercent: 20,
    platform: "Epic Games",
    dealUrl: "https://store.epicgames.com"
  },
  {
    id: "d6",
    title: "Cyberpunk 2077 Ultimate Edition",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
    originalPrice: 199.90,
    currentPrice: 99.95,
    discountPercent: 50,
    platform: "Steam",
    dealUrl: "https://store.steampowered.com"
  },
  {
    id: "d7",
    title: "Red Dead Redemption 2",
    imageUrl: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=600&q=80",
    originalPrice: 299.00,
    currentPrice: 89.70,
    discountPercent: 70,
    platform: "Steam",
    dealUrl: "https://store.steampowered.com"
  },
  {
    id: "d8",
    title: "Resident Evil 4 Remake",
    imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80",
    originalPrice: 249.00,
    currentPrice: 124.50,
    discountPercent: 50,
    platform: "PlayStation",
    dealUrl: "https://store.playstation.com"
  }
];

const INITIAL_NEWS: NewsArticle[] = [
  {
    id: "n1",
    title: "GTA VI recebe novas imagens oficiais espetaculares",
    summary: "Rockstar divulga novas capturas de tela mostrando Vice City em resolução ultra-alta com incríveis reflexos em ray-tracing.",
    content: "A Rockstar Games surpreendeu os fãs hoje ao atualizar sua Newswire oficial com novas capturas de tela deslumbrantes de Grand Theft Auto VI. As imagens destacam a incrível fidelidade visual da engine RAGE atualizada, com foco em efeitos de ray-tracing de reflexos na água de Vice Beach e na iluminação neon vibrante de Vice City durante a noite. Especialistas afirmam que o nível de detalhes dos personagens principais, Lucia e Jason, estabelece um novo padrão para a indústria de jogos.",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
    category: "GTA",
    publishedAt: "Hoje, 14:30",
    sourceName: "Rockstar Newswire"
  },
  {
    id: "n2",
    title: "Fortnite anuncia evento crossover massivo de anime clássico",
    summary: "Parceria inédita trará trajes lendários, itens míticos no mapa e um evento especial por tempo limitado já na próxima terça-feira.",
    content: "A Epic Games confirmou oficialmente os rumores de uma nova e gigante colaboração para Fortnite. Desta vez, o popular battle royale receberá conteúdos baseados em um anime clássico aclamado mundialmente. Os jogadores podem esperar cosméticos altamente detalhados na Loja de Itens, além de habilidades especiais espalhadas no mapa de jogo durante as partidas, incluindo uma arma mítica que promete chacoalhar o meta competitivo.",
    imageUrl: "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?auto=format&fit=crop&w=600&q=80",
    category: "Fortnite",
    publishedAt: "Ontem, 18:15",
    sourceName: "Epic Games Blog"
  },
  {
    id: "n3",
    title: "EA Sports FC revela novo modo Carreira Cooperativa Online",
    summary: "Desenvolvedores detalham melhorias de física HyperMotion e a possibilidade de comandar clubes simultaneamente com amigos.",
    content: "Em uma apresentação detalhada para a imprensa, a EA Sports compartilhou as principais novidades de jogabilidade para a franquia de futebol. A maior inovação é o aguardado modo Carreira Co-op Online, permitindo que dois jogadores controlem o mesmo clube, gerenciem transferências, táticas e joguem as partidas cooperativamente em consoles diferentes. A física de colisões também foi retrabalhada com dados de captura realistas.",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80",
    category: "EA Sports FC",
    publishedAt: "Ontem, 10:00",
    sourceName: "EA Sports Official"
  },
  {
    id: "n4",
    title: "Call of Duty revela mapa clássico Zumbis reimaginado",
    summary: "Um dos mapas mais icônicos do modo cooperativo receberá uma versão completamente reconstruída na próxima grande atualização.",
    content: "Fãs do modo cooperativo de sobrevivência contra mortos-vivos têm motivos para comemorar. A Activision divulgou um trailer cinematográfico detalhando a recriação completa de um dos mapas mais queridos da franquia CoD. O cenário foi reconstruído do zero, com novos segredos (easter eggs), armas especiais exclusivas e uma atmosfera muito mais sombria e imersiva para desafiar equipes de até quatro jogadores.",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80",
    category: "Call of Duty",
    publishedAt: "18 Jul 2026",
    sourceName: "Call of Duty Intel"
  },
  {
    id: "n5",
    title: "Minecraft 1.22 trará biomas subterrâneos inéditos e criaturas místicas",
    summary: "A Mojang Studios revelou os primeiros conceitos artísticos da próxima grande atualização gratuita focada em exploração profunda.",
    content: "Durante um evento virtual, os desenvolvedores de Minecraft apresentaram os pilares da atualização 1.22. O foco principal será a revitalização das cavernas profundas, introduzindo novos biomas de vegetação luminosa subterrânea e uma espécie inédita de guardião místico que protege depósitos de minérios raros. A Mojang promete também novos blocos de decoração decorativos.",
    imageUrl: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=600&q=80",
    category: "Minecraft",
    publishedAt: "17 Jul 2026",
    sourceName: "Mojang News"
  },
  {
    id: "n6",
    title: "Preço e data oficial de lançamento do PS5 Pro revelados",
    summary: "Sony confirma detalhes de hardware, melhorias de Ray Tracing avançado e preço recomendado do novo console de alto desempenho.",
    content: "Em uma publicação detalhada no PlayStation Blog, a Sony revelou todos os detalhes comerciais e de especificações técnicas do PlayStation 5 Pro. O console focado em alto desempenho contará com uma GPU aprimorada com upscaling por inteligência artificial (PSSR), oferecendo taxas de quadros extremamente fluidas sem sacrificar a fidelidade gráfica nativa. O lançamento global está agendado para o final deste ano.",
    imageUrl: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=600&q=80",
    category: "PlayStation",
    publishedAt: "16 Jul 2026",
    sourceName: "PlayStation Blog"
  },
  {
    id: "n7",
    title: "Xbox Game Pass anuncia adição de 4 grandes títulos Day One",
    summary: "Assinantes do serviço receberão títulos aguardados diretamente no catálogo no dia do lançamento oficial em agosto.",
    content: "A Microsoft divulgou a lista de novos jogos que reforçarão o catálogo do Xbox Game Pass. A grande surpresa foi a confirmação de quatro blockbusters muito aguardados que estarão disponíveis no serviço no exato dia de seus lançamentos globais. O anúncio reforça o compromisso da marca em entregar valor incomparável aos seus assinantes em consoles, PC e Cloud Gaming.",
    imageUrl: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=600&q=80",
    category: "Xbox",
    publishedAt: "15 Jul 2026",
    sourceName: "Xbox Wire"
  },
  {
    id: "n8",
    title: "Vazamento revela codinome do sucessor do Nintendo Switch",
    summary: "Fontes confiáveis da indústria de hardware apontam suporte nativo a Ray Reconstruction e DLSS da NVIDIA no próximo portátil.",
    content: "Rumores sobre o sucessor do console híbrido da Nintendo ganharam força hoje com um vazamento detalhado da cadeia de suprimentos de chips. O projeto, apelidado internamente por um codinome secreto, utilizará uma nova arquitetura personalizada da NVIDIA, com suporte a tecnologias de Deep Learning Super Sampling (DLSS) e Ray Reconstruction, garantindo que o aparelho reproduza jogos modernos com excelente desempenho em TVs 4K.",
    imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    category: "Nintendo",
    publishedAt: "14 Jul 2026",
    sourceName: "Nintendo Insider"
  }
];

const INITIAL_FREE_GAMES: FreeGame[] = [
  {
    id: "f1",
    title: "F.I.S.T.: Forged In Shadow Torch",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
    platform: "Epic Games",
    freeGameUrl: "https://store.epicgames.com",
    endDate: "Grátis até 27 de Julho"
  },
  {
    id: "f2",
    title: "The Witcher 2: Assassins of Kings",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
    platform: "Steam",
    freeGameUrl: "https://store.steampowered.com",
    endDate: "Fim de semana gratuito"
  },
  {
    id: "f3",
    title: "Chivalry 2",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80",
    platform: "Prime Gaming",
    freeGameUrl: "https://gaming.amazon.com",
    endDate: "Resgate até 31 de Julho"
  }
];

interface NotificationAlert {
  id: string;
  title: string;
  body: string;
  time: string;
  type: "deal" | "free_game" | "news";
  read: boolean;
}

export default function GamerAlertaApp() {
  // App States
  const [currentScreen, setCurrentScreen] = useState<"splash" | "login" | "register" | "forgot" | "main">("splash");
  const [activeTab, setActiveTab] = useState<"home" | "deals" | "news" | "coupons" | "favorites" | "profile">("home");
  
  // Coupons states
  const [coupons, setCoupons] = useState<AffiliateCoupon[]>(INITIAL_COUPONS);
  const [couponSearchQuery, setCouponSearchQuery] = useState("");
  const [couponCategoryFilter, setCouponCategoryFilter] = useState<string>("Tudo");
  const [copiedCouponId, setCopiedCouponId] = useState<string | null>(null);

  // Beta feedback states
  const [betaFeedbackText, setBetaFeedbackText] = useState("");
  const [betaFeedbackType, setBetaFeedbackType] = useState("Sugestão");
  const [showFeedbackSuccess, setShowFeedbackSuccess] = useState(false);

  // Admin Coupon form states
  const [adminCouponCode, setAdminCouponCode] = useState("");
  const [adminCouponDiscount, setAdminCouponDiscount] = useState("");
  const [adminCouponStore, setAdminCouponStore] = useState("");
  const [adminCouponCategory, setAdminCouponCategory] = useState<"Jogos" | "Hardware" | "Acessórios" | "Consoles" | "Outros">("Jogos");
  const [adminCouponDesc, setAdminCouponDesc] = useState("");
  const [adminCouponUrl, setAdminCouponUrl] = useState("");
  
  // Auth simulation
  const [user, setUser] = useState<{ name: string; email: string; avatar: string; role?: "admin" | "member" } | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [loginError, setLoginError] = useState("");
  
  // App Data & Interaction states
  const [deals, setDeals] = useState<GameDeal[]>(INITIAL_DEALS);
  const [news, setNews] = useState<NewsArticle[]>(INITIAL_NEWS);
  const [freeGames, setFreeGames] = useState<FreeGame[]>(INITIAL_FREE_GAMES);
  const [favorites, setFavorites] = useState<{ deals: string[]; news: string[] }>({
    deals: ["d1", "d3"],
    news: ["n1"]
  });

  // Admin Panel states
  const [adminSubTab, setAdminSubTab] = useState<"promo" | "news" | "push" | "coupons">("promo");
  const [adminPromoTitle, setAdminPromoTitle] = useState("");
  const [adminPromoPlatform, setAdminPromoPlatform] = useState<"Steam" | "Epic Games" | "PlayStation" | "Xbox" | "Nintendo">("Steam");
  const [adminPromoDiscount, setAdminPromoDiscount] = useState("");
  const [adminPromoOrigPrice, setAdminPromoOrigPrice] = useState("");
  const [adminPromoCurrPrice, setAdminPromoCurrPrice] = useState("");
  const [adminPromoImgUrl, setAdminPromoImgUrl] = useState("");
  
  const [adminNewsTitle, setAdminNewsTitle] = useState("");
  const [adminNewsCategory, setAdminNewsCategory] = useState<"GTA" | "Fortnite" | "EA Sports FC" | "Call of Duty" | "Minecraft" | "PlayStation" | "Xbox" | "Nintendo">("GTA");
  const [adminNewsSource, setAdminNewsSource] = useState("");
  const [adminNewsSummary, setAdminNewsSummary] = useState("");
  const [adminNewsContent, setAdminNewsContent] = useState("");
  
  const [adminPushTitle, setAdminPushTitle] = useState("");
  const [adminPushBody, setAdminPushBody] = useState("");

  // Pre-fill user actual email to make admin login effortless
  useEffect(() => {
    setEmailInput("marcosdesouzapimentel1@gmail.com");
    setPasswordInput("123456");
  }, []);
  
  // Custom price alerts
  const [priceAlerts, setPriceAlerts] = useState<{ id: string; title: string; targetPrice: number; platform: string }[]>([
    { id: "a1", title: "Elden Ring", targetPrice: 120.00, platform: "Steam" }
  ]);
  
  // Filters
  const [dealPlatformFilter, setDealPlatformFilter] = useState<string>("Tudo");
  const [dealMaxPrice, setDealMaxPrice] = useState<number>(400);
  const [newsCategoryFilter, setNewsCategoryFilter] = useState<string>("Tudo");
  const [searchQuery, setSearchQuery] = useState("");

  // PWA installation states
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check standalone display mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallBtn(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    setDeferredPrompt(null);
    setShowInstallBtn(false);
  };
  
  // Notification center
  const [notifications, setNotifications] = useState<NotificationAlert[]>([
    {
      id: "1",
      title: "🔥 JOGO GRÁTIS DISPONÍVEL!",
      body: "F.I.S.T.: Forged In Shadow Torch está 100% grátis para resgatar na Epic Games Store!",
      time: "Agora mesmo",
      type: "free_game",
      read: false
    },
    {
      id: "2",
      title: "💥 Elden Ring com 40% OFF!",
      body: "O RPG do ano entrou em promoção histórica na Steam. Clique para ver a oferta!",
      time: "Há 1 hora",
      type: "deal",
      read: false
    },
    {
      id: "3",
      title: "📰 GTA VI: Imagens inéditas",
      body: "Rockstar acaba de lançar um novo pacote de screenshots de GTA 6.",
      time: "Há 3 horas",
      type: "news",
      read: true
    }
  ]);
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeAlertModal, setActiveAlertModal] = useState<GameDeal | null>(null);
  const [customAlertPrice, setCustomAlertPrice] = useState("");
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  
  // App settings
  const [appTheme, setAppTheme] = useState<"dark" | "light">("dark");
  const [notificationPreferences, setNotificationPreferences] = useState({
    promotions: true,
    freeGames: true,
    news: true
  });
  
  // Interactive push notification banner
  const [pushBanner, setPushBanner] = useState<{ title: string; body: string } | null>(null);

  // Splash Screen Delay
  useEffect(() => {
    if (currentScreen === "splash") {
      const timer = setTimeout(() => {
        // Automatically enter as guest/visitante so they are not forced to login/register!
        setUser({
          name: "Visitante",
          email: "visitante@gameralerta.com.br",
          avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=visitante",
          role: "member"
        });
        setNameInput("Visitante");
        setCurrentScreen("main");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // Simulate incoming FCM Notification
  const triggerFCMTest = () => {
    const alertsList = [
      {
        title: "⚡ ALERTA DE PREÇO: Cyberpunk 2077!",
        body: "Cyberpunk 2077 atingiu seu preço-alvo de R$ 99,95 na Steam!",
        type: "deal" as const
      },
      {
        title: "🎁 NOVO JOGO GRÁTIS NA STEAM!",
        body: "The Witcher 2 está disponível para jogar gratuitamente este fim de semana!",
        type: "free_game" as const
      },
      {
        title: "📣 NOTÍCIA BOMBÁSTICA: PS5 Pro!",
        body: "Preço oficial do PS5 Pro no Brasil acaba de ser anunciado. Confira já!",
        type: "news" as const
      }
    ];
    
    const randomAlert = alertsList[Math.floor(Math.random() * alertsList.length)];
    
    // Add to notification list
    const newNotif: NotificationAlert = {
      id: Date.now().toString(),
      title: randomAlert.title,
      body: randomAlert.body,
      time: "Agora",
      type: randomAlert.type,
      read: false
    };
    
    setNotifications(prev => [newNotif, ...prev]);
    
    // Show active push notification banner at the top of the phone screen
    setPushBanner({ title: randomAlert.title, body: randomAlert.body });
    
    // Play subtle audio indicator if possible
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioContext.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioContext.currentTime + 0.1); // A5
      gain.gain.setValueAtTime(0.1, audioContext.currentTime);
      osc.start();
      osc.stop(audioContext.currentTime + 0.25);
    } catch (e) {
      // AudioContext blocked or unsupported
    }

    setTimeout(() => {
      setPushBanner(null);
    }, 4500);
  };

  // Auth Operations
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    if (!emailInput.includes("@")) {
      setLoginError("Por favor, insira um e-mail válido.");
      return;
    }
    if (passwordInput.length < 6) {
      setLoginError("A senha deve possuir no mínimo 6 caracteres.");
      return;
    }
    
    // Success simulation
    const emailLower = emailInput.toLowerCase();
    const isAdmin = emailLower === "marcosdesouzapimentel1@gmail.com";
    const name = emailInput.split("@")[0];
    const formattedName = isAdmin ? "Marcos (Admin)" : (name.charAt(0).toUpperCase() + name.slice(1));
    
    setUser({
      name: formattedName,
      email: emailInput,
      avatar: isAdmin 
        ? "https://api.dicebear.com/7.x/pixel-art/svg?seed=marcos-admin"
        : `https://api.dicebear.com/7.x/pixel-art/svg?seed=${name}`,
      role: isAdmin ? "admin" : "member"
    });
    setNameInput(formattedName);
    setCurrentScreen("main");
    setActiveTab("home");
  };

  const handleGoogleLogin = () => {
    // Automatically logs you in as the Admin!
    setUser({
      name: "Marcos (Admin)",
      email: "marcosdesouzapimentel1@gmail.com",
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=marcos-admin",
      role: "admin"
    });
    setNameInput("Marcos (Admin)");
    setCurrentScreen("main");
    setActiveTab("home");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      setLoginError("Digite seu nome completo.");
      return;
    }
    if (!emailInput.includes("@")) {
      setLoginError("Por favor, insira um e-mail válido.");
      return;
    }
    if (passwordInput.length < 6) {
      setLoginError("A senha deve possuir no mínimo 6 caracteres.");
      return;
    }
    
    const emailLower = emailInput.toLowerCase();
    const isAdmin = emailLower === "marcosdesouzapimentel1@gmail.com";
    
    setUser({
      name: isAdmin ? "Marcos (Admin)" : nameInput,
      email: emailInput,
      avatar: isAdmin 
        ? "https://api.dicebear.com/7.x/pixel-art/svg?seed=marcos-admin"
        : `https://api.dicebear.com/7.x/pixel-art/svg?seed=${nameInput}`,
      role: isAdmin ? "admin" : "member"
    });
    if (isAdmin) setNameInput("Marcos (Admin)");
    setCurrentScreen("main");
    setActiveTab("home");
  };

  const handleLogout = () => {
    setUser(null);
    setEmailInput("");
    setPasswordInput("");
    setCurrentScreen("login");
  };

  // Admin Specific Actions
  const handleAdminAddPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const orig = parseFloat(adminPromoOrigPrice);
    const curr = parseFloat(adminPromoCurrPrice);
    const disc = parseInt(adminPromoDiscount);
    
    if (isNaN(orig) || isNaN(curr) || isNaN(disc)) {
      alert("Por favor, preencha valores numéricos válidos.");
      return;
    }
    
    const newPromo: GameDeal = {
      id: "admin-d-" + Date.now().toString(),
      title: adminPromoTitle,
      imageUrl: adminPromoImgUrl.trim() || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
      originalPrice: orig,
      currentPrice: curr,
      discountPercent: disc,
      platform: adminPromoPlatform,
      dealUrl: "https://store.steampowered.com"
    };
    
    setDeals(prev => [newPromo, ...prev]);
    
    // Reset form
    setAdminPromoTitle("");
    setAdminPromoDiscount("");
    setAdminPromoOrigPrice("");
    setAdminPromoCurrPrice("");
    setAdminPromoImgUrl("");
    
    // Simulate push alert
    setPushBanner({
      title: "🔥 NOVA PROMOÇÃO ADICIONADA!",
      body: `${newPromo.title} está com -${disc}% de desconto na ${newPromo.platform}!`
    });
    setNotifications(prev => [{
      id: Date.now().toString(),
      title: "🔥 NOVA PROMOÇÃO ADICIONADA!",
      body: `${newPromo.title} está com -${disc}% de desconto na ${newPromo.platform}!`,
      time: "Agora",
      type: "deal",
      read: false
    }, ...prev]);
    
    setTimeout(() => setPushBanner(null), 4500);
  };

  const handleAdminAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newArticle: NewsArticle = {
      id: "admin-n-" + Date.now().toString(),
      title: adminNewsTitle,
      summary: adminNewsSummary,
      content: adminNewsContent,
      imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80",
      category: adminNewsCategory,
      publishedAt: "Agora mesmo",
      sourceName: adminNewsSource || "Gamer Alerta"
    };
    
    setNews(prev => [newArticle, ...prev]);
    
    // Reset form
    setAdminNewsTitle("");
    setAdminNewsSource("");
    setAdminNewsSummary("");
    setAdminNewsContent("");
    
    // Simulate push alert
    setPushBanner({
      title: "📰 NOTÍCIA URGENTE PUBLICADA!",
      body: newArticle.title
    });
    setNotifications(prev => [{
      id: Date.now().toString(),
      title: "📰 NOTÍCIA URGENTE PUBLICADA!",
      body: newArticle.title,
      time: "Agora",
      type: "news",
      read: false
    }, ...prev]);
    
    setTimeout(() => setPushBanner(null), 4500);
  };

  const handleAdminBroadcastPush = (e: React.FormEvent) => {
    e.preventDefault();
    
    setPushBanner({
      title: adminPushTitle,
      body: adminPushBody
    });
    setNotifications(prev => [{
      id: Date.now().toString(),
      title: adminPushTitle,
      body: adminPushBody,
      time: "Agora",
      type: "news",
      read: false
    }, ...prev]);
    
    // Reset form
    setAdminPushTitle("");
    setAdminPushBody("");
    
    setTimeout(() => setPushBanner(null), 4500);
  };

  // Coupon actions
  const handleCopyCoupon = (couponId: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCouponId(couponId);
    setTimeout(() => {
      setCopiedCouponId(null);
    }, 2000);
  };

  const handleAdminAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminCouponCode.trim() || !adminCouponDiscount.trim() || !adminCouponStore.trim()) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const newCoupon: AffiliateCoupon = {
      id: "admin-c-" + Date.now().toString(),
      code: adminCouponCode.trim().toUpperCase(),
      discount: adminCouponDiscount.trim(),
      storeName: adminCouponStore.trim(),
      category: adminCouponCategory,
      description: adminCouponDesc.trim() || "Cupom de desconto especial para afiliados do Gamer Alerta.",
      affiliateUrl: adminCouponUrl.trim() || "https://www.nuuvem.com",
      expiresAt: "Expira em 31/12/2026",
      isVerified: true
    };

    setCoupons(prev => [newCoupon, ...prev]);

    // Reset Form
    setAdminCouponCode("");
    setAdminCouponDiscount("");
    setAdminCouponStore("");
    setAdminCouponCategory("Jogos");
    setAdminCouponDesc("");
    setAdminCouponUrl("");

    // Notify
    setPushBanner({
      title: "🎟️ NOVO CUPOM ADICIONADO!",
      body: `Cupom ${newCoupon.code} para ${newCoupon.storeName} adicionado pelo Admin!`
    });
    setNotifications(prev => [{
      id: Date.now().toString(),
      title: "🎟️ NOVO CUPOM ADICIONADO!",
      body: `Use o cupom ${newCoupon.code} e ganhe ${newCoupon.discount} na ${newCoupon.storeName}!`,
      time: "Agora",
      type: "deal",
      read: false
    }, ...prev]);

    setTimeout(() => setPushBanner(null), 4500);
  };

  // Favorites logic
  const toggleFavoriteDeal = (dealId: string) => {
    setFavorites(prev => {
      const deals = prev.deals.includes(dealId)
        ? prev.deals.filter(id => id !== dealId)
        : [...prev.deals, dealId];
      return { ...prev, deals };
    });
  };

  const toggleFavoriteNews = (newsId: string) => {
    setFavorites(prev => {
      const news = prev.news.includes(newsId)
        ? prev.news.filter(id => id !== newsId)
        : [...prev.news, newsId];
      return { ...prev, news };
    });
  };

  // Custom alert logic
  const handleSavePriceAlert = () => {
    if (!activeAlertModal) return;
    const target = parseFloat(customAlertPrice);
    if (isNaN(target) || target <= 0) {
      alert("Por favor, digite um preço válido.");
      return;
    }
    
    const newAlert = {
      id: Date.now().toString(),
      title: activeAlertModal.title,
      targetPrice: target,
      platform: activeAlertModal.platform
    };
    
    setPriceAlerts(prev => [...prev, newAlert]);
    setActiveAlertModal(null);
    setCustomAlertPrice("");
    
    // Trigger successful banner
    setPushBanner({
      title: "🔔 Alerta de Preço Criado!",
      body: `Você será notificado quando ${newAlert.title} chegar a R$ ${target.toFixed(2)}.`
    });
    setTimeout(() => setPushBanner(null), 4000);
  };

  // Unread count
  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className={`w-full overflow-hidden rounded-2xl border ${appTheme === "dark" ? "border-slate-800 bg-[#0B0E14] text-slate-200" : "border-slate-200 bg-slate-50 text-slate-800"} shadow-2xl relative flex flex-col`} style={{ height: "740px" }} id="gamer-alerta-smartphone">
      
      {/* FCM Simulated Push Notification Banner */}
      {pushBanner && (
        <div className="absolute top-3 left-3 right-3 bg-[#151921]/95 backdrop-blur-md border-l-4 border-[#F97316] text-white p-3 rounded-xl shadow-2xl z-50 flex items-start gap-2.5 animate-bounce">
          <div className="bg-[#2563EB]/20 p-1.5 rounded-lg text-[#2563EB]">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-xs text-slate-100 truncate">{pushBanner.title}</p>
            <p className="text-[10px] text-slate-300 leading-tight mt-0.5">{pushBanner.body}</p>
          </div>
          <button onClick={() => setPushBanner(null)} className="text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ----------------- SCREEN: SPLASH SCREEN ----------------- */}
      {currentScreen === "splash" && (
        <div className="flex-1 bg-[#0B0E14] flex flex-col items-center justify-center relative px-6 z-40 select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2563EB]/10 to-transparent opacity-40"></div>
          
          {/* Pulsing Animated Gamepad Logo */}
          <div className="relative mb-6">
            <div className="absolute -inset-4 bg-[#2563EB]/20 rounded-full blur-xl animate-pulse"></div>
            <div className="w-24 h-24 rounded-full border-4 border-[#F97316] bg-[#151921] flex items-center justify-center shadow-lg relative z-10 animate-spin-slow">
              <Gamepad2 className="w-12 h-12 text-[#2563EB]" />
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white font-display uppercase">
            Gamer<span className="text-[#F97316]">Alerta</span>
          </h1>
          <p className="text-slate-400 text-xs mt-2 tracking-widest uppercase">
            Promoções & Notícias
          </p>

          <div className="absolute bottom-16 flex flex-col items-center gap-1">
            <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#F97316] animate-progress" style={{ width: "100%" }}></div>
            </div>
            <span className="text-[10px] text-slate-500 mt-1">Carregando Firebase...</span>
            <span className="text-[9px] text-[#F97316] font-bold uppercase tracking-wider">Versão Beta 1.0.0</span>
          </div>
        </div>
      )}

      {/* ----------------- SCREEN: LOGIN / SIGN UP / FORGOT PASSWORD ----------------- */}
      {(currentScreen === "login" || currentScreen === "register" || currentScreen === "forgot") && (
        <div className={`flex-1 flex flex-col p-6 overflow-y-auto ${appTheme === "dark" ? "bg-[#0B0E14]" : "bg-slate-100"}`}>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-1">
              <span className="font-bold text-xl tracking-tight font-display uppercase text-[#2563EB]">
                Gamer<span className="text-[#F97316]">Alerta</span>
              </span>
            </div>
            {/* Quick Demo Skip */}
            <button 
              onClick={() => {
                setUser({ name: "Visitante", email: "guest@gamer.com", avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=guest" });
                setCurrentScreen("main");
                setActiveTab("home");
              }}
              className="text-[10px] px-2.5 py-1 rounded-full bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20 font-bold hover:bg-[#F97316]/20"
            >
              Pular Login
            </button>
          </div>

          {loginError && (
            <div className="mt-4 bg-red-500/10 border border-red-500/30 text-red-500 p-2.5 rounded-lg text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {currentScreen === "login" && (
            <form onSubmit={handleLogin} className="flex-1 flex flex-col justify-center my-auto py-4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold font-display">Bem-vindo de volta!</h2>
                <p className={`text-xs mt-1 ${appTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                  Monitore suas ofertas favoritas e receba alertas instantâneos.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-slate-400">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="seu.email@exemplo.com" 
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className={`w-full pl-9 pr-4 py-2.5 rounded-lg text-xs outline-none border transition-all ${appTheme === "dark" ? "bg-[#1E232E] border-slate-800 text-slate-100 focus:border-[#2563EB]" : "bg-white border-slate-300 text-slate-900 focus:border-[#2563EB]"}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-slate-400">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className={`w-full pl-9 pr-4 py-2.5 rounded-lg text-xs outline-none border transition-all ${appTheme === "dark" ? "bg-[#1E232E] border-slate-800 text-slate-100 focus:border-[#2563EB]" : "bg-white border-slate-300 text-slate-900 focus:border-[#2563EB]"}`}
                    />
                  </div>
                </div>
              </div>

              <div className="text-right mt-2">
                <button 
                  type="button" 
                  onClick={() => { setLoginError(""); setCurrentScreen("forgot"); }}
                  className="text-xs font-medium text-[#F97316] hover:underline cursor-pointer"
                >
                  Esqueceu a senha?
                </button>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-3 rounded-lg text-xs font-bold mt-6 shadow-md transition-all active:scale-98 cursor-pointer"
              >
                Entrar
              </button>

              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="flex-shrink mx-3 text-slate-500 text-[10px] uppercase font-bold">Ou entre com</span>
                <div className="flex-grow border-t border-slate-800"></div>
              </div>

              {/* Google login mock */}
              <button 
                type="button"
                onClick={handleGoogleLogin}
                className={`w-full border py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all hover:bg-brand-blue/5 ${appTheme === "dark" ? "border-slate-800 text-slate-200" : "border-slate-300 text-slate-700"}`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.111 4.114a5.617 5.617 0 0 1-5.618-5.617 5.617 5.617 0 0 1 5.618-5.617c1.378 0 2.637.5 3.614 1.323l3.05-3.05a9.543 9.543 0 0 0-6.664-2.593c-5.32 0-9.619 4.3-9.619 9.619s4.3 9.619 9.619 9.619c5.006 0 9.112-3.623 9.112-9.112a9.1 9.1 0 0 0-.173-1.803H12.24z"/>
                </svg>
                Google
              </button>

              <div className="text-center mt-6 text-xs text-slate-400">
                Não tem uma conta?{" "}
                <button 
                  type="button" 
                  onClick={() => { setLoginError(""); setCurrentScreen("register"); }}
                  className="text-[#F97316] font-bold hover:underline cursor-pointer"
                >
                  Cadastre-se
                </button>
              </div>
            </form>
          )}

          {currentScreen === "register" && (
            <form onSubmit={handleRegister} className="flex-1 flex flex-col justify-center my-auto py-4">
              <div className="mb-6">
                <button 
                  type="button" 
                  onClick={() => setCurrentScreen("login")}
                  className="flex items-center gap-1 text-slate-400 text-xs hover:text-slate-200 mb-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Voltar
                </button>
                <h2 className="text-2xl font-bold font-display">Criar uma conta</h2>
                <p className={`text-xs mt-1 ${appTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                  Faça parte do Gamer Alerta de forma 100% gratuita!
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-slate-400">Nome de Usuário</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Ex: PedroGamer" 
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className={`w-full pl-9 pr-4 py-2.5 rounded-lg text-xs outline-none border transition-all ${appTheme === "dark" ? "bg-[#1E232E] border-slate-800 text-slate-100 focus:border-[#2563EB]" : "bg-white border-slate-300 text-slate-900 focus:border-[#2563EB]"}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-slate-400">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="seu.email@exemplo.com" 
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className={`w-full pl-9 pr-4 py-2.5 rounded-lg text-xs outline-none border transition-all ${appTheme === "dark" ? "bg-[#1E232E] border-slate-800 text-slate-100 focus:border-[#2563EB]" : "bg-white border-slate-300 text-slate-900 focus:border-[#2563EB]"}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-slate-400">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input 
                      type="password" 
                      placeholder="Mínimo 6 caracteres" 
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      className={`w-full pl-9 pr-4 py-2.5 rounded-lg text-xs outline-none border transition-all ${appTheme === "dark" ? "bg-[#1E232E] border-slate-800 text-slate-100 focus:border-[#2563EB]" : "bg-white border-slate-300 text-slate-900 focus:border-[#2563EB]"}`}
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white py-3 rounded-lg text-xs font-bold mt-6 shadow-md transition-all active:scale-98 cursor-pointer"
              >
                Cadastrar Conta
              </button>

              <div className="text-center mt-6 text-xs text-slate-400">
                Já possui registro?{" "}
                <button 
                  type="button" 
                  onClick={() => { setLoginError(""); setCurrentScreen("login"); }}
                  className="text-[#2563EB] font-bold hover:underline cursor-pointer"
                >
                  Entrar
                </button>
              </div>
            </form>
          )}

          {currentScreen === "forgot" && (
            <div className="flex-1 flex flex-col justify-center my-auto py-4">
              <button 
                type="button" 
                onClick={() => setCurrentScreen("login")}
                className="flex items-center gap-1 text-slate-400 text-xs hover:text-slate-200 mb-4"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Login
              </button>
              <div className="mb-6">
                <h2 className="text-2xl font-bold font-display">Recuperar senha</h2>
                <p className={`text-xs mt-1 ${appTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                  Insira o seu e-mail cadastrado e enviaremos um link de recuperação.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-slate-400">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="seu.email@exemplo.com" 
                      className={`w-full pl-9 pr-4 py-2.5 rounded-lg text-xs outline-none border transition-all ${appTheme === "dark" ? "bg-slate-900 border-slate-800 text-slate-100" : "bg-white border-slate-300 text-slate-900"}`}
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setLoginError("");
                  setPushBanner({ title: "Recuperação de Senha", body: "Link de redefinição enviado com sucesso para o e-mail!" });
                  setCurrentScreen("login");
                }}
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-3 rounded-lg text-xs font-bold shadow-md cursor-pointer"
              >
                Enviar Link
              </button>
            </div>
          )}
        </div>
      )}

      {/* ----------------- SCREEN: MAIN BOTTOM-NAV SHELL ----------------- */}
      {currentScreen === "main" && (
        <div className="flex-1 flex flex-col min-h-0 relative select-none">
          
          {/* Main App Header */}
          <div className={`px-4 py-3.5 flex justify-between items-center border-b ${appTheme === "dark" ? "bg-[#151921] border-slate-800" : "bg-white border-slate-200"} shrink-0 z-20 shadow-sm`}>
            <div className="flex items-center gap-2">
               <div className="w-7 h-7 rounded-lg bg-[#F97316] flex items-center justify-center">
                 <Gamepad2 className="w-4 h-4 text-white" />
               </div>
               <span className="font-bold text-sm tracking-tight font-display uppercase flex items-center gap-1.5">
                 Gamer<span className="text-[#F97316]">Alerta</span>
                 <span className="bg-amber-500/15 border border-amber-500/30 text-amber-500 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">Beta</span>
               </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Trigger Notification FCM simulator button */}
              <button 
                onClick={triggerFCMTest}
                title="Simular Notificação Push"
                className="p-1.5 rounded-lg bg-brand-orange/10 text-brand-orange border border-brand-orange/25 hover:bg-brand-orange/20 transition-colors flex items-center gap-1 text-[10px] font-bold"
              >
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Notificar</span>
              </button>

              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (!showNotifications) markAllNotificationsAsRead();
                }}
                className="relative p-1.5 rounded-lg hover:bg-slate-800/10 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-orange text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse border border-slate-950">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* ----------------- EXPANDABLE: NOTIFICATIONS CENTER ----------------- */}
          {showNotifications && (
            <div className={`absolute top-[52px] inset-x-0 bottom-0 z-30 flex flex-col p-4 animate-fade-in ${appTheme === "dark" ? "bg-slate-950" : "bg-slate-100"}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm font-display flex items-center gap-2">
                  <Bell className="w-4 h-4 text-brand-orange" /> Centro de Alertas
                </h3>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-slate-500 hover:text-slate-300 font-bold"
                >
                  Fechar
                </button>
              </div>

              {notifications.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 text-xs">
                  <Bell className="w-12 h-12 stroke-1 mb-2 opacity-55" />
                  <span>Nenhum alerta recente.</span>
                </div>
              ) : (
                <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                  {notifications.map(notif => (
                    <div 
                      key={notif.id} 
                      className={`p-3 rounded-lg border text-xs leading-snug transition-all ${notif.read ? (appTheme === "dark" ? "bg-slate-900/40 border-slate-900 text-slate-300" : "bg-slate-200/50 border-slate-300 text-slate-600") : "bg-brand-blue/10 border-brand-blue/30 text-slate-100 font-medium"}`}
                    >
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="font-bold text-[11px] uppercase tracking-wider text-brand-orange">
                          {notif.type === "deal" ? "Oferta" : notif.type === "free_game" ? "Jogo Grátis" : "Notícia"}
                        </span>
                        <span className="text-[9px] text-slate-500 shrink-0">{notif.time}</span>
                      </div>
                      <p className={`font-bold mb-0.5 ${appTheme === "dark" ? "text-slate-100" : "text-slate-800"}`}>{notif.title}</p>
                      <p className={`text-[10px] ${appTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{notif.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ----------------- TAB: HOME ----------------- */}
          {activeTab === "home" && (
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              
              {/* Highlight Slide Banner */}
              <div className="relative rounded-2xl overflow-hidden h-36 flex items-end p-3 shadow-md border border-slate-850">
                <div className="absolute inset-0 z-0">
                  <img 
                    src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80" 
                    alt="GTA VI" 
                    className="w-full h-full object-cover brightness-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent"></div>
                </div>
                
                <div className="relative z-10 space-y-1">
                  <span className="bg-brand-orange text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                    Destaque Semanal
                  </span>
                  <h3 className="font-bold text-sm text-white leading-tight font-display drop-shadow-sm">
                    GTA VI: Imagens espetaculares de Vice City reveladas hoje
                  </h3>
                  <button 
                    onClick={() => {
                      setSelectedNews(news[0]);
                      setActiveTab("news");
                    }}
                    className="text-[10px] text-brand-blue font-bold flex items-center gap-0.5 hover:underline"
                  >
                    Ver matéria completa <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Free Games Section */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-brand-orange font-display flex items-center gap-1.5">
                    🎁 Jogos Gratuitos
                  </h4>
                  <button 
                    onClick={() => {
                      setDealPlatformFilter("Tudo");
                      setActiveTab("deals");
                    }} 
                    className="text-[10px] text-brand-blue font-bold hover:underline"
                  >
                    Ver todos
                  </button>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-1.5 snap-x">
                  {freeGames.map(game => (
                    <div 
                      key={game.id} 
                      className={`w-36 shrink-0 rounded-xl overflow-hidden border snap-start flex flex-col ${appTheme === "dark" ? "bg-slate-900/60 border-slate-850" : "bg-white border-slate-200"}`}
                    >
                      <div className="h-20 overflow-hidden relative">
                        <img src={game.imageUrl} alt={game.title} className="w-full h-full object-cover" />
                        <span className="absolute top-1 left-1 bg-brand-blue text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                          {game.platform}
                        </span>
                      </div>
                      <div className="p-2 flex-1 flex flex-col justify-between">
                        <p className="font-bold text-[10px] line-clamp-1 leading-snug">{game.title}</p>
                        <p className="text-[8px] text-slate-400 mt-1">{game.endDate}</p>
                        <a 
                          href={game.freeGameUrl} 
                          target="_blank" 
                          rel="referrer"
                          className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white py-1 rounded text-center text-[9px] font-bold mt-2 block"
                        >
                          Resgatar grátis
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Promo Deals Section */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-brand-blue font-display flex items-center gap-1.5">
                    🔥 Promoções Imperdíveis
                  </h4>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {deals.slice(0, 4).map(deal => (
                    <div 
                      key={deal.id} 
                      className={`rounded-xl overflow-hidden border relative flex flex-col justify-between ${appTheme === "dark" ? "bg-slate-900 border-slate-850" : "bg-white border-slate-250"}`}
                    >
                      <div className="h-24 overflow-hidden relative">
                        <img src={deal.imageUrl} alt={deal.title} className="w-full h-full object-cover" />
                        <span className="absolute top-1.5 left-1.5 bg-brand-orange text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                          -{deal.discountPercent}%
                        </span>
                        
                        {/* Favorite button icon */}
                        <button 
                          onClick={() => toggleFavoriteDeal(deal.id)}
                          className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-900/60 text-slate-100 hover:text-brand-orange hover:bg-slate-900/90"
                        >
                          <Heart className={`w-3.5 h-3.5 ${favorites.deals.includes(deal.id) ? "fill-brand-orange text-brand-orange" : "text-white"}`} />
                        </button>
                      </div>

                      <div className="p-2.5 flex-1 flex flex-col justify-between">
                        <div>
                          <span className={`text-[8px] font-bold uppercase tracking-wider ${deal.platform === "Steam" ? "text-slate-400" : "text-brand-blue"}`}>
                            {deal.platform}
                          </span>
                          <p className="font-bold text-[11px] line-clamp-1 leading-snug mt-0.5">{deal.title}</p>
                        </div>

                        <div className="mt-2.5">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-[9px] text-slate-500 line-through">R$ {deal.originalPrice.toFixed(2)}</span>
                            <span className="text-xs font-black text-brand-orange">R$ {deal.currentPrice.toFixed(2)}</span>
                          </div>

                          <div className="flex gap-1.5 mt-2">
                            <a 
                              href={deal.dealUrl} 
                              target="_blank" 
                              rel="referrer"
                              className="flex-1 bg-brand-blue hover:bg-brand-blue-hover text-white py-1 rounded text-center text-[9px] font-bold"
                            >
                              Ver oferta
                            </a>
                            <button 
                              onClick={() => {
                                setActiveAlertModal(deal);
                                setCustomAlertPrice(deal.currentPrice.toString());
                              }}
                              className={`p-1 border rounded hover:bg-slate-800 shrink-0 ${appTheme === "dark" ? "border-slate-800 text-slate-400" : "border-slate-300 text-slate-600"}`}
                              title="Criar Alerta de Preço"
                            >
                              <Bell className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ----------------- TAB: DEALS ----------------- */}
          {activeTab === "deals" && (
            <div className="flex-1 overflow-y-auto p-4 flex flex-col min-h-0">
              
              {/* Search Deals */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Buscar ofertas de jogos..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 rounded-lg text-xs outline-none border transition-all ${appTheme === "dark" ? "bg-slate-900 border-slate-850 text-slate-100" : "bg-white border-slate-250 text-slate-800"}`}
                />
              </div>

              {/* Price Range Selector Card */}
              <div className={`p-3 rounded-xl border mb-3 select-none ${appTheme === "dark" ? "bg-slate-900/50 border-slate-850" : "bg-slate-50 border-slate-200"}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Faixa de Preço Máxima</span>
                  </div>
                  <span className="text-xs font-black text-brand-orange">
                    {dealMaxPrice === 400 ? "Qualquer Preço" : `Até R$ ${dealMaxPrice.toFixed(2)}`}
                  </span>
                </div>
                
                <input 
                  type="range" 
                  min="0" 
                  max="400" 
                  step="5"
                  value={dealMaxPrice}
                  onChange={(e) => setDealMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-orange cursor-pointer bg-slate-800 rounded-lg appearance-none h-1.5 focus:outline-none"
                />

                <div className="flex justify-between text-[8px] text-slate-500 font-extrabold mt-1 uppercase">
                  <span>R$ 0,00</span>
                  <span>R$ 100</span>
                  <span>R$ 200</span>
                  <span>R$ 300</span>
                  <span>Qualquer</span>
                </div>

                {/* Quick preset buttons */}
                <div className="flex gap-1.5 mt-2.5 overflow-x-auto pb-0.5 select-none">
                  {[
                    { label: "Grátis", val: 0 },
                    { label: "Até R$ 50", val: 50 },
                    { label: "Até R$ 100", val: 100 },
                    { label: "Até R$ 200", val: 200 },
                    { label: "Qualquer", val: 400 }
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setDealMaxPrice(preset.val)}
                      className={`px-2.5 py-1 rounded text-[9px] font-bold transition-all shrink-0 cursor-pointer ${
                        dealMaxPrice === preset.val 
                          ? "bg-brand-orange/20 text-brand-orange border border-brand-orange/30 shadow-xs" 
                          : (appTheme === "dark" ? "bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800" : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200")
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform Selector Filters */}
              <div className="flex gap-2 overflow-x-auto pb-2 mb-3 select-none">
                {["Tudo", "Steam", "Epic Games", "PlayStation", "Xbox", "Nintendo"].map(platform => (
                  <button 
                    key={platform}
                    onClick={() => setDealPlatformFilter(platform)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold shrink-0 transition-colors cursor-pointer ${dealPlatformFilter === platform ? "bg-brand-blue text-white" : (appTheme === "dark" ? "bg-slate-900 hover:bg-slate-800 text-slate-400" : "bg-white border border-slate-200 text-slate-600")}`}
                  >
                    {platform}
                  </button>
                ))}
              </div>

              {/* Deals Feed */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {(() => {
                  const filteredDeals = deals
                    .filter(d => dealPlatformFilter === "Tudo" || d.platform === dealPlatformFilter)
                    .filter(d => d.currentPrice <= dealMaxPrice)
                    .filter(d => d.title.toLowerCase().includes(searchQuery.toLowerCase()));

                  if (filteredDeals.length === 0) {
                    return (
                      <div className={`p-8 text-center rounded-xl border flex flex-col items-center justify-center gap-2.5 ${appTheme === "dark" ? "bg-slate-900/30 border-slate-850" : "bg-white border-slate-200"}`}>
                        <div className="p-3 bg-brand-orange/10 rounded-full text-brand-orange mb-1">
                          <SlidersHorizontal className="w-6 h-6" />
                        </div>
                        <p className="font-bold text-xs">Nenhuma oferta encontrada</p>
                        <p className={`text-[10px] leading-relaxed max-w-[220px] mx-auto ${appTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                          Tente mudar os filtros de plataforma, buscar por outro nome ou aumentar a faixa de preço máxima.
                        </p>
                        <button
                          onClick={() => {
                            setDealPlatformFilter("Tudo");
                            setDealMaxPrice(400);
                            setSearchQuery("");
                          }}
                          className="px-3.5 py-1.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-[10px] font-black rounded-lg shadow-sm transition-all cursor-pointer"
                        >
                          Limpar Filtros
                        </button>
                      </div>
                    );
                  }

                  return filteredDeals.map(deal => (
                    <div 
                      key={deal.id} 
                      className={`p-2.5 rounded-xl border flex gap-3 ${appTheme === "dark" ? "bg-slate-900/70 border-slate-850" : "bg-white border-slate-200 shadow-xs"}`}
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 relative">
                        <img src={deal.imageUrl} alt={deal.title} className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 bg-brand-orange text-white text-[8px] font-black px-1 py-0.5 rounded">
                          -{deal.discountPercent}%
                        </span>
                      </div>

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="text-[8px] font-extrabold uppercase px-1.5 py-0.5 bg-brand-blue/10 text-brand-blue rounded">
                              {deal.platform}
                            </span>
                            <button 
                              onClick={() => toggleFavoriteDeal(deal.id)}
                              className="text-slate-400 hover:text-brand-orange cursor-pointer"
                            >
                              <Heart className={`w-3.5 h-3.5 ${favorites.deals.includes(deal.id) ? "fill-brand-orange text-brand-orange" : ""}`} />
                            </button>
                          </div>
                          <p className="font-bold text-xs mt-1 truncate leading-tight">{deal.title}</p>
                        </div>

                        <div className="flex items-end justify-between gap-2 mt-2">
                          <div className="flex flex-col">
                            <span className="text-[9px] text-slate-500 line-through">R$ {deal.originalPrice.toFixed(2)}</span>
                            <span className="text-xs font-black text-brand-orange">R$ {deal.currentPrice.toFixed(2)}</span>
                          </div>

                          <div className="flex gap-1">
                            <a 
                              href={deal.dealUrl} 
                              target="_blank" 
                              rel="referrer"
                              className="bg-brand-blue hover:bg-brand-blue-hover text-white px-2.5 py-1.5 rounded-md text-[10px] font-bold"
                            >
                              Ver oferta
                            </a>
                            <button 
                              onClick={() => {
                                setActiveAlertModal(deal);
                                setCustomAlertPrice(deal.currentPrice.toString());
                              }}
                              className={`p-1.5 border rounded-md hover:bg-slate-800 cursor-pointer ${appTheme === "dark" ? "border-slate-800 text-slate-400" : "border-slate-300 text-slate-600"}`}
                              title="Criar Alerta"
                            >
                              <Bell className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}

          {/* ----------------- TAB: NEWS ----------------- */}
          {activeTab === "news" && (
            <div className="flex-1 overflow-y-auto p-4 flex flex-col min-h-0">
              
              {/* Category selector */}
              <div className="flex gap-2 overflow-x-auto pb-2 mb-3.5 select-none shrink-0">
                {["Tudo", "GTA", "Fortnite", "EA Sports FC", "Call of Duty", "Minecraft", "PlayStation", "Xbox", "Nintendo"].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => {
                      setNewsCategoryFilter(cat);
                      setSelectedNews(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold shrink-0 transition-colors ${newsCategoryFilter === cat ? "bg-brand-orange text-white" : (appTheme === "dark" ? "bg-slate-900 hover:bg-slate-800 text-slate-400" : "bg-white border border-slate-200 text-slate-600")}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* News Feed / Detail View */}
              {selectedNews ? (
                <div className={`flex-1 overflow-y-auto space-y-3 animate-fade-in ${appTheme === "dark" ? "text-slate-200" : "text-slate-800"}`}>
                  <button 
                    onClick={() => setSelectedNews(null)}
                    className="flex items-center gap-1 text-slate-400 hover:text-slate-200 text-[10px] font-bold uppercase tracking-wider mb-2"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Feed
                  </button>
                  
                  <div className="h-36 rounded-xl overflow-hidden relative">
                    <img src={selectedNews.imageUrl} alt={selectedNews.title} className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 bg-brand-orange text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">
                      {selectedNews.category}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] text-slate-500">
                      <span>{selectedNews.sourceName}</span>
                      <span>{selectedNews.publishedAt}</span>
                    </div>
                    <h3 className="font-bold text-base leading-tight font-display">{selectedNews.title}</h3>
                  </div>

                  <p className={`text-xs italic leading-relaxed p-3 border-l-2 border-brand-orange ${appTheme === "dark" ? "bg-slate-900 text-slate-300" : "bg-slate-200/50 text-slate-700"}`}>
                    {selectedNews.summary}
                  </p>

                  <p className="text-xs leading-relaxed text-justify whitespace-pre-wrap font-sans">
                    {selectedNews.content}
                  </p>

                  {/* Favorite/Share controls */}
                  <div className="flex gap-2 pt-4">
                    <button 
                      onClick={() => toggleFavoriteNews(selectedNews.id)}
                      className="flex-1 py-2 rounded-lg bg-brand-blue text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-brand-blue-hover transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${favorites.news.includes(selectedNews.id) ? "fill-white" : ""}`} />
                      {favorites.news.includes(selectedNews.id) ? "Favoritado" : "Salvar nos Favoritos"}
                    </button>
                    
                    <button 
                      onClick={() => alert("Link da notícia copiado para área de transferência!")}
                      className={`px-3 py-2 border rounded-lg hover:bg-slate-800 ${appTheme === "dark" ? "border-slate-800 text-slate-400" : "border-slate-300 text-slate-600"}`}
                      title="Compartilhar notícia"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
                  {news
                    .filter(article => newsCategoryFilter === "Tudo" || article.category === newsCategoryFilter)
                    .map(article => (
                      <div 
                        key={article.id}
                        className={`rounded-xl border overflow-hidden flex flex-col ${appTheme === "dark" ? "bg-slate-900/60 border-slate-850" : "bg-white border-slate-200 shadow-2xs"}`}
                      >
                        <div className="h-28 overflow-hidden relative">
                          <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                          <span className="absolute top-2 left-2 bg-brand-orange text-white text-[9px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
                            {article.category}
                          </span>
                        </div>

                        <div className="p-3 space-y-2">
                          <div className="flex justify-between items-center text-[9px] text-slate-500">
                            <span>{article.sourceName}</span>
                            <span>{article.publishedAt}</span>
                          </div>
                          <h4 className="font-bold text-xs leading-tight font-display text-slate-100 dark:text-slate-100 dark:brightness-100 brightness-95 text-ellipsis">{article.title}</h4>
                          <p className={`text-[10px] line-clamp-2 ${appTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{article.summary}</p>
                          
                          <div className="flex justify-between items-center pt-2 border-t border-slate-800/40">
                            <button 
                              onClick={() => toggleFavoriteNews(article.id)}
                              className="text-slate-400 hover:text-brand-orange"
                            >
                              <Heart className={`w-4 h-4 ${favorites.news.includes(article.id) ? "fill-brand-orange text-brand-orange" : ""}`} />
                            </button>

                            <button 
                              onClick={() => setSelectedNews(article)}
                              className="text-[10px] text-brand-blue font-bold uppercase tracking-wider hover:underline"
                            >
                              Ler mais
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* ----------------- TAB: FAVORITES ----------------- */}
          {activeTab === "favorites" && (
            <div className="flex-1 overflow-y-auto p-4 flex flex-col min-h-0">
              <h3 className="font-bold text-sm mb-3.5 font-display flex items-center gap-2">
                <Heart className="w-4 h-4 text-brand-orange fill-brand-orange" /> Meus Favoritos
              </h3>

              {favorites.deals.length === 0 && favorites.news.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 text-xs">
                  <Gamepad2 className="w-12 h-12 stroke-1 mb-2 opacity-50 text-brand-orange" />
                  <p className="font-bold">Sua biblioteca está vazia!</p>
                  <p className="text-[10px] text-slate-400 mt-1 max-w-xs">
                    Favorite promoções e notícias para salvá-las aqui e acessar offline.
                  </p>
                </div>
              ) : (
                <div className="flex-grow overflow-y-auto space-y-4 pr-1">
                  
                  {/* Saved Promo Deals */}
                  {favorites.deals.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 border-b border-slate-800/60 pb-1">
                        Promoções Salvas ({favorites.deals.length})
                      </h4>
                      <div className="space-y-2">
                        {deals
                          .filter(d => favorites.deals.includes(d.id))
                          .map(deal => (
                            <div 
                              key={deal.id}
                              className={`p-2 rounded-lg border flex items-center gap-3 justify-between ${appTheme === "dark" ? "bg-slate-900/80 border-slate-850" : "bg-white border-slate-200"}`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <img src={deal.imageUrl} alt={deal.title} className="w-10 h-10 object-cover rounded" />
                                <div className="min-w-0">
                                  <p className="font-bold text-[11px] truncate">{deal.title}</p>
                                  <span className="text-[8px] font-black text-brand-orange">R$ {deal.currentPrice.toFixed(2)}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <a 
                                  href={deal.dealUrl} 
                                  target="_blank" 
                                  rel="referrer"
                                  className="px-2 py-1 bg-brand-blue text-white text-[9px] font-bold rounded"
                                >
                                  Ir
                                </a>
                                <button 
                                  onClick={() => toggleFavoriteDeal(deal.id)}
                                  className="text-brand-orange"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Saved News */}
                  {favorites.news.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 border-b border-slate-800/60 pb-1">
                        Notícias Salvas ({favorites.news.length})
                      </h4>
                      <div className="space-y-2">
                        {news
                          .filter(n => favorites.news.includes(n.id))
                          .map(article => (
                            <div 
                              key={article.id}
                              className={`p-2 rounded-lg border flex items-center gap-3 justify-between ${appTheme === "dark" ? "bg-slate-900/80 border-slate-850" : "bg-white border-slate-200"}`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <img src={article.imageUrl} alt={article.title} className="w-10 h-10 object-cover rounded" />
                                <div className="min-w-0">
                                  <p className="font-bold text-[11px] truncate">{article.title}</p>
                                  <span className="text-[8px] text-slate-400">{article.category}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <button 
                                  onClick={() => {
                                    setSelectedNews(article);
                                    setActiveTab("news");
                                  }}
                                  className="px-2 py-1 bg-brand-orange text-white text-[9px] font-bold rounded"
                                >
                                  Ler
                                </button>
                                <button 
                                  onClick={() => toggleFavoriteNews(article.id)}
                                  className="text-brand-orange"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          )}

          {/* ----------------- TAB: COUPONS & AFFILIATES ----------------- */}
          {activeTab === "coupons" && (
            <div className="flex-1 overflow-y-auto p-4 flex flex-col min-h-0">
              
              {/* Header Info */}
              <div className="mb-4 text-left">
                <h3 className="font-bold text-sm mb-1 font-display flex items-center gap-2 text-slate-100 dark:text-slate-100">
                  <Ticket className="w-4 h-4 text-brand-orange" /> Cupons & Códigos de Afiliados
                </h3>
                <p className={`text-[10px] leading-relaxed ${appTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                  Use cupons exclusivos de nossos parceiros e ajude a manter o canal Gamer Alerta ativo!
                </p>
              </div>

              {/* Search Coupons */}
              <div className="relative mb-3.5 shrink-0">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Pesquisar loja ou código..." 
                  value={couponSearchQuery}
                  onChange={(e) => setCouponSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs outline-none transition-colors ${appTheme === "dark" ? "bg-slate-900 border border-slate-850 focus:border-brand-orange text-white" : "bg-white border border-slate-200 focus:border-brand-blue text-slate-800"}`}
                />
              </div>

              {/* Category selector */}
              <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3.5 select-none shrink-0">
                {["Tudo", "Jogos", "Hardware", "Acessórios", "Consoles", "Outros"].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setCouponCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold shrink-0 transition-colors cursor-pointer ${couponCategoryFilter === cat ? "bg-brand-orange text-white" : (appTheme === "dark" ? "bg-slate-900 hover:bg-slate-800 text-slate-400" : "bg-white border border-slate-200 text-slate-600")}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Coupons List */}
              <div className="flex-grow overflow-y-auto space-y-3 pr-1 min-h-0">
                {(() => {
                  const filteredCoupons = coupons
                    .filter(c => couponCategoryFilter === "Tudo" || c.category === couponCategoryFilter)
                    .filter(c => c.storeName.toLowerCase().includes(couponSearchQuery.toLowerCase()) || c.code.toLowerCase().includes(couponSearchQuery.toLowerCase()));

                  if (filteredCoupons.length === 0) {
                    return (
                      <div className={`p-8 text-center rounded-xl border flex flex-col items-center justify-center gap-2.5 ${appTheme === "dark" ? "bg-slate-900/30 border-slate-850" : "bg-white border-slate-200"}`}>
                        <div className="p-3 bg-brand-orange/10 rounded-full text-brand-orange mb-1">
                          <Ticket className="w-6 h-6" />
                        </div>
                        <p className="font-bold text-xs text-slate-100 dark:text-slate-100">Nenhum cupom disponível</p>
                        <p className={`text-[10px] leading-relaxed max-w-[220px] mx-auto ${appTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                          Nenhum cupom ativo corresponde aos filtros ou busca informada.
                        </p>
                        <button
                          onClick={() => {
                            setCouponCategoryFilter("Tudo");
                            setCouponSearchQuery("");
                          }}
                          className="px-3.5 py-1.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-[10px] font-black rounded-lg shadow-sm transition-all cursor-pointer"
                        >
                          Mostrar Todos
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div className="space-y-3">
                      {filteredCoupons.map(coupon => (
                        <div 
                          key={coupon.id} 
                          className={`p-3 rounded-xl border flex gap-3 relative overflow-hidden transition-all duration-300 ${appTheme === "dark" ? "bg-slate-900/70 border-slate-850" : "bg-white border-slate-200 shadow-2xs"}`}
                        >
                          {/* Visual dashed coupon border decoration */}
                          <div className={`absolute left-0 top-0 bottom-0 w-1.5 border-r border-dashed ${appTheme === "dark" ? "border-slate-850 bg-brand-orange/10" : "border-slate-300 bg-amber-50"}`}></div>
                          
                          <div className="flex-1 pl-1 text-left space-y-2">
                            {/* Top info and category */}
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-1.5">
                                <span className="font-black text-xs text-brand-orange">{coupon.storeName}</span>
                                {coupon.isVerified && (
                                  <span className="bg-emerald-500/10 text-emerald-500 text-[8px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 border border-emerald-500/10">
                                    ✓ Verificado
                                  </span>
                                )}
                              </div>
                              <span className="text-[8px] font-extrabold uppercase px-1.5 py-0.5 bg-brand-blue/10 text-brand-blue rounded">
                                {coupon.category}
                              </span>
                            </div>

                            {/* Coupon Description and Discount */}
                            <div>
                              <p className="text-xs font-bold leading-snug text-slate-100 dark:text-slate-100">Ganhe <span className="text-brand-orange text-sm font-black">{coupon.discount}</span> de desconto</p>
                              <p className={`text-[10px] leading-relaxed mt-1 ${appTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                                {coupon.description}
                              </p>
                            </div>

                            {/* Code copier and Action buttons */}
                            <div className="flex flex-col sm:flex-row gap-2 pt-1">
                              {/* Clickable Code Copier Button */}
                              <button
                                onClick={() => handleCopyCoupon(coupon.id, coupon.code)}
                                className={`flex-1 flex items-center justify-between px-3 py-1.5 border border-dashed rounded-lg text-xs font-mono font-bold transition-all duration-200 cursor-pointer ${
                                  copiedCouponId === coupon.id
                                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-500"
                                    : (appTheme === "dark" ? "bg-slate-950/70 border-slate-800 hover:border-brand-orange text-slate-100 hover:bg-slate-950" : "bg-slate-50 border-slate-300 hover:border-brand-blue text-slate-700 hover:bg-slate-105")
                                }`}
                                title="Clique para copiar o código"
                              >
                                <span className="tracking-wider">{coupon.code}</span>
                                <span className="flex items-center gap-1 text-[9px] font-sans font-bold uppercase tracking-normal">
                                  {copiedCouponId === coupon.id ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-500" />
                                      Copiado!
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3 text-slate-400" />
                                      Copiar
                                    </>
                                  )}
                                </span>
                              </button>

                              {/* Store redirection link */}
                              <a 
                                href={coupon.affiliateUrl}
                                target="_blank"
                                rel="referrer"
                                className="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] font-extrabold rounded-lg flex items-center justify-center gap-1 transition-colors shadow-xs"
                              >
                                Ir para Loja <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>

                            <p className="text-[8px] text-slate-500 font-extrabold uppercase mt-0.5">{coupon.expiresAt}</p>
                          </div>
                        </div>
                      ))}

                      {/* Become an Affiliate Info Card */}
                      <div className={`p-3.5 rounded-xl border text-left flex flex-col gap-2 mt-4 ${appTheme === "dark" ? "bg-brand-orange/5 border-brand-orange/15" : "bg-orange-50/50 border-orange-200"}`}>
                        <div className="flex items-center gap-1.5 text-brand-orange text-[10px] font-extrabold uppercase tracking-wider">
                          <Sparkles className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
                          <span>Seja um Parceiro Afiliado</span>
                        </div>
                        <p className={`text-[10px] leading-relaxed ${appTheme === "dark" ? "text-slate-400" : "text-slate-650"}`}>
                          Quer divulgar seus cupons e códigos de desconto promocionais para nossa comunidade de games? Marcos, nosso Administrador, está sempre buscando novas parcerias de afiliação.
                        </p>
                        <div className="flex flex-wrap items-center justify-between gap-2 mt-1 pt-1.5 border-t border-slate-800/40">
                          <span className="text-[9px] text-slate-500 font-mono">parceiros@gameralerta.com.br</span>
                          <a
                            href="mailto:parceiros@gameralerta.com.br"
                            className="px-2.5 py-1 bg-brand-orange/15 hover:bg-brand-orange/25 text-brand-orange text-[9px] font-extrabold rounded"
                          >
                            Entrar em Contato
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

            </div>
          )}

          {/* ----------------- TAB: PROFILE & CONFIGS ----------------- */}
          {activeTab === "profile" && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              {/* Profile Card Header */}
              <div className={`p-4 rounded-xl border flex items-center gap-3 ${appTheme === "dark" ? "bg-slate-900/60 border-slate-850" : "bg-white border-slate-200"}`}>
                <img 
                  src={user?.avatar || "https://api.dicebear.com/7.x/pixel-art/svg?seed=guest"} 
                  alt="avatar" 
                  className="w-14 h-14 rounded-full border-2 border-brand-orange bg-slate-800 shrink-0" 
                />
                <div className="min-w-0 flex-1">
                  <input 
                    type="text" 
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="font-bold text-sm bg-transparent border-b border-transparent focus:border-brand-blue outline-none w-full text-slate-100 dark:text-slate-100 leading-tight" 
                    placeholder="Seu Nome Gamer"
                    title="Clique para editar nome"
                  />
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">{user?.email}</p>
                  {user?.role === "admin" ? (
                    <span className="bg-red-500/15 text-red-500 text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded mt-1.5 inline-block border border-red-500/10">
                      Administrador Geral
                    </span>
                  ) : user?.email === "visitante@gameralerta.com.br" ? (
                    <span className="bg-[#F97316]/15 text-[#F97316] text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded mt-1.5 inline-block border border-[#F97316]/10">
                      Acesso Visitante
                    </span>
                  ) : (
                    <span className="bg-brand-blue/15 text-brand-blue text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded mt-1.5 inline-block">
                      Membro Gamer Alerta
                    </span>
                  )}
                </div>
              </div>

              {/* Informative banner for Guest users */}
              {user?.email === "visitante@gameralerta.com.br" && (
                <div className={`p-3 rounded-xl border text-left flex flex-col gap-1.5 ${appTheme === "dark" ? "bg-[#F97316]/5 border-[#F97316]/20" : "bg-amber-50 border-amber-200"}`}>
                  <p className="font-extrabold text-[10px] text-[#F97316] flex items-center gap-1 uppercase tracking-wider">
                    💡 Modo Visitante Ativo
                  </p>
                  <p className={`text-[10px] leading-relaxed ${appTheme === "dark" ? "text-slate-400" : "text-slate-650"}`}>
                    Você está navegando de forma 105% livre, sem login obrigatório! Suas ofertas salvas, alertas de preço personalizados e simulações funcionam perfeitamente.
                  </p>
                  <button 
                    onClick={() => {
                      setUser(null);
                      setEmailInput("");
                      setPasswordInput("");
                      setCurrentScreen("login");
                    }}
                    className="w-full py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-[10px] font-extrabold rounded-lg shadow-sm transition-all active:scale-98 cursor-pointer mt-0.5"
                  >
                    Criar Conta ou Logar como Marcos Admin
                  </button>
                </div>
              )}

              {/* Painel do Administrador (Only for Admin role) */}
              {user?.role === "admin" && (
                <div className={`p-4 rounded-xl border space-y-3 text-left ${appTheme === "dark" ? "bg-red-500/5 border-red-500/20" : "bg-red-50/50 border-red-200 text-slate-800"}`}>
                  <div className="flex items-center justify-between border-b border-red-500/10 pb-2">
                    <div className="flex items-center gap-1.5 text-red-500">
                      <ShieldAlert className="w-4 h-4 animate-pulse" />
                      <h4 className="font-bold text-xs uppercase tracking-wider font-display">
                        Painel do Administrador
                      </h4>
                    </div>
                    <span className="text-[9px] bg-red-500 text-white font-extrabold px-1.5 py-0.5 rounded-full uppercase">
                      Marcos
                    </span>
                  </div>

                  {/* Sub-tabs for Admin: Promos / News / Broadcast / Coupons */}
                  <div className="flex gap-1 bg-slate-950/40 p-1 rounded-lg border border-slate-900 select-none">
                    <button 
                      type="button"
                      onClick={() => setAdminSubTab("promo")}
                      className={`flex-1 text-[9px] py-1 rounded font-bold transition-all ${adminSubTab === "promo" ? "bg-red-500 text-white shadow-xs" : "text-slate-400 hover:text-slate-200"}`}
                    >
                      + Promo
                    </button>
                    <button 
                      type="button"
                      onClick={() => setAdminSubTab("coupons")}
                      className={`flex-1 text-[9px] py-1 rounded font-bold transition-all ${adminSubTab === "coupons" ? "bg-red-500 text-white shadow-xs" : "text-slate-400 hover:text-slate-200"}`}
                    >
                      + Cupom
                    </button>
                    <button 
                      type="button"
                      onClick={() => setAdminSubTab("news")}
                      className={`flex-1 text-[9px] py-1 rounded font-bold transition-all ${adminSubTab === "news" ? "bg-red-500 text-white shadow-xs" : "text-slate-400 hover:text-slate-200"}`}
                    >
                      + Notícia
                    </button>
                    <button 
                      type="button"
                      onClick={() => setAdminSubTab("push")}
                      className={`flex-1 text-[9px] py-1 rounded font-bold transition-all ${adminSubTab === "push" ? "bg-red-500 text-white shadow-xs" : "text-slate-400 hover:text-slate-200"}`}
                    >
                      Broadcast
                    </button>
                  </div>

                  {/* SUB-TAB: ADD PROMO */}
                  {adminSubTab === "promo" && (
                    <form onSubmit={handleAdminAddPromo} className="space-y-2.5 pt-1 text-slate-100 dark:text-slate-100 text-left">
                      <div>
                        <label className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Título do Jogo</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: GTA V Premium"
                          value={adminPromoTitle}
                          onChange={(e) => setAdminPromoTitle(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs outline-none focus:border-red-500 text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Plataforma</label>
                          <select 
                            value={adminPromoPlatform}
                            onChange={(e) => setAdminPromoPlatform(e.target.value as any)}
                            className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs outline-none focus:border-red-500 text-slate-200"
                          >
                            <option value="Steam">Steam</option>
                            <option value="Epic Games">Epic Games</option>
                            <option value="PlayStation">PlayStation</option>
                            <option value="Xbox">Xbox</option>
                            <option value="Nintendo">Nintendo</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Desconto (%)</label>
                          <input 
                            type="number" 
                            required
                            min="1"
                            max="100"
                            placeholder="50"
                            value={adminPromoDiscount}
                            onChange={(e) => setAdminPromoDiscount(e.target.value)}
                            className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs outline-none focus:border-red-500 text-white"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Preço Original (R$)</label>
                          <input 
                            type="number" 
                            step="0.01"
                            required
                            placeholder="199.90"
                            value={adminPromoOrigPrice}
                            onChange={(e) => setAdminPromoOrigPrice(e.target.value)}
                            className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs outline-none focus:border-red-500 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Preço Atual (R$)</label>
                          <input 
                            type="number" 
                            step="0.01"
                            required
                            placeholder="99.95"
                            value={adminPromoCurrPrice}
                            onChange={(e) => setAdminPromoCurrPrice(e.target.value)}
                            className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs outline-none focus:border-red-500 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">URL da Imagem (Opcional)</label>
                        <input 
                          type="text" 
                          placeholder="https://images.unsplash.com/..."
                          value={adminPromoImgUrl}
                          onChange={(e) => setAdminPromoImgUrl(e.target.value)}
                          className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs outline-none focus:border-red-500 text-slate-400 text-ellipsis text-white"
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="w-full py-2 bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold rounded flex items-center justify-center gap-1 cursor-pointer shadow"
                      >
                        <PlusCircle className="w-3.5 h-3.5" /> Publicar Promoção
                      </button>
                    </form>
                  )}

                  {/* SUB-TAB: ADD NEWS */}
                  {adminSubTab === "news" && (
                    <form onSubmit={handleAdminAddNews} className="space-y-2.5 pt-1 text-slate-100 dark:text-slate-100 text-left">
                      <div>
                        <label className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Título da Notícia</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: PlayStation 6 anunciado!"
                          value={adminNewsTitle}
                          onChange={(e) => setAdminNewsTitle(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs outline-none focus:border-red-500 text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Categoria</label>
                          <select 
                            value={adminNewsCategory}
                            onChange={(e) => setAdminNewsCategory(e.target.value as any)}
                            className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs outline-none focus:border-red-500 text-slate-200"
                          >
                            <option value="GTA">GTA</option>
                            <option value="Fortnite">Fortnite</option>
                            <option value="EA Sports FC">EA Sports FC</option>
                            <option value="Call of Duty">Call of Duty</option>
                            <option value="Minecraft">Minecraft</option>
                            <option value="PlayStation">PlayStation</option>
                            <option value="Xbox">Xbox</option>
                            <option value="Nintendo">Nintendo</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Fonte / Autor</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Gamer Alerta"
                            value={adminNewsSource}
                            onChange={(e) => setAdminNewsSource(e.target.value)}
                            className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs outline-none focus:border-red-500 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Resumo</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Breve resumo de uma frase..."
                          value={adminNewsSummary}
                          onChange={(e) => setAdminNewsSummary(e.target.value)}
                          className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs outline-none focus:border-red-500 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Conteúdo da Notícia</label>
                        <textarea 
                          required
                          rows={2}
                          placeholder="Digite o artigo completo..."
                          value={adminNewsContent}
                          onChange={(e) => setAdminNewsContent(e.target.value)}
                          className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs outline-none focus:border-red-500 text-white resize-none"
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="w-full py-2 bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold rounded flex items-center justify-center gap-1 cursor-pointer shadow"
                      >
                        <PlusCircle className="w-3.5 h-3.5" /> Publicar Notícia
                      </button>
                    </form>
                  )}

                  {/* SUB-TAB: BROADCAST NOTIFICATION */}
                  {adminSubTab === "push" && (
                    <form onSubmit={handleAdminBroadcastPush} className="space-y-2.5 pt-1 text-slate-100 dark:text-slate-100 text-left">
                      <div>
                        <label className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Título da Notificação Push</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: 🚨 ALERTA GERAL: Cupom Steam!"
                          value={adminPushTitle}
                          onChange={(e) => setAdminPushTitle(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs outline-none focus:border-red-500 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Mensagem (Corpo)</label>
                        <textarea 
                          required
                          rows={2}
                          placeholder="Digite a mensagem que aparecerá no celular..."
                          value={adminPushBody}
                          onChange={(e) => setAdminPushBody(e.target.value)}
                          className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs outline-none focus:border-red-500 text-white resize-none"
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="w-full py-2 bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold rounded flex items-center justify-center gap-1 cursor-pointer shadow"
                      >
                        <Send className="w-3.5 h-3.5" /> Disparar Firebase FCM
                      </button>
                    </form>
                  )}

                  {/* SUB-TAB: ADD COUPON */}
                  {adminSubTab === "coupons" && (
                    <form onSubmit={handleAdminAddCoupon} className="space-y-2.5 pt-1 text-slate-100 dark:text-slate-100 text-left">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Código do Cupom</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Ex: GAMER10"
                            value={adminCouponCode}
                            onChange={(e) => setAdminCouponCode(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs outline-none focus:border-red-500 text-white uppercase"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Desconto (Ex: 15% OFF)</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Ex: 15% OFF"
                            value={adminCouponDiscount}
                            onChange={(e) => setAdminCouponDiscount(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs outline-none focus:border-red-500 text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Loja / Parceiro</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Ex: Amazon, Nuuvem"
                            value={adminCouponStore}
                            onChange={(e) => setAdminCouponStore(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs outline-none focus:border-red-500 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Categoria</label>
                          <select 
                            value={adminCouponCategory}
                            onChange={(e) => setAdminCouponCategory(e.target.value as any)}
                            className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs outline-none focus:border-red-500 text-slate-200"
                          >
                            <option value="Jogos">Jogos</option>
                            <option value="Hardware">Hardware</option>
                            <option value="Acessórios">Acessórios</option>
                            <option value="Consoles">Consoles</option>
                            <option value="Outros">Outros</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Link de Afiliado (URL)</label>
                        <input 
                          type="url" 
                          placeholder="Ex: https://loja.com/?ref=gameralerta"
                          value={adminCouponUrl}
                          onChange={(e) => setAdminCouponUrl(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded text-xs outline-none focus:border-red-500 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Regras / Descrição</label>
                        <textarea 
                          rows={2}
                          placeholder="Ex: Válido apenas em mouses gamers selecionados..."
                          value={adminCouponDesc}
                          onChange={(e) => setAdminCouponDesc(e.target.value)}
                          className="w-full px-2.5 py-1 bg-slate-950 border border-slate-800 rounded text-xs outline-none focus:border-red-500 text-white resize-none"
                        />
                      </div>

                      <button 
                        type="submit" 
                        className="w-full py-2 bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold rounded flex items-center justify-center gap-1 cursor-pointer shadow"
                      >
                        <PlusCircle className="w-3.5 h-3.5" /> Adicionar Cupom Afiliado
                      </button>
                    </form>
                  )}

                </div>
              )}

              {/* Saved Price Alerts Section */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
                  🔔 Meus Alertas de Preço ({priceAlerts.length})
                </h4>
                {priceAlerts.length === 0 ? (
                  <p className="text-[10px] text-slate-500 italic">Nenhum alerta de preço configurado.</p>
                ) : (
                  <div className="space-y-1.5">
                    {priceAlerts.map(alertItem => (
                      <div 
                        key={alertItem.id} 
                        className={`px-3 py-2 rounded-lg border text-xs flex justify-between items-center ${appTheme === "dark" ? "bg-slate-900/40 border-slate-900/60" : "bg-white border-slate-200"}`}
                      >
                        <div className="min-w-0">
                          <p className="font-bold text-[11px] truncate">{alertItem.title}</p>
                          <p className="text-[9px] text-slate-500">
                            Abaixo de <span className="text-brand-orange font-bold">R$ {alertItem.targetPrice.toFixed(2)}</span> • {alertItem.platform}
                          </p>
                        </div>
                        <button 
                          onClick={() => setPriceAlerts(prev => prev.filter(a => a.id !== alertItem.id))}
                          className="text-red-400 hover:text-red-500 p-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Notification Preferences */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
                  ⚙️ Configurações de Notificações (FCM)
                </h4>
                <div className={`p-3 rounded-xl border space-y-2.5 text-xs ${appTheme === "dark" ? "bg-slate-900/40 border-slate-900/60" : "bg-white border-slate-200"}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">Novas Promoções</p>
                      <p className="text-[9px] text-slate-400">Alertas das melhores ofertas adicionadas.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notificationPreferences.promotions}
                      onChange={(e) => setNotificationPreferences(p => ({ ...p, promotions: e.target.checked }))}
                      className="accent-brand-blue w-4 h-4 cursor-pointer"
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">Jogos Gratuitos</p>
                      <p className="text-[9px] text-slate-400">Lembretes quando jogos novos ficarem de graça.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notificationPreferences.freeGames}
                      onChange={(e) => setNotificationPreferences(p => ({ ...p, freeGames: e.target.checked }))}
                      className="accent-brand-blue w-4 h-4 cursor-pointer"
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">Notícias Urgentes</p>
                      <p className="text-[9px] text-slate-400">Notificações push de atualizações bombásticas.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notificationPreferences.news}
                      onChange={(e) => setNotificationPreferences(p => ({ ...p, news: e.target.checked }))}
                      className="accent-brand-blue w-4 h-4 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* App Preferences */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
                  📱 Preferências do Aplicativo
                </h4>
                <div className={`p-3 rounded-xl border space-y-2 text-xs ${appTheme === "dark" ? "bg-slate-900/40 border-slate-900/60" : "bg-white border-slate-200"}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">Tema Visual</p>
                      <p className="text-[9px] text-slate-400">Selecione o estilo visual do applet.</p>
                    </div>
                    <button 
                      onClick={() => setAppTheme(theme => theme === "dark" ? "light" : "dark")}
                      className={`p-2 rounded-lg border transition-all ${appTheme === "dark" ? "bg-slate-800 border-slate-700 text-yellow-400" : "bg-slate-100 border-slate-300 text-slate-800"}`}
                    >
                      {appTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Progressive Web App (PWA) Info & Install card */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
                  ⚡ Progressive Web App (PWA)
                </h4>
                <div className={`p-3.5 rounded-xl border space-y-3 text-left text-xs ${appTheme === "dark" ? "bg-slate-900/40 border-slate-900/60" : "bg-white border-slate-200"}`}>
                  <div className="flex items-start gap-2.5">
                    <Smartphone className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Instalar no seu Smartphone ou PC</p>
                      <p className={`text-[10px] leading-relaxed mt-0.5 ${appTheme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
                        Adicione o Gamer Alerta à tela inicial para carregamento instantâneo, visualização em tela cheia e suporte offline completo.
                      </p>
                    </div>
                  </div>

                  {showInstallBtn ? (
                    <button
                      onClick={handleInstallApp}
                      className="w-full py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] font-extrabold rounded-lg shadow-sm transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Smartphone className="w-4 h-4" /> Instalar Gamer Alerta PWA
                    </button>
                  ) : (
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] leading-relaxed">
                      💡 <strong>Dica de Instalação:</strong> Se o botão não aparecer, clique no ícone de instalar na barra de endereços do seu navegador ou selecione <strong>"Adicionar à Tela de Início"</strong> no menu de compartilhamento do seu celular!
                    </div>
                  )}
                </div>
              </div>

              {/* Canal de Feedback da Versão Beta */}
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
                  🧪 Central de Feedback Beta
                </h4>
                <div className={`p-3.5 rounded-xl border text-left text-xs space-y-3 ${appTheme === "dark" ? "bg-brand-orange/5 border-brand-orange/15" : "bg-orange-50/40 border-orange-200"}`}>
                  <p className={`text-[10px] leading-relaxed ${appTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Está testando a versão beta do Gamer Alerta? Reporte erros, envie sugestões de novas lojas parceiras ou dê a sua opinião!
                  </p>

                  {showFeedbackSuccess ? (
                    <div className="p-3 rounded-lg bg-emerald-500/15 border border-emerald-500/35 text-emerald-500 space-y-1">
                      <p className="font-extrabold text-[10px] uppercase tracking-wide">✓ Feedback Recebido com Sucesso!</p>
                      <p className="text-[9px] leading-normal text-slate-300 dark:text-slate-300">Obrigado por ajudar no desenvolvimento! Suas sugestões foram salvas na simulação do Firebase.</p>
                      <button 
                        onClick={() => setShowFeedbackSuccess(false)}
                        className="text-[9px] font-bold underline hover:no-underline text-emerald-400 mt-1 block cursor-pointer"
                      >
                        Enviar outro
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Tipo</label>
                          <select 
                            value={betaFeedbackType}
                            onChange={(e) => setBetaFeedbackType(e.target.value)}
                            className={`w-full px-2 py-1 rounded text-[10px] outline-none border ${appTheme === "dark" ? "bg-slate-950 border-slate-800 text-slate-200 focus:border-brand-orange" : "bg-white border-slate-300 text-slate-700 focus:border-brand-blue"}`}
                          >
                            <option value="Sugestão">💡 Sugestão</option>
                            <option value="Bug">🐛 Bug / Erro</option>
                            <option value="Loja">🏪 Nova Loja</option>
                            <option value="Outros">💬 Outro</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Versão</label>
                          <span className={`block w-full px-2 py-1.5 rounded text-[10px] border font-bold text-center ${appTheme === "dark" ? "bg-slate-950/40 border-slate-900 text-brand-orange" : "bg-slate-50 border-slate-200 text-slate-700"}`}>
                            v1.0.0-BETA
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Mensagem</label>
                        <textarea
                          rows={2}
                          value={betaFeedbackText}
                          onChange={(e) => setBetaFeedbackText(e.target.value)}
                          placeholder="Ex: Gostaria de cupons da loja Steam ou Epic..."
                          className={`w-full px-2.5 py-1.5 rounded text-[10px] outline-none border resize-none ${appTheme === "dark" ? "bg-slate-950 border-slate-800 text-white focus:border-brand-orange" : "bg-white border-slate-300 text-slate-800 focus:border-brand-blue"}`}
                        />
                      </div>

                      <button
                        onClick={() => {
                          if (!betaFeedbackText.trim()) {
                            alert("Por favor, digite o seu feedback.");
                            return;
                          }
                          setShowFeedbackSuccess(true);
                          setBetaFeedbackText("");
                          
                          // Simulate dynamic notification
                          setPushBanner({
                            title: "🧪 FEEDBACK ENVIADO!",
                            body: "Sua mensagem foi entregue aos desenvolvedores do Gamer Alerta!"
                          });
                          setNotifications(prev => [{
                            id: Date.now().toString(),
                            title: "🧪 FEEDBACK ENVIADO!",
                            body: `Tipo: ${betaFeedbackType}. Agradecemos sua colaboração na nossa versão beta!`,
                            time: "Agora",
                            type: "news",
                            read: false
                          }, ...prev]);
                          setTimeout(() => setPushBanner(null), 4500);
                        }}
                        className="w-full py-1.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-[10px] font-extrabold rounded-lg shadow-sm transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-1"
                      >
                        Enviar Feedback <Send className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Logout / Login Button */}
              {user?.email === "visitante@gameralerta.com.br" ? (
                <button 
                  onClick={() => {
                    setUser(null);
                    setEmailInput("");
                    setPasswordInput("");
                    setCurrentScreen("login");
                  }}
                  className="w-full py-2.5 rounded-lg bg-brand-blue/15 hover:bg-brand-blue/25 text-[#2563EB] border border-[#2563EB]/30 text-xs font-bold flex items-center justify-center gap-1.5 mt-2 transition-all active:scale-98 cursor-pointer"
                >
                  <User className="w-4 h-4" /> Cadastrar ou Entrar em uma Conta
                </button>
              ) : (
                <button 
                  onClick={handleLogout}
                  className="w-full py-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 text-xs font-bold flex items-center justify-center gap-1.5 mt-2 transition-all active:scale-98 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" /> Sair da Conta (FCM Offline)
                </button>
              )}
            </div>
          )}

          {/* ----------------- BOTTOM NAVIGATION BAR ----------------- */}
          <div className={`flex justify-around items-center py-2 border-t ${appTheme === "dark" ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200"} shrink-0 z-20`}>
            
            <button 
              onClick={() => { setSelectedNews(null); setActiveTab("home"); }}
              className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === "home" ? "text-brand-blue" : "text-slate-500 hover:text-slate-300"}`}
            >
              <Home className="w-5 h-5" />
              <span>Início</span>
            </button>

            <button 
              onClick={() => { setSelectedNews(null); setActiveTab("deals"); }}
              className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === "deals" ? "text-brand-blue" : "text-slate-500 hover:text-slate-300"}`}
            >
              <Tag className="w-5 h-5" />
              <span>Promoções</span>
            </button>

            <button 
              onClick={() => { setSelectedNews(null); setActiveTab("coupons"); }}
              className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === "coupons" ? "text-brand-blue" : "text-slate-500 hover:text-slate-300"}`}
            >
              <Ticket className="w-5 h-5" />
              <span>Cupons</span>
            </button>

            <button 
              onClick={() => { setSelectedNews(null); setActiveTab("news"); }}
              className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === "news" ? "text-brand-blue" : "text-slate-500 hover:text-slate-300"}`}
            >
              <Newspaper className="w-5 h-5" />
              <span>Notícias</span>
            </button>

            <button 
              onClick={() => { setSelectedNews(null); setActiveTab("favorites"); }}
              className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === "favorites" ? "text-brand-blue" : "text-slate-500 hover:text-slate-300"}`}
            >
              <Heart className="w-5 h-5" />
              <span>Favoritos</span>
            </button>

            <button 
              onClick={() => { setSelectedNews(null); setActiveTab("profile"); }}
              className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === "profile" ? "text-brand-blue" : "text-slate-500 hover:text-slate-300"}`}
            >
              <User className="w-5 h-5" />
              <span>Perfil</span>
            </button>
          </div>

        </div>
      )}

      {/* ----------------- DIALOG SHEET: PRICE ALERT CREATOR ----------------- */}
      {activeAlertModal && (
        <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-end">
          <div className="w-full bg-slate-900 border-t border-slate-800 rounded-t-3xl p-5 space-y-4 animate-slide-up text-slate-100">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm font-display flex items-center gap-1.5 text-brand-orange">
                <Bell className="w-4 h-4 animate-bounce" /> Criar Alerta de Preço
              </h4>
              <button 
                onClick={() => setActiveAlertModal(null)} 
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-3 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/40">
              <img src={activeAlertModal.imageUrl} alt={activeAlertModal.title} className="w-12 h-12 object-cover rounded" />
              <div className="min-w-0">
                <p className="font-bold text-xs truncate">{activeAlertModal.title}</p>
                <p className="text-[10px] text-slate-400">
                  Plataforma: <span className="text-brand-blue font-bold">{activeAlertModal.platform}</span>
                </p>
                <p className="text-[10px] text-brand-orange font-bold">Preço Atual: R$ {activeAlertModal.currentPrice.toFixed(2)}</p>
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-extrabold tracking-wider text-slate-400 mb-1.5">
                Preço-alvo para Alerta (R$)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-400">R$</span>
                <input 
                  type="number" 
                  step="0.01"
                  placeholder="Ex: 120.00" 
                  value={customAlertPrice}
                  onChange={(e) => setCustomAlertPrice(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 focus:border-brand-orange outline-none rounded-lg text-xs font-bold text-white"
                />
              </div>
              <p className="text-[9px] text-slate-500 mt-1">
                Enviaremos uma notificação push quando o valor cair abaixo deste limite.
              </p>
            </div>

            <button 
              onClick={handleSavePriceAlert}
              className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white py-2.5 rounded-lg text-xs font-bold transition-colors"
            >
              Confirmar Alerta
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
