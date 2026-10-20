import React, { useState } from 'react';
import { Shield, BookOpen, Award, CheckCircle, ArrowRight, Search, Sparkles, Scale, GraduationCap, FileText, ChevronRight, Check } from 'lucide-react';
import { db } from '../services/database';
import { Course } from '../types';
import { PromoChannelBanner } from '../components/PromoChannelBanner';
import logoLogoImage from '../assets/uploads/1792467358561-0-Emblema-Dourado-da-Oliveira-Concursos.png';

interface HomeProps {
  onNavigate: (page: string, params?: any) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Segurança Pública');

  const courses = db.getCourses();
  const publishedCourses = courses.filter(c => c.status === 'publicado' || c.destaque);
  const featuredCourses = publishedCourses.slice(0, 4);
  const promoCourses = publishedCourses.filter(c => c.emPromocao || c.fase === '2ª fase');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('catalog', { search: searchTerm });
  };

  const publicCategories = [
    {
      name: 'Segurança Pública',
      desc: 'Polícia Federal, PRF, Polícias Civis e Penais',
      sub: ['Polícia Rodoviária Federal', 'Polícia Civil', 'Polícia Penal', 'Delegado']
    },
    {
      name: 'Tribunais',
      desc: 'Analistas, Técnicos e Juiz Substituto',
      sub: ['Tribunais de Justiça (TJ)', 'Tribunais Regionais (TRT/TRF)', 'Magistratura']
    },
    {
      name: 'Área Fiscal e Administrativa',
      desc: 'Auditores Fiscais, INSS e Órgãos Federais',
      sub: ['Área Fiscal', 'INSS e Previdência', 'Área Administrativa', 'Cartórios']
    },
    {
      name: 'Carreiras Jurídicas',
      desc: 'Procuradorias, Defensorias e Ministério Público',
      sub: ['Procuradorias', 'Defensorias Públicas', 'Ministério Público']
    }
  ];

  return (
    <div className="min-h-screen bg-[#F3F5F8] text-[#071A33]">
      {/* BANNER PRINCIPAL INSTITUCIONAL */}
      <section className="relative bg-gradient-to-br from-[#071A33] via-[#0b254d] to-[#071A33] text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-4 border-[#D4AF37]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4" />
              <span>OAB 48º Exame & Concursos Públicos</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-white leading-tight">
              OLIVEIRA CONCURSOS
            </h1>

            <p className="text-xl sm:text-2xl font-serif text-[#D4AF37] font-medium">
              Sua aprovação começa aqui!
            </p>

            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              “Encontre o curso ideal para sua preparação e estude com materiais selecionados para sua jornada rumo à aprovação e realização profissional.”
            </p>

            {/* Barra de pesquisa rápida no banner */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto lg:mx-0 flex items-center bg-white rounded-xl shadow-2xl p-2 border-2 border-[#D4AF37]/50">
              <Search className="w-5 h-5 text-gray-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Busque por curso, OAB, Direito Civil, INSS..."
                className="w-full px-3 py-2 text-[#071A33] placeholder-gray-400 focus:outline-none text-sm sm:text-base"
              />
              <button
                type="submit"
                className="bg-[#071A33] hover:bg-[#0d264c] text-[#D4AF37] font-bold px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2 shrink-0 border border-[#D4AF37]/30"
              >
                <span>Buscar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Botões de Ação Principal */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onNavigate('catalog')}
                className="bg-[#D4AF37] hover:bg-[#c29f31] text-[#071A33] font-bold px-8 py-4 rounded-xl shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              >
                <GraduationCap className="w-5 h-5" />
                <span>Explorar Cursos</span>
              </button>

              <button
                onClick={() => onNavigate('catalog', { promo: true })}
                className="bg-transparent hover:bg-white/10 text-white border-2 border-[#D4AF37] font-bold px-8 py-3.5 rounded-xl transition-all duration-300 flex items-center space-x-2"
              >
                <span>Ver Ofertas Disponíveis</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-[#071A33] to-[#0b254d] rounded-3xl p-6 shadow-2xl border-4 border-[#D4AF37]/70 flex flex-col items-center justify-center text-center group">
              <div className="absolute inset-0 bg-[#D4AF37]/5 rounded-3xl filter blur-xl"></div>
              <img
                src={logoLogoImage}
                alt="Oliveira Concursos"
                className="w-48 h-48 sm:w-60 sm:h-60 object-contain drop-shadow-[0_10px_15px_rgba(212,175,55,0.3)] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="mt-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                  Excelência e Credibilidade Jurídica
                </span>
                <p className="text-xs text-gray-300 mt-1">
                  Materiais de ponta para sua aprovação
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CANAL DE PROMOÇÕES BANNER OFICIAL */}
      <PromoChannelBanner />

      {/* A. CURSOS EM DESTAQUE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-[#071A33]/5 px-3 py-1 rounded-full border border-[#D4AF37]/30">
              Destaques Acadêmicos
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#071A33] mt-2">
              Cursos em Destaque
            </h2>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-[#071A33] hover:text-[#D4AF37] font-bold transition-colors"
          >
            <span>Ver catálogo completo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course: Course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl flex flex-col overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden bg-[#071A33]">
                <img
                  src={course.imagem}
                  alt={course.nome}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute top-3 left-3 bg-[#071A33]/90 text-[#D4AF37] text-xs font-bold px-3 py-1 rounded-full border border-[#D4AF37]/40">
                  {course.categoria}
                </div>
                {course.fase && (
                  <div className="absolute top-3 right-3 bg-[#D4AF37] text-[#071A33] text-xs font-extrabold px-2.5 py-1 rounded-full shadow">
                    {course.fase}
                  </div>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    {course.instituicaoProdutora} • {course.exameOuConcurso}
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#071A33] mb-2 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                    {course.nome}
                  </h3>
                  <p className="text-gray-600 text-xs line-clamp-2 mb-4">
                    {course.descricao}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-gray-400 block">Pix à vista</span>
                    <span className="text-xl font-extrabold text-[#071A33]">
                      R$ {course.precoPix.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <button
                    onClick={() => onNavigate('course-detail', { id: course.id })}
                    className="bg-[#071A33] hover:bg-[#D4AF37] hover:text-[#071A33] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-300 shadow"
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* B. PREPARAÇÃO PARA A OAB */}
      <section className="bg-[#071A33] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/30">
              Especialidade da Casa
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-white mt-3">
              Preparação Completa para o Exame da OAB
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mt-2">
              Atalhos rápidos para todas as fases e modalidades do Exame de Ordem com os melhores professores e instituições. Licenciamento oficial CEISC e Flávia Bahia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: '1ª Fase do Exame', desc: 'Conteúdo aprofundado, simulados e revisão estratégica.', filter: '1ª fase', icon: BookOpen },
              { title: '2ª Fase — Específicas', desc: 'Direito Administrativo, Civil, Constitucional, Penal, Trabalho, Tributário e Empresarial (R$ 80,00 Pix).', filter: '2ª fase', icon: Scale },
              { title: 'Cursos Intensivos', desc: 'Cronogramas focados de 90 dias para ganho rápido de desempenho.', filter: 'intensivo', icon: Sparkles },
              { title: 'Cursos Extensivos', desc: 'Planejamento completo de 120 dias com videoaulas detalhadas.', filter: 'extensivo', icon: GraduationCap },
              { title: 'Preparação Prática', desc: 'Treinamento de peças e discursivas para a 2ª fase.', filter: 'prático', icon: FileText },
              { title: 'Simulados e Questões', desc: 'Banco de questões inéditas e comentadas no padrão FGV.', filter: 'OAB', icon: CheckCircle }
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate('catalog', { category: 'OAB', phase: item.filter })}
                className="bg-[#0d264c] hover:bg-[#123163] border border-[#D4AF37]/30 hover:border-[#D4AF37] p-6 rounded-2xl cursor-pointer transition-all duration-300 shadow-xl group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-[#D4AF37] text-xs font-bold">
                  <span>Acessar cursos</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* C. CONCURSOS PÚBLICOS (CATEGORIAS EXPANSÍVEIS) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-[#071A33]/5 px-3 py-1 rounded-full border border-[#D4AF37]/30">
            Oportunidades em Carreiras Públicas
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#071A33] mt-3">
            Concursos Públicos por Área
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Explore as categorias de concursos e encontre o edital ou preparação ideal para seu objetivo. Filtre por instituição, cargo ou área de atuação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publicCategories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <div
                onClick={() => setExpandedCategory(expandedCategory === cat.name ? null : cat.name)}
                className="p-6 bg-gradient-to-r from-white to-gray-50 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#071A33]">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {cat.desc}
                  </p>
                </div>
                <div className={`w-8 h-8 rounded-full bg-[#071A33]/10 flex items-center justify-center text-[#071A33] transition-transform duration-300 ${expandedCategory === cat.name ? 'rotate-90 bg-[#D4AF37] text-[#071A33]' : ''}`}>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>

              {expandedCategory === cat.name && (
                <div className="p-6 bg-[#F3F5F8] border-t border-gray-200 space-y-3 animate-fadeIn">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                    Principais Órgãos e Cargos:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {cat.sub.map((subItem, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => onNavigate('catalog', { category: 'Concursos Públicos', search: subItem })}
                        className="text-left p-3 rounded-xl bg-white hover:bg-[#071A33] hover:text-white border border-gray-200 text-xs font-medium text-[#071A33] transition-all flex items-center justify-between group shadow-sm"
                      >
                        <span>{subItem}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                  <div className="pt-3 text-right">
                    <button
                      onClick={() => onNavigate('catalog', { category: 'Concursos Públicos' })}
                      className="text-xs font-bold text-[#071A33] hover:text-[#D4AF37] inline-flex items-center space-x-1"
                    >
                      <span>Ver todos os cursos de {cat.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* D. OFERTAS ESPECIAIS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-[#071A33]/5 px-3 py-1 rounded-full border border-[#D4AF37]/30">
              Condições Especiais
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#071A33] mt-2">
              Ofertas Especiais OAB 2ª Fase
            </h2>
          </div>
          <button
            onClick={() => onNavigate('catalog', { promo: true })}
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-[#071A33] hover:text-[#D4AF37] font-bold transition-colors"
          >
            <span>Ver todas as ofertas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promoCourses.slice(0, 3).map((course: Course) => (
            <div
              key={course.id}
              className="bg-gradient-to-b from-white to-[#F3F5F8] rounded-2xl shadow-xl border-2 border-[#D4AF37]/40 p-6 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 bg-[#D4AF37] text-[#071A33] text-[10px] font-extrabold uppercase px-4 py-1.5 rounded-bl-xl shadow">
                Promoção Exclusiva
              </div>

              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {course.instituicaoProdutora} • {course.fase}
                </span>
                <h3 className="font-serif font-extrabold text-xl text-[#071A33] mt-1 mb-3">
                  {course.nome}
                </h3>
                <p className="text-gray-600 text-xs line-clamp-3 mb-6">
                  {course.descricao}
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-inner mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-500">À vista no Pix:</span>
                  <span className="text-2xl font-extrabold text-green-600">
                    R$ {course.precoPix.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs font-semibold text-gray-500">No Cartão:</span>
                  <span className="text-lg font-bold text-[#071A33]">
                    R$ {course.precoCartao.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('course-detail', { id: course.id })}
                className="w-full bg-[#071A33] hover:bg-[#D4AF37] hover:text-[#071A33] text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg text-center flex items-center justify-center space-x-2"
              >
                <span>Garantir Minha Vaga</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* E. POR QUE ESTUDAR COM A OLIVEIRA CONCURSOS? */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-[#071A33]/5 px-3 py-1 rounded-full border border-[#D4AF37]/30">
              Nossos Diferenciais
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#071A33] mt-3">
              Por que estudar com a Oliveira Concursos?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Estrutura profissional dedicada a transformar dedicação em aprovação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Organização e Acesso',
                desc: 'Organização rigorosa do acesso aos materiais, videoaulas e cronogramas para você focar 100% no seu estudo.',
                icon: Shield
              },
              {
                title: 'Suporte via WhatsApp',
                desc: 'Atendimento humanizado e pós-compra ágil diretamente pelo WhatsApp para tirar todas as suas dúvidas.',
                icon: CheckCircle
              },
              {
                title: 'Diversidade de Cursos',
                desc: 'Cursos selecionados para OAB 1ª e 2ª fases, concursos públicos e carreiras jurídicas de alto padrão.',
                icon: Award
              }
            ].map((diff, idx) => (
              <div
                key={idx}
                className="bg-[#F3F5F8] p-8 rounded-2xl border border-gray-200 hover:border-[#D4AF37] transition-all duration-300 shadow-sm flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 bg-[#071A33] text-[#D4AF37] rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform">
                  <diff.icon className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-xl text-[#071A33] mb-3">
                  {diff.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {diff.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* F. CHAMada final */}
      <section className="bg-gradient-to-r from-[#071A33] via-[#0b254d] to-[#071A33] text-white py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-white mb-6">
            Seu próximo passo começa com uma boa preparação.
          </h2>
          <p className="text-[#D4AF37] text-lg sm:text-xl font-medium mb-8">
            “OLIVEIRA CONCURSOS — Sua aprovação começa aqui!”
          </p>
          <button
            onClick={() => onNavigate('catalog')}
            className="bg-[#D4AF37] hover:bg-[#c29f31] text-[#071A33] font-bold px-10 py-5 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 text-lg inline-flex items-center space-x-3"
          >
            <span>Encontrar meu curso</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};