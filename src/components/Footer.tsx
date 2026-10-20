import React from 'react';
import { Scale, BookOpen, ShieldCheck, FileText, Phone, Mail, MessageCircle, ArrowRight, ExternalLink } from 'lucide-react';
import logoImage from '../assets/uploads/1792467358561-0-Emblema-Dourado-da-Oliveira-Concursos.png';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#071A33] text-white border-t border-[#D4AF37]/30">
      {/* Canal de Promoções Banner no Rodapé */}
      <div className="bg-gradient-to-r from-[#071A33] via-[#0b274e] to-[#071A33] border-b border-[#D4AF37]/20 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold font-serif text-[#D4AF37]">Quer economizar na sua preparação?</h4>
              <p className="text-sm text-gray-300">Entre no nosso canal oficial e acompanhe as ofertas da Oliveira Concursos!</p>
            </div>
          </div>
          <a
            href="https://whatsapp.com/channel/0029VbDUiPKG8l5Fs1V8rh0w"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl shrink-0"
          >
            <span>ENTRAR NO CANAL DE PROMOÇÕES</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Conteúdo Principal do Rodapé */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Coluna 1: Marca e Slogan */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <img src={logoImage} alt="Oliveira Concursos" className="w-12 h-12 object-contain rounded-lg border border-[#D4AF37]/40" />
            <div>
              <span className="font-serif font-bold text-lg text-white block tracking-wide">OLIVEIRA</span>
              <span className="text-xs tracking-widest text-[#D4AF37] uppercase font-semibold block">CONCURSOS</span>
            </div>
          </div>
          <p className="text-sm text-gray-300 italic">
            “Sua aprovação começa aqui!”
          </p>
          <p className="text-xs text-gray-400">
            Conhecimento que prepara. Oportunidades que transformam a sua carreira jurídica e profissional.
          </p>
        </div>

        {/* Coluna 2: Links Rápidos */}
        <div className="space-y-4">
          <h3 className="text-md font-serif font-bold text-[#D4AF37] uppercase tracking-wider border-b border-[#D4AF37]/20 pb-2">
            Navegação
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-[#D4AF37] transition-colors">
                Início
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('catalog')} className="hover:text-[#D4AF37] transition-colors">
                Catálogo de Cursos OAB & Concursos
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('catalog')} className="hover:text-[#D4AF37] transition-colors">
                Ofertas Especiais
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('support')} className="hover:text-[#D4AF37] transition-colors">
                Central de Suporte
              </button>
            </li>
          </ul>
        </div>

        {/* Coluna 3: Institucional & Políticas */}
        <div className="space-y-4">
          <h3 className="text-md font-serif font-bold text-[#D4AF37] uppercase tracking-wider border-b border-[#D4AF37]/20 pb-2">
            Institucional
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <button onClick={() => onNavigate('terms')} className="hover:text-[#D4AF37] transition-colors">
                Termos de Uso
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('privacy')} className="hover:text-[#D4AF37] transition-colors">
                Política de Privacidade (LGPD)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('faq')} className="hover:text-[#D4AF37] transition-colors">
                Perguntas Frequentes (FAQ)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('admin')} className="text-gray-400 hover:text-[#D4AF37] text-xs transition-colors">
                Painel Administrativo
              </button>
            </li>
          </ul>
        </div>

        {/* Coluna 4: Contato */}
        <div className="space-y-4">
          <h3 className="text-md font-serif font-bold text-[#D4AF37] uppercase tracking-wider border-b border-[#D4AF37]/20 pb-2">
            Atendimento
          </h3>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>WhatsApp: +55 71 99274-7496</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>suporte@oliveiraconcursos.com.br</span>
            </div>
            <div className="pt-2">
              <a
                href="https://wa.me/5571992747496?text=Olá!%20Vim%20pelo%20site%20da%20Oliveira%20Concursos%20e%20gostaria%20de%20atendimento."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#071A33] font-bold px-4 py-2 rounded-lg text-xs hover:bg-[#c29e2f] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Falar com Atendimento
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#051326] border-t border-gray-800 py-6 text-center text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} OLIVEIRA CONCURSOS — Todos os direitos reservados.</p>
          <p className="text-[#D4AF37] font-medium">
            “Sua aprovação começa aqui!”
          </p>
        </div>
      </div>
    </footer>
  );
};
