import { useState, useEffect } from "react";
import logoFetuccine from "@/assets/logo-fetuccine.png";
import pastaBackground from "@/assets/pasta-background.jpg";
import { ExternalLink, MapPin, Instagram, MessageCircle, UtensilsCrossed } from "lucide-react";
import { toast } from "sonner";
import { GuidedTour, useGuidedTour } from "@/components/GuidedTour";

const Index = () => {
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const { tourActive, tourStep, skipTour } = useGuidedTour();

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

  useEffect(() => {
    document.body.style.fontFamily = "'Montserrat', sans-serif";
    
    // Primeira notificação após 3-5 segundos
    const initialDelay = setTimeout(() => {
      showOrderNotification();
    }, 3000 + Math.random() * 2000);

    // Notificações subsequentes a cada 20 segundos
    const interval = setInterval(() => {
      showOrderNotification();
    }, 20000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
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
      url: "https://w.app/fetuccine",
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
      {/* Guided Tour */}
      <GuidedTour 
        isActive={tourActive} 
        currentStep={tourStep} 
        onSkip={skipTour}
      />
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

      {/* Content Container */}
      <section className="relative z-10 w-full max-w-md mx-auto px-4 py-12 flex flex-col items-center justify-center animate-fade-in">
        {/* Logo */}
        <header className="mb-6">
          <div className="relative">
            <img 
              src={logoFetuccine} 
              alt="Logo Fetuccine Eldorado - A sua casa de massas"
              className="w-32 md:w-40 h-auto rounded-2xl"
              loading="eager"
            />
          </div>
        </header>

        {/* Title and Description */}
        <div className="text-center mb-6 space-y-2">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-primary drop-shadow-lg tracking-tight">
            Fetuccine Eldorado
          </h1>
          <p className="font-montserrat text-base md:text-lg text-white font-light drop-shadow-md">
            Delícias italianas ao seu alcance
          </p>
        </div>

        {/* Link Buttons */}
        <nav className="w-full space-y-3 mb-8" aria-label="Links principais">
          {links.map((link, index) => {
            const Icon = link.icon;
            const isHighlighted = tourActive && tourStep < 4 && tourStep === index;
            
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className={`block w-full ${tourActive && tourStep < 4 && tourStep !== index ? 'pointer-events-none' : ''}`}
                onMouseEnter={() => setHoveredButton(index)}
                onMouseLeave={() => setHoveredButton(null)}
                style={{
                  animation: `fade-in 0.6s ease-out ${index * 0.1}s backwards`
                }}
              >
                <div
                  className={`
                    flex items-center justify-center gap-2
                    px-6 py-3 rounded-lg
                    font-montserrat text-white font-medium text-sm md:text-base
                    bg-white/10
                    hover:bg-white/20
                    transition-all duration-200
                    hover:scale-[1.02]
                    ${isHighlighted ? 'ring-2 ring-white/50' : ''}
                  `}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span>{link.text}</span>
                </div>
              </a>
            );
          })}
        </nav>

        {/* Footer */}
        <footer className="text-center mt-auto pt-8">
          <p className="text-sm md:text-base text-gray-300 drop-shadow-md">
            Copyright 2025 - Fetuccine Eldorado
          </p>
        </footer>
      </section>
    </main>
  );
};

export default Index;
