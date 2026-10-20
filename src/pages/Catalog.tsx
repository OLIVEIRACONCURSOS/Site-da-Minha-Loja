import React, { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, ArrowUpDown, CheckCircle, Tag, ShoppingCart, Sparkles, AlertCircle } from 'lucide-react';
import { db } from '../services/database';
import { Course, CourseCategory, CoursePhase, CourseModality } from '../types';
import { PromoChannelBanner } from '../components/PromoChannelBanner';

interface CatalogProps {
  onSelectCourse: (courseId: string) => void;
  onAddToCart: (course: Course) => void;
}

export const Catalog: React.FC<CatalogProps> = ({ onSelectCourse, onAddToCart }) => {
  const [courses] = useState<Course[]>(() => db.getCourses());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedPhase, setSelectedPhase] = useState<string>('todos');
  const [selectedModality, setSelectedModality] = useState<string>('todos');
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [sortBy, setSortBy] = useState<'relevancia' | 'menor-preco' | 'maior-preco' | 'recente'>('relevancia');
  const [addedCourseId, setAddedCourseId] = useState<string | null>(null);

  // Filtragem e ordenação
  const filteredCourses = useMemo(() => {
    return courses
      .filter(course => {
        // Busca por nome, instituição ou exame
        const matchesSearch = searchQuery === '' || 
          course.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instituicaoProdutora.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.exameOuConcurso.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (!matchesSearch) return false;

        // Categoria
        if (selectedCategory !== 'todos' && course.categoria !== selectedCategory) return false;

        // Fase
        if (selectedPhase !== 'todos' && course.fase !== selectedPhase) return false;

        // Modalidade
        if (selectedModality !== 'todos' && course.modalidade !== selectedModality) return false;

        // Destaque
        if (onlyFeatured && !course.destaque) return false;

        // Promoção
        if (onlyPromo && !course.emPromocao) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'menor-preco') return a.precoPix - b.precoPix;
        if (sortBy === 'maior-preco') return b.precoPix - a.precoPix;
        if (sortBy === 'recente') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        // Relevância padrão: destaques primeiro
        return (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0);
      });
  }, [courses, searchQuery, selectedCategory, selectedPhase, selectedModality, onlyFeatured, onlyPromo, sortBy]);

  const handleAddAndFeedback = (course: Course, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(course);
    setAddedCourseId(course.id);
    setTimeout(() => setAddedCourseId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F3F5F8] pb-16">
      {/* Cabeçalho da Seção Catálogo */}
      <div className="bg-[#071A33] text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center space-x-2 bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-[#D4AF37]/40">
            <BookOpen className="w-4 h-4" />
            <span>Catálogo Completo</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-4">
            Cursos Preparatórios Oliveira Concursos
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Explore nossa seleção de cursos para OAB, Concursos Públicos e Carreiras Jurídicas. Sua aprovação começa aqui!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Coluna de Filtros Laterais */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
              <div className="flex items-center justify-between pb-4 border-b mb-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-[#D4AF37]" />
                  <h3 className="font-serif font-bold text-lg text-[#071A33]">Filtros</h3>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('todos');
                    setSelectedPhase('todos');
                    setSelectedModality('todos');
                    setOnlyFeatured(false);
                    setOnlyPromo(false);
                    setSearchQuery('');
                  }}
                  className="text-xs text-[#071A33] hover:text-[#D4AF37] underline font-medium"
                >
                  Limpar filtros
                </button>
              </div>

              {/* Busca por termo */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Buscar Curso</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Nome, OAB, CEISC..."
                    className="w-full pl-9 pr-4 py-2.5 bg-[#F3F5F8] border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#071A33]"
                  />
                </div>
              </div>

              {/* Categoria */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Categoria</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2.5 bg-[#F3F5F8] border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#071A33]"
                >
                  <option value="todos">Todas as Categorias</option>
                  <option value="OAB">OAB (Ordem dos Advogados)</option>
                  <option value="Concursos Públicos">Concursos Públicos</option>
                  <option value="Carreiras Jurídicas">Carreiras Jurídicas</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              {/* Fase do Exame */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Fase / Etapa</label>
                <select
                  value={selectedPhase}
                  onChange={(e) => setSelectedPhase(e.target.value)}
                  className="w-full p-2.5 bg-[#F3F5F8] border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#071A33]"
                >
                  <option value="todos">Todas as Fases</option>
                  <option value="1ª fase">1ª fase</option>
                  <option value="2ª fase">2ª fase</option>
                  <option value="Geral">Geral</option>
                </select>
              </div>

              {/* Modalidade */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Modalidade</label>
                <select
                  value={selectedModality}
                  onChange={(e) => setSelectedModality(e.target.value)}
                  className="w-full p-2.5 bg-[#F3F5F8] border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#071A33]"
                >
                  <option value="todos">Todas as Modalidades</option>
                  <option value="extensivo">Extensivo</option>
                  <option value="intensivo">Intensivo</option>
                  <option value="premium ao vivo">Premium ao Vivo</option>
                  <option value="prático">Prático</option>
                </select>
              </div>

              {/* Checkboxes adicionais */}
              <div className="space-y-3 pt-2 border-t">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyFeatured}
                    onChange={(e) => setOnlyFeatured(e.target.checked)}
                    className="w-4 h-4 text-[#071A33] rounded focus:ring-[#D4AF37]"
                  />
                  <span className="text-sm font-medium text-gray-700">Apenas Destaques</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyPromo}
                    onChange={(e) => setOnlyPromo(e.target.checked)}
                    className="w-4 h-4 text-[#071A33] rounded focus:ring-[#D4AF37]"
                  />
                  <span className="text-sm font-medium text-gray-700">Em Oferta Especial</span>
                </label>
              </div>
            </div>
          </div>

          {/* Coluna de Cursos e Listagem */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Barra de Ordenação e Contador */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-600 font-medium">
                Mostrando <strong className="text-[#071A33]">{filteredCourses.length}</strong> curso(s) encontrado(s)
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                <div className="flex items-center space-x-2">
                  <ArrowUpDown className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-bold text-gray-700 uppercase">Ordenar:</span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="p-2 bg-[#F3F5F8] border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#071A33]"
                >
                  <option value="relevancia">Mais Relevantes</option>
                  <option value="menor-preco">Menor Preço</option>
                  <option value="maior-preco">Maior Preço</option>
                  <option value="recente">Mais Recentes</option>
                </select>
              </div>
            </div>

            {/* Grade de Cursos */}
            {filteredCourses.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-md border border-gray-200">
                <AlertCircle className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
                <h3 className="text-xl font-serif font-bold text-[#071A33] mb-2">Nenhum curso encontrado</h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
                  Não encontramos cursos correspondentes aos filtros selecionados. Tente limpar os filtros ou buscar por outro termo.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('todos');
                    setSelectedPhase('todos');
                    setSelectedModality('todos');
                    setOnlyFeatured(false);
                    setOnlyPromo(false);
                    setSearchQuery('');
                  }}
                  className="bg-[#071A33] hover:bg-[#0d264c] text-white font-bold px-6 py-3 rounded-xl shadow-md transition-colors"
                >
                  Ver Todos os Cursos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course) => {
                  const isAdded = addedCourseId === course.id;
                  return (
                    <div
                      key={course.id}
                      onClick={() => onSelectCourse(course.id)}
                      className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:border-[#D4AF37]"
                    >
                      <div>
                        {/* Imagem e Selos */}
                        <div className="relative h-48 overflow-hidden bg-[#071A33]">
                          <img
                            src={course.imagem}
                            alt={course.nome}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#071A33]/80 via-transparent to-transparent"></div>
                          
                          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                            <span className="bg-[#071A33]/90 text-[#D4AF37] text-[11px] font-bold px-2.5 py-1 rounded-md border border-[#D4AF37]/50 uppercase">
                              {course.categoria}
                            </span>
                            {course.fase !== 'N/A' && (
                              <span className="bg-[#D4AF37] text-[#071A33] text-[11px] font-bold px-2.5 py-1 rounded-md uppercase">
                                {course.fase}
                              </span>
                            )}
                          </div>

                          {course.destaque && (
                            <div className="absolute top-3 right-3 bg-[#D4AF37] text-[#071A33] p-1.5 rounded-full shadow-lg">
                              <Sparkles className="w-4 h-4" />
                            </div>
                          )}

                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <span className="text-xs text-[#D4AF37] font-medium block">
                              {course.instituicaoProdutora} • {course.exameOuConcurso}
                            </span>
                            <h3 className="font-serif font-bold text-lg text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                              {course.nome}
                            </h3>
                          </div>
                        </div>

                        {/* Descrição e Conteúdo */}
                        <div className="p-5">
                          <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-4">
                            {course.descricao}
                          </p>

                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {course.conteudoIncluido.slice(0, 3).map((item, idx) => (
                              <span key={idx} className="bg-[#F3F5F8] text-[#071A33] text-[11px] px-2 py-0.5 rounded-md font-medium border border-gray-200">
                                ✓ {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Preço e Botões de Ação */}
                      <div className="p-5 pt-0 border-t border-gray-100 mt-auto">
                        <div className="flex items-center justify-between mb-4 pt-4">
                          <div>
                            <span className="text-[11px] text-gray-500 uppercase block font-medium">Valor via Pix</span>
                            <span className="text-xl font-bold text-[#071A33]">
                              R$ {course.precoPix.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[11px] text-gray-500 uppercase block font-medium">Cartão</span>
                            <span className="text-sm font-bold text-gray-700">
                              R$ {course.precoCartao.toFixed(2).replace('.', ',')}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => onSelectCourse(course.id)}
                            className="w-full py-2.5 px-3 bg-[#071A33] hover:bg-[#0d264c] text-white font-bold text-xs rounded-xl transition-colors text-center"
                          >
                            Ver Detalhes
                          </button>
                          <button
                            onClick={(e) => handleAddAndFeedback(course, e)}
                            className={`w-full py-2.5 px-3 font-bold text-xs rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                              isAdded
                                ? 'bg-green-600 text-white'
                                : 'bg-[#D4AF37] hover:bg-[#c29f2f] text-[#071A33] shadow-md'
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <CheckCircle className="w-4 h-4" />
                                <span>Adicionado!</span>
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-4 h-4" />
                                <span>Comprar</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Banner de Promoções no Rodapé da Página */}
      <div className="mt-16">
        <PromoChannelBanner />
      </div>
    </div>
  );
};
