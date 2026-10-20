export type UserRole = 'admin' | 'aluno';

export interface User {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  senhaHash?: string;
  role: UserRole;
  status: 'ativo' | 'bloqueado' | 'pendente';
  createdAt: string;
  updatedAt: string;
}

export type CourseCategory = 'OAB' | 'Concursos Públicos' | 'Carreiras Jurídicas' | 'Outros';
export type CoursePhase = '1ª fase' | '2ª fase' | 'Geral' | 'N/A';
export type CourseModality = 'extensivo' | 'intensivo' | 'premium ao vivo' | 'prático' | 'online';
export type CourseStatus = 'rascunho' | 'publicado' | 'esgotado' | 'arquivado';

export interface Course {
  id: string;
  nome: string;
  slug: string;
  categoria: CourseCategory;
  instituicaoProdutora: string;
  exameOuConcurso: string;
  fase: CoursePhase;
  disciplina?: string;
  descricao: string;
  imagem: string;
  modalidade: CourseModality;
  precoPix: number;
  precoCartao: number;
  conteudoIncluido: string[];
  linkAcessoDrive?: string;
  prazoAcessoDias?: number;
  status: CourseStatus;
  destaque: boolean;
  emPromocao?: boolean;
  dataInicio?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 
  | 'aguardando_pagamento' 
  | 'aguardando_confirmacao_manual' 
  | 'pagamento_aprovado' 
  | 'em_preparacao' 
  | 'acesso_liberado' 
  | 'cancelado' 
  | 'reembolsado';

export interface OrderItem {
  courseId: string;
  courseName: string;
  unitPricePix: number;
  unitPriceCartao: number;
  appliedPrice: number;
  quantity: number;
  selectedOption?: string;
}

export interface Order {
  id: string;
  numeroUnico: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: OrderItem[];
  subtotal: number;
  descontos: number;
  valorTotal: number;
  formaPagamento: 'pix' | 'cartao';
  status: OrderStatus;
  createdAt: string;
  confirmedAt?: string;
  adminResponsavel?: string;
  observacoes?: string;
}

export interface Payment {
  id: string;
  orderId: string;
  metodo: 'pix' | 'cartao';
  valorEsperado: number;
  transacaoId?: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
  comprovanteUrl?: string;
  dataConferencia?: string;
  responsavelAprovacao?: string;
}

export interface CourseAccess {
  id: string;
  userId: string;
  courseId: string;
  orderId: string;
  status: 'liberado' | 'suspenso' | 'expirado';
  dataLiberacao: string;
  dataExpiracao?: string;
  historicoAlteracoes: {
    data: string;
    acao: string;
    autor: string;
  }[];
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  orderId?: string;
  assunto: string;
  descricao: string;
  status: 'aberto' | 'em_andamento' | 'resolvido' | 'fechado';
  responsavel?: string;
  createdAt: string;
  closedAt?: string;
}

export interface PlatformSettings {
  brandName: string;
  slogan: string;
  logoUrl: string;
  primaryColor: string;
  goldColor: string;
  whatsappNumber: string;
  pixKey: string;
  pixBeneficiary: string;
  supportEmail: string;
  promoChannelUrl: string;
  termsText: string;
  privacyText: string;
}
