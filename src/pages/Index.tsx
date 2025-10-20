import { useState, useEffect } from "react";
import logoFetuccine from "@/assets/logo-fetuccine.png";
import pastaBackground from "@/assets/pasta-background.jpg";
import { ExternalLink, MapPin, Instagram, MessageCircle, UtensilsCrossed, Tag, Download, X, Smartphone } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const [showCoupon, setShowCoupon] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  const clientNames = [
    "Maria Silva", "João Santos", "Ana Costa", "Pedro Oliveira", "Juliana Alves",
    "Carlos Mendes", "Fernanda Lima", "Ricardo Souza", "Camila Rodrigues", "Bruno Ferreira",
    "Patrícia Martins", "Lucas Pereira", "Mariana Rocha", "Gabriel Costa", "Amanda Barbosa",
    "Rafael Dias", "Beatriz Cardoso", "Thiago Araújo", "Larissa Gomes", "Felipe Ribeiro",
    "Renata Carvalho", "Eduardo Cunha", "Vanessa Monteiro", "Rodrigo Azevedo", "Gabriela Nunes"
  ];

  const dishes = [
    "Fettuccine Alfredo", "Lasanha à Bolonhesa", "Ravioli de Queijo", "Carbonara",
    "Penne ao Molho Pesto", "Nhoque ao Sugo", "Spaghetti à Matriciana", "Rigatoni Quatro Queijos",
    "Tortellini de Carne", "Tagliatelle ao Funghi", "Pappardelle ao Ragu", "Agnolotti de Ricota",
    "Fettuccine ao Molho Rosé", "Fusilli Primavera", "Capeletti ao Molho Branco"
  ];

  const getRandomItem = <T,>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const showOrderNotification = () => {
    const clientName = getRandomItem(clientNames);
    const dish = getRandomItem(dishes);
    
    toast(clientName, {
      description: `acabou de pedir ${dish}!`,
      icon: <UtensilsCrossed className="w-4 h-4 text-[#FF6B35]" />,
      duration: 4000,
    });
  };

  // Função para instalar PWA
  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`PWA install prompt outcome: ${outcome}`);
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  // Função para detectar se é mobile
  const checkIsMobile = () => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
  };

  useEffect(() => {
    document.body.style.fontFamily = "'Montserrat', sans-serif";
    
    // Detectar se é mobile
    setIsMobile(checkIsMobile());
    
    // Configurar PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Mostrar prompt após 5 segundos se for mobile
      if (checkIsMobile()) {
        setTimeout(() => {
          setShowInstallPrompt(true);
        }, 5000);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Primeira notificação após 3-5 segundos
    const initialDelay = setTimeout(() => {
      showOrderNotification();
    }, 3000 + Math.random() * 2000);

    // Notificações subsequentes a cada 20 segundos
    const interval = setInterval(() => {
      showOrderNotification();
    }, 20000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const couponTimer = setTimeout(() => {
      setShowCoupon(true);
    }, 2000);
    
    return () => clearTimeout(couponTimer);
  }, []);

  const links = [
    {
      icon: UtensilsCrossed,
      text: "Cardápio Online - Delivery",
      url: "https://growmoneydigital.com.br/fetuccine/cardapio",
      ariaLabel: "Acessar cardápio online para delivery"
    },
    {
      icon: MessageCircle,
      text: "Peça pelo nosso WhatsApp",
      url: "https://wa.me/556292268934?text=Ol%C3%A1%2C%20quero%20fazer%20um%20pedido%21",
      ariaLabel: "Fazer pedido via WhatsApp"
    },
    {
      icon: MapPin,
      text: "Localização",
      url: "https://maps.app.goo.gl/jBnNHcUueJtmS8iq7",
      ariaLabel: "Ver localização no Google Maps"
    },
    {
      icon: Instagram,
      text: "Instagram",
      url: "https://www.instagram.com/fetuccineeldorado/",
      ariaLabel: "Seguir no Instagram"
    }
  ];

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url(${pastaBackground})`,
        }}
        role="img"
        aria-label="Fundo com imagem de macarronada italiana"
      >
        <div 
          className="absolute inset-0 bg-black/40"
          aria-hidden="true"
        />
      </div>

      {/* PWA Install Prompt */}
      {showInstallPrompt && (
        <div className="fixed top-4 left-4 right-4 z-50 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 animate-slide-down">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-montserrat font-semibold text-gray-900 text-sm">
                  Instalar App
                </h3>
                <p className="font-montserrat text-xs text-gray-600">
                  Acesse mais rápido pelo celular
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleInstallClick}
                className="px-3 py-1.5 bg-gradient-to-r from-primary to-secondary text-white text-xs font-montserrat font-medium rounded-lg hover:scale-105 transition-transform"
              >
                Instalar
              </button>
              <button
                onClick={() => setShowInstallPrompt(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Container */}
      <section className="relative z-10 w-full max-w-md mx-auto px-4 py-8 sm:py-12 flex flex-col items-center justify-center animate-fade-in">
        {/* Logo */}
        <header className="mb-4 sm:mb-6">
          <div className="relative">
            <img 
              src={logoFetuccine} 
              alt="Logo Fetuccine Eldorado - A sua casa de massas"
              className="w-28 sm:w-32 md:w-40 h-auto rounded-2xl shadow-lg"
              loading="eager"
            />
          </div>
        </header>

        {/* Title and Description */}
        <div className="text-center mb-6 sm:mb-8 space-y-2">
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-primary drop-shadow-lg tracking-tight">
            Fetuccine Eldorado
          </h1>
          <p className="font-montserrat text-sm sm:text-base md:text-lg text-white font-light drop-shadow-md">
            Delícias italianas ao seu alcance
          </p>
        </div>

        {/* Link Buttons */}
        <nav className="w-full space-y-3 sm:space-y-4 mb-6 sm:mb-8" aria-label="Links principais">
          {links.map((link, index) => {
            const Icon = link.icon;
            
            // Definir cores específicas para cada botão
            const getButtonStyles = (buttonIndex: number) => {
              const styles = [
                // Botão 0 - Cardápio (Verde com transparência)
                {
                  bg: 'bg-emerald-500/20',
                  hover: 'hover:bg-emerald-500/30',
                  active: 'active:bg-emerald-500/40',
                  border: 'border-emerald-400/30',
                  shadow: 'shadow-emerald-500/20',
                  hoverShadow: 'hover:shadow-emerald-500/30'
                },
                // Botão 1 - WhatsApp (Verde WhatsApp)
                {
                  bg: 'bg-green-500/20',
                  hover: 'hover:bg-green-500/30',
                  active: 'active:bg-green-500/40',
                  border: 'border-green-400/30',
                  shadow: 'shadow-green-500/20',
                  hoverShadow: 'hover:shadow-green-500/30'
                },
                // Botão 2 - Localização (Azul)
                {
                  bg: 'bg-blue-500/20',
                  hover: 'hover:bg-blue-500/30',
                  active: 'active:bg-blue-500/40',
                  border: 'border-blue-400/30',
                  shadow: 'shadow-blue-500/20',
                  hoverShadow: 'hover:shadow-blue-500/30'
                },
                // Botão 3 - Instagram (Rosa/Instagram)
                {
                  bg: 'bg-pink-500/20',
                  hover: 'hover:bg-pink-500/30',
                  active: 'active:bg-pink-500/40',
                  border: 'border-pink-400/30',
                  shadow: 'shadow-pink-500/20',
                  hoverShadow: 'hover:shadow-pink-500/30'
                }
              ];
              return styles[buttonIndex] || styles[0];
            };

            const buttonStyles = getButtonStyles(index);
            
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className="block w-full"
                onMouseEnter={() => setHoveredButton(index)}
                onMouseLeave={() => setHoveredButton(null)}
                style={{
                  animation: `fade-in 0.6s ease-out ${index * 0.1}s backwards`
                }}
              >
                <div
                  className={`
                    flex items-center justify-center gap-3
                    px-4 sm:px-6 py-4 sm:py-3 rounded-xl
                    font-montserrat text-white font-medium text-sm sm:text-base
                    ${buttonStyles.bg} backdrop-blur-sm
                    ${buttonStyles.hover} ${buttonStyles.active}
                    transition-all duration-200
                    hover:scale-[1.02] active:scale-[0.98]
                    touch-manipulation
                    border ${buttonStyles.border}
                    shadow-lg ${buttonStyles.shadow} ${buttonStyles.hoverShadow}
                  `}
                >
                  <Icon className="w-5 h-5 sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
                  <span className="text-center">{link.text}</span>
                </div>
              </a>
            );
          })}
        </nav>

        {/* Footer */}
        <footer className="text-center mt-auto pt-6 sm:pt-8">
          <p className="text-xs sm:text-sm md:text-base text-gray-300 drop-shadow-md">
            Copyright 2025 - Fetuccine Eldorado
          </p>
        </footer>
      </section>

      {/* Floating Coupon Alert */}
      {showCoupon && (
        <a
          href="https://growmoneydigital.com.br/fetuccine/cardapio"
          target="_blank"
          rel="noopener noreferrer"
          className="
            fixed bottom-16 right-4 sm:bottom-20 sm:right-6
            z-40
            flex flex-col items-center justify-center
            w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24
            bg-gradient-to-br from-primary to-secondary
            rounded-full
            shadow-lg hover:shadow-2xl
            transition-all duration-300
            hover:scale-110 active:scale-95
            cursor-pointer
            animate-[slide-in-right_0.5s_ease-out,pulse_2s_ease-in-out_infinite]
            touch-manipulation
          "
          aria-label="Cupom de 10% de desconto - Clique para acessar o cardápio"
        >
          <Tag className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white mb-0.5 sm:mb-1" />
          <div className="flex flex-col items-center">
            <span className="text-[8px] sm:text-[10px] md:text-xs text-white/90 font-montserrat font-medium leading-tight">
              CUPOM
            </span>
            <span className="text-xs sm:text-sm md:text-base text-white font-montserrat font-bold leading-tight">
              10% OFF
            </span>
          </div>
        </a>
      )}
    </main>
  );
};

export default Index;
