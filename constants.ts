
// Fix: Add missing constants USERS, CHANNELS, and CHANNELS_MAP with mock data.
import { User, Channel, Course } from './types';

export const USERS: { [key: string]: User } = {
  'user-1': {
    id: 'user-1',
    name: 'Alice Johnson',
    avatarUrl: 'https://i.pravatar.cc/40?u=user-1',
    title: 'Desenvolvedora Frontend',
  },
  'user-2': {
    id: 'user-2',
    name: 'Bob Williams',
    avatarUrl: 'https://i.pravatar.cc/40?u=user-2',
    title: 'Designer de Produto',
  },
  'user-3': {
    id: 'user-3',
    name: 'Charlie Brown',
    avatarUrl: 'https://i.pravatar.cc/40?u=user-3',
    title: 'Gerente de Produto',
  },
  'user-4': { // The current user in some components
    id: 'user-4',
    name: 'Maria Fernanda',
    avatarUrl: 'https://i.pravatar.cc/40?u=leader',
    title: 'Líder de Vendas',
  },
};

export const CHANNELS: Channel[] = [
  {
    id: 'channel-1',
    name: 'Desenvolvimento Frontend',
    description: 'Um canal para discutir as últimas tecnologias e frameworks do mundo frontend. React, Vue, Svelte e mais!',
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=400&auto=format&fit=crop',
    isSubscribed: true,
  },
  {
    id: 'channel-2',
    name: 'Design de UI/UX',
    description: 'Compartilhe suas criações, peça feedback e discuta as melhores práticas de design de interface e experiência do usuário.',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=400&auto=format&fit=crop',
    isSubscribed: false,
  },
  {
    id: 'channel-3',
    name: 'Gestão de Produtos',
    description: 'Tudo sobre roadmaps, priorização, métricas e o dia a dia de um gerente de produtos. Junte-se à conversa!',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400&auto=format&fit=crop',
    isSubscribed: true,
  },
    {
    id: 'channel-4',
    name: 'Fotografia Amadora',
    description: 'Um espaço para entusiastas da fotografia compartilharem suas melhores fotos, dicas de equipamento e técnicas de edição.',
    imageUrl: 'https://images.unsplash.com/photo-1510127034890-ba27e08285ff?q=80&w=400&auto=format&fit=crop',
    isSubscribed: false,
  },
  {
    id: 'channel-5',
    name: 'Receitas Rápidas',
    description: 'Cansado de cozinhar? Aqui compartilhamos receitas deliciosas e fáceis para o dia a dia. Bom apetite!',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17025?q=80&w=400&auto=format&fit=crop',
    isSubscribed: true,
  },
   {
    id: 'channel-6',
    name: 'Dicas de Viagem',
    description: 'Planejando sua próxima aventura? Encontre roteiros, dicas de economia e histórias inspiradoras de viajantes.',
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=400&auto=format&fit=crop',
    isSubscribed: false,
  },
];

export const CHANNELS_MAP: { [key: string]: Channel } = CHANNELS.reduce((acc, channel) => {
  acc[channel.id] = channel;
  return acc;
}, {} as { [key: string]: Channel });

const specificCourses: Course[] = [
    { id: '1', thumbnailUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=40&auto=format&fit=crop', name: 'Teste videos', owner: 'Super Admin', category: 'Design', creationDate: '26/06/2024', duration: '1 h 48 min', enrolled: 45, finished: 18, status: 'Publicado' },
    { id: '2', thumbnailUrl: '', name: 'TESTE 2', owner: 'Super Admin', category: 'Communications', creationDate: '02/07/2025', duration: '10 s', enrolled: 3, finished: 1, status: 'Publicado' },
    { id: '3', thumbnailUrl: '', name: 'new course', owner: 'Admin testerSTAGE', category: 'Communications', creationDate: '09/03/2023', duration: '--.--', enrolled: 0, finished: 0, status: 'Em Criação' },
    { id: '4', thumbnailUrl: '', name: 'course test 200224', owner: 'Admin testerSTAGE', category: 'Development', creationDate: '20/02/2024', duration: '--.--', enrolled: 0, finished: 0, status: 'Em Criação' },
    { id: '5', thumbnailUrl: '', name: 'aasdasd', owner: 'Bolivar', category: 'Communications', creationDate: '03/03/2023', duration: '28 min', enrolled: 0, finished: 0, status: 'Publicado' },
    { id: '6', thumbnailUrl: 'icon', name: 'fdg', owner: 'Super Admin', category: 'Entrepreneurship', creationDate: '12/09/2025', duration: '--.--', enrolled: 0, finished: 0, status: 'Em Criação' },
    { id: '7', thumbnailUrl: '', name: 'Curso conteúdo PDF pesado', owner: 'Super Admin', category: 'Design', creationDate: '03/08/2023', duration: '14 h 12 min', enrolled: 2, finished: 0, status: 'Publicado' },
    { id: '8', thumbnailUrl: '', name: 'teste short youtube', owner: 'Lucas Oliveira', category: 'Communications', creationDate: '28/03/2025', duration: '--.--', enrolled: 0, finished: 0, status: 'Em Criação' },
    { id: '9', thumbnailUrl: '', name: 'dfdgergerger', owner: 'Super Admin', category: 'Communications', creationDate: '13/12/2023', duration: '--.--', enrolled: 0, finished: 0, status: 'Em Criação' },
    { id: '10', thumbnailUrl: 'logo', name: 'Test 888', owner: 'Super Admin', category: 'Entrepreneurship', creationDate: '23/02/2024', duration: '--.--', enrolled: 0, finished: 0, status: 'Em Criação' },
];

const sampleCourseTemplates = [
    { name: 'Introdução ao Marketing Digital', category: 'Marketing', status: 'Publicado' as const },
    { name: 'Gestão de Projetos com Scrum', category: 'Development', status: 'Em Criação' as const },
    { name: 'Design Thinking para Inovação', category: 'Design', status: 'Publicado' as const },
    { name: 'Comunicação Interpessoal', category: 'Communications', status: 'Em Criação' as const },
    { name: 'Fundamentos de Finanças', category: 'Entrepreneurship', status: 'Publicado' as const },
];

const owners = ['Super Admin', 'Admin testerSTAGE', 'Bolivar', 'Lucas Oliveira', 'Maria Fernanda'];

const generatedCourses: Course[] = Array.from({ length: 111 }, (_, i) => {
    const template = sampleCourseTemplates[i % sampleCourseTemplates.length];
    const owner = owners[i % owners.length];
    const creation = new Date(Date.now() - Math.random() * 3e10); // Random date in the last year
    return {
        id: (i + 11).toString(),
        thumbnailUrl: i % 7 === 0 ? `https://picsum.photos/seed/${i}/40/40` : '',
        name: `${template.name} v${Math.floor(i / 5) + 1.0}`,
        owner: owner,
        category: template.category,
        creationDate: creation.toLocaleDateString('pt-BR'),
        duration: `${Math.floor(Math.random() * 3)} h ${Math.floor(Math.random() * 60)} min`,
        enrolled: Math.floor(Math.random() * 200),
        finished: Math.floor(Math.random() * 150),
        status: template.status,
    };
});


export const COURSES: Course[] = [...specificCourses, ...generatedCourses];
