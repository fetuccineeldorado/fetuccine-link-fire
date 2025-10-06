import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface GuidedTourProps {
  isActive: boolean;
  currentStep: number;
  onSkip: () => void;
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
    title: "Tour Concluído!",
    description: "🍝 Escolha uma opção acima e aproveite!"
  }
];

export const GuidedTour = ({ isActive, currentStep, onSkip }: GuidedTourProps) => {
  if (!isActive) return null;

  const isFinalStep = currentStep === 4;

  return (
    <>
      {/* Overlay Escurecido */}
      <div 
        className="fixed inset-0 bg-black/75 z-40 animate-fade-in pointer-events-auto backdrop-blur-[2px]"
        aria-hidden="true"
      />

      {/* Modal de Descrição */}
      <div 
        className={`fixed z-50 animate-scale-in ${
          isFinalStep 
            ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' 
            : 'left-1/2 -translate-x-1/2'
        }`}
        style={
          !isFinalStep 
            ? { top: `calc(${280 + currentStep * 88}px + 5rem)` } 
            : undefined
        }
      >
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-7 max-w-sm mx-4 relative border border-white/50">
          {/* Botão Pular Tour */}
          <button
            onClick={onSkip}
            className="absolute top-4 right-4 p-2 hover:bg-primary/10 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Pular tour"
          >
            <X className="w-5 h-5 text-primary" />
          </button>

          {/* Conteúdo */}
          <div className="pr-8">
            <h3 className="font-playfair text-2xl font-bold text-primary mb-3">
              {tourSteps[currentStep].title}
            </h3>
            <p className="font-montserrat text-gray-700 mb-5 leading-relaxed">
              {tourSteps[currentStep].description}
            </p>
            
            {/* Indicador de Progresso */}
            {!isFinalStep && (
              <div className="flex items-center gap-2 justify-center mt-4">
                {[0, 1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`h-2 rounded-full transition-all ${
                      step === currentStep 
                        ? 'w-8 bg-primary' 
                        : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const useGuidedTour = () => {
  const [tourActive, setTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);

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

    // Progressão automática a cada 4 segundos
    const interval = setInterval(() => {
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

    return () => clearInterval(interval);
  }, [tourActive]);

  const completeTour = () => {
    localStorage.setItem("fetuccine_tour_completed", "true");
    setTourActive(false);
    setTourStep(0);
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
  };
};
