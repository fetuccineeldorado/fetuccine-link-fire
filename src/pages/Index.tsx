import { useState, useEffect } from "react";
import logoFetuccine from "@/assets/logo-fetuccine.png";
import pastaBackground from "@/assets/pasta-background.jpg";
import { ExternalLink, MapPin, Instagram, MessageCircle, UtensilsCrossed } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);

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
      icon: <UtensilsCrossed className="w-5 h-5 text-[#FF6B35]" />,
      duration: 5500,
    });
  };

  useEffect(() => {
    document.body.style.fontFamily = "'Roboto', sans-serif";
    
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
      <section className="relative z-10 w-full max-w-md mx-auto px-4 py-8 flex flex-col items-center justify-center animate-fade-in">
        {/* Logo */}
        <header className="mb-8 animate-scale-in">
          <img 
            src={logoFetuccine} 
            alt="Logo Fetuccine Eldorado - A sua casa de massas"
            className="w-48 md:w-72 h-auto rounded-2xl shadow-2xl"
            loading="eager"
          />
        </header>

        {/* Title and Description */}
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-primary drop-shadow-lg">
            Fetuccine Eldorado
          </h1>
          <p className="text-xl md:text-2xl text-white font-normal drop-shadow-md">
            Delícias italianas ao seu alcance! Peça agora e saboreie.
          </p>
        </div>

        {/* Link Buttons */}
        <nav className="w-full space-y-4 mb-8" aria-label="Links principais">
          {links.map((link, index) => {
            const Icon = link.icon;
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
                onFocus={() => setHoveredButton(index)}
                onBlur={() => setHoveredButton(null)}
              >
                <div
                  className={`
                    flex items-center justify-center gap-3
                    px-6 py-4 rounded-full
                    text-primary-foreground font-bold text-base md:text-lg
                    transition-all duration-300 ease-out
                    focus:outline-none focus:ring-4 focus:ring-primary/50
                    ${hoveredButton === index 
                      ? 'bg-gradient-hover shadow-button-hover scale-105' 
                      : 'bg-gradient-primary shadow-button scale-100'
                    }
                  `}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                  <span>{link.text}</span>
                  <ExternalLink className="w-4 h-4 ml-auto" aria-hidden="true" />
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
