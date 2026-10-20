import React, { useState } from 'react';
import { Search, ShoppingCart, User as UserIcon, Menu, X, MessageCircle, Shield, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/uploads/1792467358561-0-Emblema-Dourado-da-Oliveira-Concursos.png';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  cartItemCount: number;
  onOpenAuthModal: (mode: 'login' | 'register') => void;
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  cartItemCount,
  onOpenAuthModal,
  onOpenCart,
  searchQuery,
  setSearchQuery
}) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentView('catalog');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#071A33] text-white shadow-lg border-b border-[#D4AF37]/30">
      {/* Top Bar / Anúncio institucional */}
      <div className="bg-[#051326] px-4 py-1.5 text-xs text-center md:flex md:justify-between md:px-8 border-b border-[#D4AF37]/10">
        <div className="flex items-center justify-center md:justify-start gap-2 text-[#D4AF37] font-medium">
          <span>⚖️</span>
          <span>OLIVEIRA CONCURSOS — Sua aprovação começa aqui!</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-gray-300">
          <span>WhatsApp Comercial: (71) 99274-7496</span>
          <a 
            href="https://whatsapp.com/channel/0029VbDUiPKG8l5Fs1V8rh0w" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#D4AF37] hover:underline flex items-center gap-1 font-semibold"
          >
            <MessageCircle className="w-3.5 h-3.5" /> Canal Oficial de Promoções
          </a>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentView('home')}
          >
            <img 
              src={logoImg} 
              alt="Oliveira Concursos"
              className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-full border-2 border-[#D4AF37] shadow-md group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white block">
                OLIVEIRA <span className="text-[#D4AF37]">CONCURSOS</span>
              </span>
              <span className="text-[10px] sm:text-xs text-[#D4AF37] tracking-widest font-semibold block uppercase">
                Sua Aprovação Começa Aqui!
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            <button 
              onClick={() => setCurrentView('home')}
              className={`text-sm font-medium transition-colors hover:text-[#D4AF37] ${currentView === 'home' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1' : 'text-white'}`}
            >
              Início
            </button>
            <button 
              onClick={() => setCurrentView('catalog')}
              className={`text-sm font-medium transition-colors hover:text-[#D4AF37] ${currentView === 'catalog' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1' : 'text-white'}`}
            >
              Cursos & Catálogo
            </button>
            <button 
              onClick={() => setCurrentView('offers')}
              className={`text-sm font-medium transition-colors hover:text-[#D4AF37] ${currentView === 'offers' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1' : 'text-white'}`}
            >
              Ofertas OAB
            </button>
            <button 
              onClick={() => setCurrentView('faq')}
              className={`text-sm font-medium transition-colors hover:text-[#D4AF37] ${currentView === 'faq' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1' : 'text-white'}`}
            >
              Dúvidas
            </button>
            <button 
              onClick={() => setCurrentView('support')}
              className={`text-sm font-medium transition-colors hover:text-[#D4AF37] ${currentView === 'support' ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1' : 'text-white'}`}
            >
              Suporte
            </button>
          </nav>

          {/* Search, Cart & Auth Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Bar Desktop */}
            <form onSubmit={handleSearchSubmit} className="hidden xl:flex items-center relative">
              <input 
                type="text"
                placeholder="Buscar cursos, OAB, editais..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#051326] text-sm text-white placeholder-gray-400 px-4 py-2 pl-9 rounded-full border border-[#D4AF37]/30 focus:outline-none focus:border-[#D4AF37] w-56 transition-all"
              />
              <Search className="w-4 h-4 text-[#D4AF37] absolute left-3 top-2.5" />
            </form>

            {/* Cart Button */}
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-white hover:text-[#D4AF37] transition-colors rounded-full hover:bg-white/5"
              aria-label="Carrinho de compras"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#071A33] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Account / Auth */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView(isAdmin ? 'admin' : 'student')}
                  className="flex items-center gap-2 bg-[#051326] border border-[#D4AF37]/40 px-3 py-1.5 rounded-full hover:border-[#D4AF37] transition-colors"
                >
                  <UserIcon className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs font-medium text-white max-w-[100px] truncate">
                    {user?.nome.split(' ')[0]}
                  </span>
                </button>
                {isAdmin && (
                  <button 
                    onClick={() => setCurrentView('admin')}
                    className="hidden sm:flex items-center gap-1 bg-[#D4AF37] text-[#071A33] px-3 py-1.5 rounded-full text-xs font-bold hover:bg-[#c39f2f] transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5" /> Painel
                  </button>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <button 
                  onClick={() => onOpenAuthModal('login')}
                  className="text-sm font-medium text-white hover:text-[#D4AF37] px-3 py-2 transition-colors"
                >
                  Entrar
                </button>
                <button 
                  onClick={() => onOpenAuthModal('register')}
                  className="bg-[#D4AF37] text-[#071A33] font-bold text-sm px-4 py-2 rounded-full hover:bg-[#c39f2f] transition-all shadow-md"
                >
                  Criar minha conta
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-[#D4AF37]"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#051326] border-t border-[#D4AF37]/20 px-4 pt-4 pb-6 space-y-4 animate-fadeIn">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input 
              type="text"
              placeholder="O que você deseja estudar hoje?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#071A33] text-sm text-white placeholder-gray-400 px-4 py-2.5 pl-9 rounded-lg border border-[#D4AF37]/30 focus:outline-none focus:border-[#D4AF37]"
            />
            <Search className="w-4 h-4 text-[#D4AF37] absolute left-3 top-3.5" />
          </form>

          <nav className="flex flex-col space-y-3">
            <button 
              onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
              className="text-left text-sm font-medium py-2 px-3 rounded hover:bg-white/5 text-white"
            >
              Início
            </button>
            <button 
              onClick={() => { setCurrentView('catalog'); setMobileMenuOpen(false); }}
              className="text-left text-sm font-medium py-2 px-3 rounded hover:bg-white/5 text-white"
            >
              Catálogo de Cursos
            </button>
            <button 
              onClick={() => { setCurrentView('offers'); setMobileMenuOpen(false); }}
              className="text-left text-sm font-medium py-2 px-3 rounded hover:bg-white/5 text-[#D4AF37]"
            >
              Ofertas Especiais OAB
            </button>
            <button 
              onClick={() => { setCurrentView('faq'); setMobileMenuOpen(false); }}
              className="text-left text-sm font-medium py-2 px-3 rounded hover:bg-white/5 text-white"
            >
              Perguntas Frequentes
            </button>
            <button 
              onClick={() => { setCurrentView('support'); setMobileMenuOpen(false); }}
              className="text-left text-sm font-medium py-2 px-3 rounded hover:bg-white/5 text-white"
            >
              Central de Suporte
            </button>
          </nav>

          {!isAuthenticated ? (
            <div className="pt-4 border-t border-[#D4AF37]/20 flex flex-col gap-2">
              <button 
                onClick={() => { onOpenAuthModal('login'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 text-center text-sm font-medium text-white border border-[#D4AF37]/40 rounded-lg"
              >
                Entrar
              </button>
              <button 
                onClick={() => { onOpenAuthModal('register'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 text-center text-sm font-bold bg-[#D4AF37] text-[#071A33] rounded-lg"
              >
                Criar minha conta
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-[#D4AF37]/20 flex flex-col gap-2">
              <button 
                onClick={() => { setCurrentView(isAdmin ? 'admin' : 'student'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 text-center text-sm font-bold bg-[#D4AF37] text-[#071A33] rounded-lg"
              >
                {isAdmin ? 'Painel Administrativo' : 'Área do Aluno'}
              </button>
              <button 
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="w-full py-2 text-center text-xs text-red-400 hover:underline"
              >
                Encerrar Sessão
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
