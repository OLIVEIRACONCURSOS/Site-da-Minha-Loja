import { User, Course, Order, OrderItem, Payment, CourseAccess, SupportTicket, PlatformSettings } from '../types';

const USERS_KEY = 'oliveira_users_v1';
const COURSES_KEY = 'oliveira_courses_v1';
const ORDERS_KEY = 'oliveira_orders_v1';
const PAYMENTS_KEY = 'oliveira_payments_v1';
const ACCESS_KEY = 'oliveira_access_v1';
const TICKETS_KEY = 'oliveira_tickets_v1';
const SETTINGS_KEY = 'oliveira_settings_v1';

const INITIAL_SETTINGS: PlatformSettings = {
  brandName: 'OLIVEIRA CONCURSOS',
  slogan: 'Sua aprovação começa aqui!',
  logoUrl: '',
  primaryColor: '#071A33',
  goldColor: '#D4AF37',
  whatsappNumber: '+5571992747496',
  pixKey: '71992747496',
  pixBeneficiary: 'Oliveira Concursos Educacional Ltda',
  supportEmail: 'suaporest@oliveiraconcursos.com.br',
  promoChannelUrl: 'https://whatsapp.com/channel/0029VbDUiPKG8l5Fs1V8rh0w',
  termsText: 'Termos de uso padrão da Oliveira Concursos. Acesso pessoal e intransferível.',
  privacyText: 'Política de privacidade em conformidade com a LGPD e proteção de dados dos alunos.'
};

const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin',
    nome: 'Administrador Oliveira',
    email: 'admin@oliveiraconcursos.com.br',
    telefone: '71992747496',
    role: 'admin',
    status: 'ativo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'usr-aluno',
    nome: 'Estudante Exemplo',
    email: 'aluno@oliveiraconcursos.com.br',
    telefone: '71988888888',
    role: 'aluno',
    status: 'ativo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const INITIAL_COURSES: Course[] = [
  // OAB 1ª FASE
  {
    id: 'course-oab-1-ceisc-ext',
    nome: 'CEISC Extensivo Premium',
    slug: 'ceisc-extensivo-premium-oab-48',
    categoria: 'OAB',
    instituicaoProdutora: 'CEISC',
    exameOuConcurso: '48º Exame de Ordem',
    fase: '1ª fase',
    descricao: 'Curso preparatório extensivo completo para a 1ª fase do 48º Exame da OAB com videoaulas aprofundadas, PDFs direcionados e simulados.',
    imagem: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    modalidade: 'extensivo',
    precoPix: 497.00,
    precoCartao: 539.00,
    conteudoIncluido: ['Videoaulas completas', 'Material em PDF', 'Cronograma de 120 dias', 'Simulados oficiais'],
    prazoAcessoDias: 120,
    status: 'rascunho',
    destaque: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'course-oab-1-ceisc-int',
    nome: 'CEISC Intensivo',
    slug: 'ceisc-intensivo-oab-48',
    categoria: 'OAB',
    instituicaoProdutora: 'CEISC',
    exameOuConcurso: '48º Exame de Ordem',
    fase: '1ª fase',
    descricao: 'Preparação intensiva focada nos temas mais cobrados pela FGV no 48º Exame da OAB.',
    imagem: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    modalidade: 'intensivo',
    precoPix: 397.00,
    precoCartao: 429.00,
    conteudoIncluido: ['Videoaulas focadas', 'Caderno de questões FGV', 'Cronograma de 90 dias'],
    prazoAcessoDias: 90,
    status: 'rascunho',
    destaque: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'course-oab-1-vicio-120',
    nome: 'Vício de Uma Estudante (120 dias)',
    slug: 'vicio-de-uma-estudante-120-dias-oab-48',
    categoria: 'OAB',
    instituicaoProdutora: 'Vício de Uma Estudante',
    exameOuConcurso: '48º Exame de Ordem',
    fase: '1ª fase',
    descricao: 'Metodologia exclusiva de estudo dinâmico e revisão ativa para o 48º Exame de Ordem.',
    imagem: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    modalidade: 'extensivo',
    precoPix: 447.00,
    precoCartao: 485.00,
    conteudoIncluido: ['Mapas mentais', 'Videoaulas de revisão', 'Cronograma 120 dias'],
    prazoAcessoDias: 120,
    status: 'rascunho',
    destaque: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'course-oab-1-vicio-90',
    nome: 'Vício de Uma Estudante (90 dias)',
    slug: 'vicio-de-uma-estudante-90-dias-oab-48',
    categoria: 'OAB',
    instituicaoProdutora: 'Vício de Uma Estudante',
    exameOuConcurso: '48º Exame de Ordem',
    fase: '1ª fase',
    descricao: 'Cronograma acelerado de 90 dias com início planejado mediante confirmação de edição.',
    imagem: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    modalidade: 'intensivo',
    precoPix: 380.00,
    precoCartao: 410.00,
    conteudoIncluido: ['Apostilas em PDF', 'Cronograma 90 dias'],
    dataInicio: '2025-10-12',
    prazoAcessoDias: 90,
    status: 'rascunho',
    destaque: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },

  // OAB 2ª FASE (PREÇOS ESPECÍFICOS R$ 80 PIX / R$ 85 CARTÃO)
  {
    id: 'course-oab-2-adm',
    nome: 'Direito Administrativo — CEISC (2ª Fase)',
    slug: 'direito-administrativo-ceisc-oab-48',
    categoria: 'OAB',
    instituicaoProdutora: 'CEISC',
    exameOuConcurso: '48º Exame de Ordem',
    fase: '2ª fase',
    disciplina: 'Direito Administrativo',
    descricao: 'Treinamento completo para a 2ª fase do 48º Exame da OAB em Direito Administrativo, com peças prontas e questões discursivas.',
    imagem: 'https://images.unsplash.com/photo-1505664194779-8beaceb13745?auto=format&fit=crop&w=800&q=80',
    modalidade: 'premium ao vivo',
    precoPix: 80.00,
    precoCartao: 85.00,
    conteudoIncluido: ['Aulas ao vivo e gravadas', 'Esqueleto de peças práticas', 'Simulados corrigidos'],
    prazoAcessoDias: 90,
    status: 'publicado',
    destaque: true,
    emPromocao: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'course-oab-2-civil',
    nome: 'Direito Civil — CEISC (2ª Fase)',
    slug: 'direito-civil-ceisc-oab-48',
    categoria: 'OAB',
    instituicaoProdutora: 'CEISC',
    exameOuConcurso: '48º Exame de Ordem',
    fase: '2ª fase',
    disciplina: 'Direito Civil',
    descricao: 'Domine a redação de peças cíveis e a fundamentação legal exigida pela FGV na 2ª fase.',
    imagem: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    modalidade: 'premium ao vivo',
    precoPix: 80.00,
    precoCartao: 85.00,
    conteudoIncluido: ['Aulas de peças cíveis', 'Material em PDF', 'Simulados comentados'],
    prazoAcessoDias: 90,
    status: 'publicado',
    destaque: true,
    emPromocao: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'course-oab-2-const-ceisc',
    nome: 'Direito Constitucional — CEISC (2ª Fase)',
    slug: 'direito-constitucional-ceisc-oab-48',
    categoria: 'OAB',
    instituicaoProdutora: 'CEISC',
    exameOuConcurso: '48º Exame de Ordem',
    fase: '2ª fase',
    disciplina: 'Direito Constitucional',
    descricao: 'Preparação focada em Controle de Constitucionalidade, Mandado de Segurança e ações do art. 102/103.',
    imagem: 'https://images.unsplash.com/photo-1453945629958-c997bc272445?auto=format&fit=crop&w=800&q=80',
    modalidade: 'premium ao vivo',
    precoPix: 80.00,
    precoCartao: 85.00,
    conteudoIncluido: ['Aulas de Constitucional', 'Jurisprudência direcionada'],
    prazoAcessoDias: 90,
    status: 'publicado',
    destaque: false,
    emPromocao: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'course-oab-2-const-flavia',
    nome: 'Direito Constitucional — Flávia Bahia (2ª Fase)',
    slug: 'direito-constitucional-flavia-bahia-oab-48',
    categoria: 'OAB',
    instituicaoProdutora: 'Flávia Bahia',
    exameOuConcurso: '48º Exame de Ordem',
    fase: '2ª fase',
    disciplina: 'Direito Constitucional',
    descricao: 'Metodologia renomada da Profa. Flávia Bahia para gabaritar a 2ª fase de Constitucional no 48º Exame.',
    imagem: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    modalidade: 'premium ao vivo',
    precoPix: 80.00,
    precoCartao: 85.00,
    conteudoIncluido: ['Aulas exclusivas Flávia Bahia', 'Vade Mecum direcionado'],
    prazoAcessoDias: 90,
    status: 'publicado',
    destaque: true,
    emPromocao: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'course-oab-2-penal',
    nome: 'Direito Penal — CEISC (2ª Fase)',
    slug: 'direito-penal-ceisc-oab-48',
    categoria: 'OAB',
    instituicaoProdutora: 'CEISC',
    exameOuConcurso: '48º Exame de Ordem',
    fase: '2ª fase',
    disciplina: 'Direito Penal',
    descricao: 'Treinamento intensivo de peças criminais, memoriais, apelações e habeas corpus.',
    imagem: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    modalidade: 'premium ao vivo',
    precoPix: 80.00,
    precoCartao: 85.00,
    conteudoIncluido: ['Aulas de Penal e Processo Penal', 'Modelos de peças'],
    prazoAcessoDias: 90,
    status: 'publicado',
    destaque: true,
    emPromocao: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'course-oab-2-empresarial',
    nome: 'Direito Empresarial — CEISC (2ª Fase)',
    slug: 'direito-empresarial-ceisc-oab-48',
    categoria: 'OAB',
    instituicaoProdutora: 'CEISC',
    exameOuConcurso: '48º Exame de Ordem',
    fase: '2ª fase',
    disciplina: 'Direito Empresarial',
    descricao: 'Sociedades, falências, recuperação judicial e ações societárias na prática da OAB.',
    imagem: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    modalidade: 'premium ao vivo',
    precoPix: 80.00,
    precoCartao: 85.00,
    conteudoIncluido: ['Aulas práticas de Empresarial', 'Resolução de peças anteriores'],
    prazoAcessoDias: 90,
    status: 'publicado',
    destaque: false,
    emPromocao: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'course-oab-2-trabalho',
    nome: 'Direito do Trabalho — CEISC (2ª Fase)',
    slug: 'direito-do-trabalho-ceisc-oab-48',
    categoria: 'OAB',
    instituicaoProdutora: 'CEISC',
    exameOuConcurso: '48º Exame de Ordem',
    fase: '2ª fase',
    disciplina: 'Direito do Trabalho',
    descricao: 'Reclamação trabalhista, recursos ordinários e contestações alinhados à CLT e jurisprudência TST.',
    imagem: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
    modalidade: 'premium ao vivo',
    precoPix: 80.00,
    precoCartao: 85.00,
    conteudoIncluido: ['Aulas de Trabalho e Processo do Trabalho', 'Checklist de peças'],
    prazoAcessoDias: 90,
    status: 'publicado',
    destaque: true,
    emPromocao: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'course-oab-2-tributario',
    nome: 'Direito Tributário — CEISC (2ª Fase)',
    slug: 'direito-tributario-ceisc-oab-48',
    categoria: 'OAB',
    instituicaoProdutora: 'CEISC',
    exameOuConcurso: '48º Exame de Ordem',
    fase: '2ª fase',
    disciplina: 'Direito Tributário',
    descricao: 'Mandado de Segurança preventivo/repressivo, Ação Anulatória e Repetição de Indébito na OAB.',
    imagem: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    modalidade: 'premium ao vivo',
    precoPix: 80.00,
    precoCartao: 85.00,
    conteudoIncluido: ['Aulas de Tributário', 'Esquemas de peças fiscais'],
    prazoAcessoDias: 90,
    status: 'publicado',
    destaque: false,
    emPromocao: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const db = {
  getSettings(): PlatformSettings {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      return stored ? JSON.parse(stored) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  },

  saveSettings(settings: PlatformSettings): void {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  getUsers(): User[] {
    try {
      const stored = localStorage.getItem(USERS_KEY);
      return stored ? JSON.parse(stored) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  },

  saveUsers(users: User[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  getCourses(): Course[] {
    try {
      const stored = localStorage.getItem(COURSES_KEY);
      if (!stored) {
        localStorage.setItem(COURSES_KEY, JSON.stringify(INITIAL_COURSES));
        return INITIAL_COURSES;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_COURSES;
    }
  },

  saveCourses(courses: Course[]): void {
    localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
  },

  getOrders(): Order[] {
    try {
      const stored = localStorage.getItem(ORDERS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  saveOrders(orders: Order[]): void {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  },

  getAccessList(): CourseAccess[] {
    try {
      const stored = localStorage.getItem(ACCESS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  saveAccessList(accessList: CourseAccess[]): void {
    localStorage.setItem(ACCESS_KEY, JSON.stringify(accessList));
  },

  getSupportTickets(): SupportTicket[] {
    try {
      const stored = localStorage.getItem(TICKETS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  saveSupportTickets(tickets: SupportTicket[]): void {
    localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  },

  initDb(): void {
    if (!localStorage.getItem(COURSES_KEY)) {
      localStorage.setItem(COURSES_KEY, JSON.stringify(INITIAL_COURSES));
    }
    if (!localStorage.getItem(USERS_KEY)) {
      localStorage.setItem(USERS_KEY, JSON.stringify(INITIAL_USERS));
    }
    if (!localStorage.getItem(SETTINGS_KEY)) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(INITIAL_SETTINGS));
    }
  }
};

db.initDb();
