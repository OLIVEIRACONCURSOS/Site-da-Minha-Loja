import React, { useState } from 'react';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Plus, Minus, CheckCircle2, AlertCircle } from 'lucide-react';
import { Course } from '../types';

interface CartItemType {
  course: Course;
  quantity: number;
  selectedOption?: string;
}

interface CartProps {
  cartItems: CartItemType[];
  onUpdateQuantity: (courseId: string, delta: number) => void;
  onRemoveItem: (courseId: string) => void;
  onNavigate: (page: string) => void;
  formaPagamento: 'pix' | 'cartao';
  setFormaPagamento: (forma: 'pix' | 'cartao') => void;
}

export const Cart: React.FC<CartProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
  formaPagamento,
  setFormaPagamento
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    const cleanCode = couponCode.trim().toUpperCase();
    if (!cleanCode) {
      setCouponError('Digite um código de cupom válido.');
      return;
    }

    if (cleanCode === 'OLIVEIRA10') {
      setAppliedDiscount({ code: 'OLIVEIRA10', percent: 10 });
      setCouponSuccess('Cupom OLIVEIRA10 aplicado com 10% de desconto!');
    } else if (cleanCode === 'APROVADO20') {
      setAppliedDiscount({ code: 'APROVADO20', percent: 20 });
      setCouponSuccess('Cupom APROVADO20 aplicado com 20% de desconto!');
    } else {
      setCouponError('Cupom inválido ou expirado. Tente OLIVEIRA10.');
    }
  };

  // Cálculo de subtotal baseado na forma de pagamento escolhida
  const subtotal = cartItems.reduce((acc, item) => {
    const price = formaPagamento === 'pix' ? item.course.precoPix : item.course.precoCartao;
    return acc + price * item.quantity;
  }, 0);

  const discountAmount = appliedDiscount ? (subtotal * appliedDiscount.percent) / 100 : 0;
  const total = Math.max(0, subtotal - discountAmount);

  return (
    <div className="min-h-screen bg-[#F3F5F8] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho da Página */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div className="flex items-center space-x-3 text-[#D4AF37] mb-2">
            <ShoppingBag className="w-7 h-7" />
            <span className="text-sm font-bold tracking-wider uppercase">Carrinho de Compras</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#071A33]">
            Seus Cursos Preparatórios Selecionados
          </h1>
          <p className="text-gray-600 mt-1">
            Revise sua seleção, escolha a forma de pagamento e avance para garantir sua vaga.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-2xl mx-auto border border-gray-100">
            <div className="w-20 h-20 bg-[#F3F5F8] text-[#071A33] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <ShoppingBag className="w-10 h-10 text-[#071A33]/70" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#071A33] mb-3">
              Seu carrinho está vazio
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Você ainda não adicionou nenhum curso preparatório ao seu carrinho. Explore nosso catálogo para iniciar sua jornada rumo à aprovação!
            </p>
            <button
              onClick={() => onNavigate('catalog')}
              className="inline-flex items-center space-x-2 bg-[#071A33] hover:bg-[#0d264c] text-[#D4AF37] font-bold px-8 py-4 rounded-xl shadow-lg transition-all hover:scale-105"
            >
              <span>Explorar Catálogo de Cursos</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de Itens (2 colunas) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <h2 className="text-lg font-serif font-bold text-[#071A33] mb-4 flex items-center justify-between">
                  <span>Cursos no Carrinho ({cartItems.length})</span>
                  <button
                    onClick={() => onNavigate('catalog')}
                    className="text-xs text-[#071A33] hover:text-[#D4AF37] font-semibold underline"
                  >
                    + Adicionar mais cursos
                  </button>
                </h2>

                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => {
                    const itemPrice = formaPagamento === 'pix' ? item.course.precoPix : item.course.precoCartao;
                    return (
                      <div key={item.course.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.course.imagem}
                            alt={item.course.nome}
                            className="w-20 h-16 object-cover rounded-lg shadow border border-gray-200 shrink-0"
                          />
                          <div>
                            <div className="inline-block px-2 py-0.5 bg-[#071A33]/10 text-[#071A33] text-[11px] font-bold rounded mb-1">
                              {item.course.categoria} • {item.course.fase}
                            </div>
                            <h3 className="font-bold text-[#071A33] text-base leading-snug">
                              {item.course.nome}
                            </h3>
                            <p className="text-xs text-gray-500">
                              Produtora: <span className="font-semibold text-gray-700">{item.course.instituicaoProdutora}</span>
                            </p>
                            {item.selectedOption && (
                              <p className="text-xs text-[#D4AF37] font-semibold mt-0.5">
                                Opção: {item.selectedOption}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-6">
                          <div className="text-right">
                            <div className="text-xs text-gray-500">
                              {formaPagamento === 'pix' ? 'Preço Pix' : 'Preço Cartão'}
                            </div>
                            <div className="text-lg font-bold text-[#071A33]">
                              R$ {itemPrice.toFixed(2).replace('.', ',')}
                            </div>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.course.id)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            title="Remover curso"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Seleção da Forma de Pagamento no Carrinho */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <h3 className="text-lg font-serif font-bold text-[#071A33] mb-3">
                  Escolha a Forma de Pagamento Principal
                </h3>
                <p className="text-xs text-gray-600 mb-4">
                  O Pix oferece desconto especial em nossos cursos preparatórios.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormaPagamento('pix')}
                    className={`p-4 rounded-xl border-2 flex items-center justify-between transition-all ${
                      formaPagamento === 'pix'
                        ? 'border-green-600 bg-green-50/50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-bold text-[#071A33] flex items-center space-x-2">
                        <span>Pagamento via Pix</span>
                        <span className="bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-full uppercase">Mais Econômico</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Aprovação rápida e desconto aplicado</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      formaPagamento === 'pix' ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300'
                    }`}>
                      {formaPagamento === 'pix' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormaPagamento('cartao')}
                    className={`p-4 rounded-xl border-2 flex items-center justify-between transition-all ${
                      formaPagamento === 'cartao'
                        ? 'border-[#071A33] bg-blue-50/50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-bold text-[#071A33]">
                        Cartão de Crédito
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Parcelamento disponível</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      formaPagamento === 'cartao' ? 'border-[#071A33] bg-[#071A33] text-white' : 'border-gray-300'
                    }`}>
                      {formaPagamento === 'cartao' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Resumo do Pedido (1 coluna) */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#D4AF37]/30 sticky top-24">
                <h3 className="text-xl font-serif font-bold text-[#071A33] mb-4 pb-3 border-b">
                  Resumo do Pedido
                </h3>

                {/* Cupom de Desconto */}
                <form onSubmit={handleApplyCoupon} className="mb-6">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Possui cupom de desconto?
                  </label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Ex: OLIVEIRA10"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#F3F5F8] border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#071A33] hover:bg-[#0d264c] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors"
                    >
                      Aplicar
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-xs text-red-600 mt-1.5 flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{couponError}</span>
                    </p>
                  )}
                  {couponSuccess && (
                    <p className="text-xs text-green-600 mt-1.5 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{couponSuccess}</span>
                    </p>
                  )}
                </form>

                {/* Valores */}
                <div className="space-y-3 text-sm mb-6 pb-6 border-b">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  {appliedDiscount && (
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Desconto ({appliedDiscount.percent}%)</span>
                      <span>- R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Forma de Pagamento</span>
                    <span className="font-bold uppercase text-[#071A33]">
                      {formaPagamento === 'pix' ? 'Pix (Com Desconto)' : 'Cartão de Crédito'}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-serif font-bold text-[#071A33] pt-3 border-t">
                    <span>Total</span>
                    <span className="text-[#071A33] text-xl">R$ {total.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>

                {/* Botão de Checkout */}
                <button
                  onClick={() => onNavigate('checkout')}
                  className="w-full bg-[#071A33] hover:bg-[#0d264c] text-[#D4AF37] font-bold py-4 px-6 rounded-xl shadow-xl flex items-center justify-center space-x-3 transition-all hover:scale-105 border border-[#D4AF37]/50"
                >
                  <span>AVANÇAR PARA O CHECKOUT</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-500 text-center">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Ambiente seguro • Garantia Oliveira Concursos</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
