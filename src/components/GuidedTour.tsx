import { useState, useEffect } from "react";
import { X } from "lucide-react";
import logoFetuccine from "@/assets/logo-fetuccine.png";
import pastaBackground from "@/assets/pasta-background.jpg";

interface GuidedTourProps {
  isActive: boolean;
  currentStep: number;
  onSkip: () => void;
  timeLeft: number;
}

const tourSteps = [
  {
    title: "Cardápio Online",
    description: "Aqui você acessa nosso cardápio completo e faz pedidos para delivery"
  },
  {
    title: "WhatsApp",
    description: "Prefere WhatsApp? Fale diretamente conosco e faça seu pedido"
  },
  {
    title: "Localização",
    description: "Veja nossa localização e venha nos visitar pessoalmente"
  },
  {
    title: "Instagram",
    description: "Siga-nos no Instagram para novidades, promoções e fotos deliciosas"
  },
  {
    title: "Tour Concluído! 🍝",
    description: "Escolha uma opção e aproveite nossas delícias italianas!"
  }
];

export const GuidedTour = ({ isActive, currentStep, onSkip, timeLeft }: GuidedTourProps) => {
  if (!isActive) return null;

  const isFinalStep = currentStep === 4;
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (circumference * (4 - timeLeft)) / 4;

  return (
    <div className="fixed inset-0 z-50 animate-fade-in">
      {/* Background com imagem de macarronada */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${pastaBackground})`,
        }}
        role="img"
        aria-label="Fundo com imagem de macarronada italiana"
      >
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      </div>

      {/* Botão Pular Tour */}
      <button
        onClick={onSkip}
        className="absolute top-8 right-8 z-10 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-montserrat text-sm transition-all backdrop-blur-sm"
        aria-label="Pular tour"
      >
        Pular Tour
      </button>

      {/* Conteúdo Centralizado */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 animate-scale-in">
        {/* Logo */}
        <img 
          src={logoFetuccine} 
          alt="Logo Fetuccine Eldorado"
          className="w-32 md:w-40 mb-8 rounded-2xl"
        />

        {/* Título */}
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          {tourSteps[currentStep].title}
        </h2>

        {/* Descrição */}
        <p className="font-montserrat text-lg md:text-xl text-white/90 mb-8 text-center max-w-2xl">
          {tourSteps[currentStep].description}
        </p>

        {/* Timer Circular */}
        {!isFinalStep && (
          <div className="mb-6">
            <svg className="w-24 h-24" viewBox="0 0 100 100">
              {/* Círculo de fundo */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="4"
                fill="none"
              />
              {/* Círculo animado */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="white"
                strokeWidth="4"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-1000 ease-linear"
                transform="rotate(-90 50 50)"
                strokeLinecap="round"
              />
              {/* Número no centro */}
              <text 
                x="50" 
                y="50" 
                textAnchor="middle" 
                dy="7" 
                className="text-2xl font-bold fill-white font-montserrat"
              >
                {timeLeft}
              </text>
            </svg>
          </div>
        )}

        {/* Indicador de Etapa */}
        {!isFinalStep && (
          <p className="font-montserrat text-sm text-white/70 mt-2">
            Etapa {currentStep + 1} de 4
          </p>
        )}
      </div>
    </div>
  );
};

export const useGuidedTour = () => {
  const [tourActive, setTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(4);

  useEffect(() => {
    // Verificar se o tour já foi completado
    const tourCompleted = localStorage.getItem("fetuccine_tour_completed");
    
    if (!tourCompleted) {
      // Iniciar tour após 1 segundo
      const startTimeout = setTimeout(() => {
        setTourActive(true);
      }, 1000);

      return () => clearTimeout(startTimeout);
    }
  }, []);

  useEffect(() => {
    if (!tourActive) return;

    // Timer de contagem regressiva (atualiza a cada segundo)
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) return prev - 1;
        return 4; // Reset para próxima etapa
      });
    }, 1000);

    // Progressão para próxima etapa após 4 segundos
    const progressTimeout = setTimeout(() => {
      setTourStep((prev) => {
        if (prev < 4) {
          return prev + 1;
        } else {
          // Tour concluído
          completeTour();
          return prev;
        }
      });
    }, 4000);

    return () => {
      clearInterval(timerInterval);
      clearTimeout(progressTimeout);
    };
  }, [tourActive, tourStep]);

  const completeTour = () => {
    localStorage.setItem("fetuccine_tour_completed", "true");
    setTourActive(false);
    setTourStep(0);
    setTimeLeft(4);
  };

  const skipTour = () => {
    completeTour();
  };

  // Fechar com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && tourActive) {
        skipTour();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [tourActive]);

  return {
    tourActive,
    tourStep,
    skipTour,
    timeLeft,
  };
};
