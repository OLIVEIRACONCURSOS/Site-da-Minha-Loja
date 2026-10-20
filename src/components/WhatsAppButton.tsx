import React, { useState } from 'react';
import { MessageCircle, X, HelpCircle, BookOpen, CreditCard, ShieldAlert } from 'lucide-react';

interface WhatsAppButtonProps {
  contexto?: 'geral' | 'curso' | 'pedido' | 'suporte';
  nomeCurso?: string;
  numeroPedido?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  contexto = 'geral',
  nomeCurso = '',
  numeroPedido = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '5571992747496';

  const getMessage = (type: string) => {
    switch (type) {
      case 'curso':
        return encodeURIComponent(`Olá! Tenho interesse no curso ${nomeCurso || 'da Oliveira Concursos'}. Gostaria de receber mais informações.`);
      case 'pedido':
        return encodeURIComponent(`Olá! Gostaria de confirmar o pagamento do pedido ${numeroPedido || 'recente'}, referente aos cursos da Oliveira Concursos.`);
      case 'suporte':
        return encodeURIComponent(`Olá! Sou aluno da Oliveira Concursos e preciso de ajuda com meu acesso/suporte.`);
      default:
        return encodeURIComponent('Olá! Visitei o site da Oliveira Concursos e gostaria de tirar dúvidas sobre os cursos preparatórios.');
    }
  };

  const handleWhatsAppClick = (type: string = contexto) => {
    const msg = getMessage(type);
    window.open(`https://wa.me/${phoneNumber}?text=${msg}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Modal / Menu de opções ao abrir */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden animate-fadeIn">
          <div className="bg-[#071A33] text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <div>
                <h4 className="font-bold text-sm">Suporte Oliveira Concursos</h4>
                <p className="text-xs text-[#D4AF37]">Atendimento via WhatsApp</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-3 bg-[#F3F5F8] text-xs text-gray-600 border-b">
            Escolha o assunto desejado para iniciar o atendimento imediato:
          </div>

          <div className="p-2 space-y-1">
            <button
              onClick={() => handleWhatsAppClick('curso')}
              className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#F3F5F8] flex items-center space-x-3 text-sm text-[#071A33] transition-colors"
            >
              <BookOpen className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span className="font-medium">Dúvidas sobre Cursos</span>
            </button>

            <button
              onClick={() => handleWhatsAppClick('pedido')}
              className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#F3F5F8] flex items-center space-x-3 text-sm text-[#071A33] transition-colors"
            >
              <CreditCard className="w-4 h-4 text-green-600 shrink-0" />
              <span className="font-medium">Enviar Comprovante / Pix</span>
            </button>

            <button
              onClick={() => handleWhatsAppClick('suporte')}
              className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#F3F5F8] flex items-center space-x-3 text-sm text-[#071A33] transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-[#071A33] shrink-0" />
              <span className="font-medium">Suporte ao Aluno / Acesso</span>
            </button>
          </div>

          <div className="p-3 bg-gray-50 border-t text-center">
            <span className="text-[11px] text-gray-500">
              WhatsApp Oficial: (71) 99274-7496
            </span>
          </div>
        </div>
      )}

      {/* Botão flutuante principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400/50"
        aria-label="Abrir WhatsApp da Oliveira Concursos"
      >
        <MessageCircle className="w-7 h-7 text-white" />
        <span className="absolute right-full mr-3 bg-[#071A33] text-white text-xs px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none font-medium border border-[#D4AF37]/30">
          Fale Conosco no WhatsApp
        </span>
      </button>
    </div>
  );
};
