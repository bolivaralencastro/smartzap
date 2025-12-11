import React, { useState } from 'react';
import { MermaidDiagram } from '../../MermaidDiagram';

const mainFlowChart = `
graph TD
    start(Pré-Inscrição: Web/Integração) --> welcome_msg[Mensagem de Boas-vindas]
    welcome_msg --> confirm_action{Deseja confirmar?}
    confirm_action -->|Sim| confirmed_msg[Matrícula Confirmada]
    confirmed_msg --> content_delivery(Sistema: Entrega de Conteúdo)
    content_delivery --> content_msg[Mensagem com Conteúdo]
    content_msg --> next_content_action{Ação}
    next_content_action -->|Solicitar Próximo| content_delivery
    next_content_action -->|Responder Quiz| quiz_flow(Fluxo de Quiz)
    quiz_flow --> certificate[Conclusão: Emitir Certificado]
    
    style start fill:#f3f4f6,stroke:#9ca3af,stroke-width:2px
    style welcome_msg fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style confirm_action fill:#dbeafe,stroke:#2563eb,stroke-width:2px
    style confirmed_msg fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style content_delivery fill:#f3f4f6,stroke:#9ca3af,stroke-width:2px
    style content_msg fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style next_content_action fill:#dbeafe,stroke:#2563eb,stroke-width:2px
    style quiz_flow fill:#f3e8ff,stroke:#9333ea,stroke-width:2px
    style certificate fill:#dcfce7,stroke:#16a34a,stroke-width:2px
`;

const quizFlowChart = `
graph TD
    quiz_invite[Convite para Quiz: Link] --> web_view(SmartZap View: Web App)
    web_view -->|Responde Perguntas| success_screen[Tela de Sucesso/Agradecimento]
    success_screen -->|Clica em Retornar| whatsapp_return[Retorno ao WhatsApp]
    
    style quiz_invite fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style web_view fill:#f3e8ff,stroke:#9333ea,stroke-width:2px
    style success_screen fill:#f3e8ff,stroke:#9333ea,stroke-width:2px
    style whatsapp_return fill:#dcfce7,stroke:#16a34a,stroke-width:2px
`;

const engagementFlowChart = `
graph TD
    inactivity(Sistema: 24h Inatividade) --> nudge_msg[Mensagem de Engajamento]
    nudge_msg --> resume_action{Retomar?}
    resume_action -->|Sim| next_content(Próximo Conteúdo)
    
    style inactivity fill:#f3f4f6,stroke:#9ca3af,stroke-width:2px
    style nudge_msg fill:#dcfce7,stroke:#16a34a,stroke-width:2px
    style resume_action fill:#dbeafe,stroke:#2563eb,stroke-width:2px
    style next_content fill:#f3f4f6,stroke:#9ca3af,stroke-width:2px
`;

const creationFlowChart = `
graph TD
    admin_start(Admin: Adicionar Quiz) --> quiz_type_selection{Tipo de Quiz}
    quiz_type_selection -->|Qualitativo| qualitative[Pergunta Aberta]
    quiz_type_selection -->|Quantitativo| quantitative[Múltipla Escolha]
    quiz_type_selection -->|NPS| nps[Pesquisa NPS]
    qualitative --> save_quiz[Salvar e Publicar]
    quantitative --> save_quiz
    nps --> save_quiz
    
    style admin_start fill:#f3f4f6,stroke:#9ca3af,stroke-width:2px
    style quiz_type_selection fill:#dbeafe,stroke:#2563eb,stroke-width:2px
    style qualitative fill:#f3e8ff,stroke:#9333ea,stroke-width:2px
    style quantitative fill:#f3e8ff,stroke:#9333ea,stroke-width:2px
    style nps fill:#f3e8ff,stroke:#9333ea,stroke-width:2px
    style save_quiz fill:#dbeafe,stroke:#2563eb,stroke-width:2px
`;

export const FlowchartView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'main' | 'quiz' | 'engagement' | 'creation'>('main');

    return (
        <div className="h-full flex flex-col bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Fluxogramas de Conversa</h2>
                    <p className="text-sm text-gray-500">Visualização Mermaid dos fluxos (2026)</p>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab('main')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'main' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        Jornada Principal
                    </button>
                    <button
                        onClick={() => setActiveTab('quiz')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'quiz' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        Fluxo de Quiz
                    </button>
                    <button
                        onClick={() => setActiveTab('engagement')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'engagement' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        Engajamento
                    </button>
                    <button
                        onClick={() => setActiveTab('creation')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'creation' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        Criação (Admin)
                    </button>
                </div>
            </div>

            {/* Conteúdo com Scroll */}
            <div className="flex-1 overflow-auto bg-white p-8">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    {activeTab === 'main' && <MermaidDiagram chart={mainFlowChart} />}
                    {activeTab === 'quiz' && <MermaidDiagram chart={quizFlowChart} />}
                    {activeTab === 'engagement' && <MermaidDiagram chart={engagementFlowChart} />}
                    {activeTab === 'creation' && <MermaidDiagram chart={creationFlowChart} />}
                </div>
            </div>
        </div>
    );
};
