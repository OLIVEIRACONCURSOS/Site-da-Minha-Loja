import React from 'react';
import { MessageSquare, ExternalLink, Sparkles } from 'lucide-react';

export const PromoChannelBanner: React.FC = () => {
  const channelUrl = 'https://whatsapp.com/channel/0029VbDUiPKG8l5Fs1V8rh0w';

  return (
    <div className="bg-gradient-to-r from-[#071A33] via-[#0d264c] to-[#071A33] text-white py-10 px-4 sm:px-6 lg:px-8 border-y-2 border-[#D4AF37] shadow-xl relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-10 -top-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-start space-x-4 text-center md:text-left">
          <div className="bg-green-600 p-3.5 rounded-2xl shadow-lg border border-[#D4AF37]/50 hidden sm:flex items-center justify-center shrink-0">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-[#D4AF37]/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Canal Oficial de Promoções</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
              Quer economizar na sua preparação?
            </h3>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl">
              Entre no nosso canal oficial e acompanhe as ofertas exclusivas, descontos imperdíveis e novidades da <strong className="text-[#D4AF37]">Oliveira Concursos</strong>. Sua aprovação começa aqui!
            </p>
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto flex justify-center">
          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center space-x-3 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 border border-green-500 text-center"
          >
            <MessageSquare className="w-5 h-5 text-white" />
            <span className="tracking-wide">ENTRAR NO CANAL DE PROMOÇÕES</span>
            <ExternalLink className="w-4 h-4 ml-1 text-green-200" />
          </a>
        </div>
      </div>
    </div>
  );
};
