import React, { useState } from 'react';
import { db } from '../services/database';
import { Course } from '../types';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { 
  BookOpen, CheckCircle2, ShieldCheck, Clock, Calendar, Award, 
  FileText, Video, HelpCircle, ArrowLeft, ShoppingCart, CreditCard, Sparkles, AlertCircle
} from 'lucide-react';

interface CourseDetailProps {
  courseId: string;
  onNavigate: (page: string, params?: any) => void;
  onAddToCart: (course: Course) => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ courseId, onNavigate, onAddToCart }) => {
  const [selectedConstitutionalOption, setSelectedConstitutionalOption] = useState<'CEISC' | 'Flávia Bahia'>('CEISC');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const courses = db.getCourses();
  const course = courses.find(c => c.id === courseId) || courses[0];

  const isConstitutional = course.disciplina === 'Direito Constitucional' && course.fase === '2ª fase';

  const handleAddToCart = () => {
    onAddToCart(course);
    setSuccessMessage('Curso adicionado ao carrinho com sucesso!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleBuyNow = () => {
    onAddToCart(course);
    onNavigate('cart');
  };

  return (
    <div className="min-h-screen bg-[#F3F5F8] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Botão Voltar */}
        <button
          onClick={() => onNavigate('catalog')}
          className="inline-flex items-center space-x-2 text-[#071A33] hover:text-[#D4AF37] font-semibold mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar para o Catálogo</span>
        </button>

        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-500 text-green-800 p-4 rounded-xl flex items-center space-x-3 shadow-md animate-fadeIn">
            <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
            <span className="font-medium">{successMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal: Detalhes do Curso */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cabeçalho do Curso */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#D4AF37]/30">
              <div className="relative h-72 sm:h-96 w-full">
                <img 
                  src={course.imagem} 
                  alt={course.nome} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/90 via-[#071A33]/40 to-transparent flex items-end p-6 sm:p-8">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-[#D4AF37] text-[#071A33] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                        {course.categoria} • {course.fase}
                      </span>
                      <span className="bg-white/20 backdrop-blur-md text-white font-medium text-xs px-3 py-1 rounded-full">
                        {course.instituicaoProdutora}
                      </span>
                      {course.emPromocao && (
                        <span className="bg-green-600 text-white font-bold text-xs px-3 py-1 rounded-full">
                          Oferta Especial
                        </span>
                      )}
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2">
                      {course.nome}
                    </h1>
                    <p className="text-[#D4AF37] font-medium text-sm sm:text-base">
                      Exame / Concurso: {course.exameOuConcurso}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#071A33] mb-3">
                    Sobre a Preparação
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {course.descricao}
                  </p>
                </div>

                {/* Opção para Direito Constitucional (CEISC ou Flávia Bahia) */}
                {isConstitutional && (
                  <div className="bg-[#F3F5F8] p-5 rounded-xl border-2 border-[#D4AF37]/50">
                    <label className="block text-sm font-bold text-[#071A33] mb-2">
                      Selecione a Instituição / Professor(a) para 2ª Fase Constitucional:
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setSelectedConstitutionalOption('CEISC')}
                        className={`py-3 px-4 rounded-lg font-bold text-sm transition-all text-center border ${
                          selectedConstitutionalOption === 'CEISC'
                            ? 'bg-[#071A33] text-white border-[#D4AF37] shadow-md'
                            : 'bg-white text-[#071A33] border-gray-300 hover:border-[#D4AF37]'
                        }`}
                      >
                        CEISC
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedConstitutionalOption('Flávia Bahia')}
                        className={`py-3 px-4 rounded-lg font-bold text-sm transition-all text-center border ${
                          selectedConstitutionalOption === 'Flávia Bahia'
                            ? 'bg-[#071A33] text-white border-[#D4AF37] shadow-md'
                            : 'bg-white text-[#071A33] border-gray-300 hover:border-[#D4AF37]'
                        }`}
                      >
                        Flávia Bahia
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      * A escolha define o material específico enviado após a confirmação do pedido.
                    </p>
                  </div>
                )}

                {/* Atributos do Curso */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#071A33]/10 p-3 rounded-xl text-[#071A33]">
                      <Clock className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500">Prazo de Acesso</span>
                      <span className="font-bold text-[#071A33]">
                        {course.prazoAcessoDias ? `${course.prazoAcessoDias} dias` : 'Consulte condições'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="bg-[#071A33]/10 p-3 rounded-xl text-[#071A33]">
                      <Award className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500">Modalidade</span>
                      <span className="font-bold text-[#071A33] uppercase text-sm">
                        {course.modalidade}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="bg-[#071A33]/10 p-3 rounded-xl text-[#071A33]">
                      <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500">Plataforma</span>
                      <span className="font-bold text-[#071A33]">Área do Aluno / Drive</span>
                    </div>
                  </div>
                </div>

                {/* Conteúdo Incluído */}
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#071A33] mb-4 flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-[#D4AF37]" />
                    <span>O que está incluído neste curso:</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.conteudoIncluido.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-3 bg-[#F3F5F8] p-3 rounded-xl">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                        <span className="text-sm font-medium text-[#071A33]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Orientações de Acesso */}
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
                  <h4 className="font-bold text-[#071A33] text-sm mb-1 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Orientações para Recebimento do Acesso</span>
                  </h4>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Após a confirmação do pagamento pelo administrador, os dados de acesso e materiais em PDF / Google Drive serão liberados diretamente na sua <strong>Área do Aluno</strong> e enviados via WhatsApp cadastrado.
                  </p>
                </div>
              </div>
            </div>

            {/* Seção FAQ do Curso */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-[#D4AF37]/30">
              <h3 className="text-xl font-serif font-bold text-[#071A33] mb-6 flex items-center space-x-2">
                <HelpCircle className="w-6 h-6 text-[#D4AF37]" />
                <span>Perguntas Frequentes sobre o Curso</span>
              </h3>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-bold text-[#071A33] mb-1">Como recebo os materiais e videoaulas?</h4>
                  <p className="text-sm text-gray-600">Os links de acesso aos materiais organizados via Google Drive e Área do Aluno são disponibilizados imediatamente após a confirmação do pagamento.</p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h4 className="font-bold text-[#071A33] mb-1">Qual a validade do acesso ao curso?</h4>
                  <p className="text-sm text-gray-600">O acesso permanece ativo durante todo o cronograma estipulado ({course.prazoAcessoDias || 90} dias), permitindo revisões ilimitadas.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#071A33] mb-1">Como funciona o suporte com professores e tutores?</h4>
                  <p className="text-sm text-gray-600">O suporte pós-compra é realizado diretamente via canal oficial de atendimento no WhatsApp, garantindo rapidez e proximidade com nossa equipe pedagógica.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Lateral: Resumo de Compra e Pagamento */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-[#D4AF37] sticky top-24">
              <div className="text-center pb-6 border-b border-gray-200">
                <span className="inline-block bg-[#071A33] text-[#D4AF37] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                  Investimento Oficial
                </span>
                
                <div className="space-y-2 mt-3">
                  <div className="bg-green-50 border border-green-200 p-3 rounded-xl">
                    <span className="block text-xs font-bold text-green-700 uppercase tracking-wider">Pagamento via Pix (Desconto)</span>
                    <span className="text-3xl font-serif font-bold text-green-800">
                      R$ {course.precoPix.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="bg-[#F3F5F8] p-3 rounded-xl border border-gray-200">
                    <span className="block text-xs font-medium text-gray-600 uppercase tracking-wider">Pagamento via Cartão</span>
                    <span className="text-xl font-serif font-bold text-[#071A33]">
                      R$ {course.precoCartao.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="py-6 space-y-4">
                <div className="flex items-center space-x-3 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span>Acesso garantido à Área do Aluno</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span>Suporte pós-compra via WhatsApp</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span>Materiais atualizados conforme o edital</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-[#D4AF37] hover:bg-[#bfa030] text-[#071A33] font-bold py-4 px-6 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2 text-base"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Comprar Agora</span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#071A33] hover:bg-[#0d264c] text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 text-sm"
                >
                  <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                  <span>Adicionar ao Carrinho</span>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500 mb-2">
                  Dúvidas sobre a compra ou forma de pagamento?
                </p>
                <a
                  href={`https://wa.me/5571992747496?text=${encodeURIComponent(`Olá! Tenho dúvidas sobre o curso ${course.nome}. Poderia me ajudar?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-green-700 font-bold text-xs hover:underline"
                > 
                  <span>Falar com atendente no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WhatsAppButton contexto="curso" nomeCurso={course.nome} />
    </div>
  );
};
