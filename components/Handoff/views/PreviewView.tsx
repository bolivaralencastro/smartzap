import React, { useState } from 'react';
import { Icon } from '../../Icon';
import { StoryMapData } from '../../StoryMapping/types';
import { WhatsAppScreen, WebSimulationScreen, MediaType } from '../preview/PreviewScreens';

interface PreviewViewProps {
    data: StoryMapData | null;
}

type FlowStepId = 'whatsapp' | 'content' | 'question' | 'result';
type FlowType = 'qualitative' | 'quantitative' | 'evaluation' | 'nps-5' | 'nps-10' | 'content';

interface SimulationScenario {
    id: string;
    title: string;
    type: FlowType;
    mediaType?: MediaType;
    description: string;
    steps: { id: FlowStepId; label: string }[];
}

const SCENARIOS: SimulationScenario[] = [
    {
        id: 'quiz-eval',
        title: 'Quiz Avaliativo',
        type: 'evaluation',
        mediaType: 'quiz',
        description: 'Avaliação de conhecimento com feedback imediato',
        steps: [
            { id: 'whatsapp', label: '1. Convite (WhatsApp)' },
            { id: 'question', label: '2. Quiz (Web)' },
            { id: 'result', label: '3. Resultado' }
        ]
    },
    {
        id: 'nps',
        title: 'Pesquisa NPS',
        type: 'nps-10',
        mediaType: 'text',
        description: 'Pesquisa de satisfação Net Promoter Score',
        steps: [
            { id: 'whatsapp', label: '1. Convite (WhatsApp)' },
            { id: 'question', label: '2. Avaliação (Web)' },
            { id: 'result', label: '3. Agradecimento' }
        ]
    },
    {
        id: 'content-video',
        title: 'Conteúdo: Vídeo',
        type: 'content',
        mediaType: 'video',
        description: 'Distribuição de videoaula via link',
        steps: [
            { id: 'whatsapp', label: '1. Entrega (WhatsApp)' },
            { id: 'content', label: '2. Player de Vídeo (Web)' }
        ]
    },
    {
        id: 'content-podcast',
        title: 'Conteúdo: Podcast',
        type: 'content',
        mediaType: 'podcast',
        description: 'Episódio de podcast para consumo em áudio',
        steps: [
            { id: 'whatsapp', label: '1. Entrega (WhatsApp)' },
            { id: 'content', label: '2. Player de Áudio (Web)' }
        ]
    },
    {
        id: 'content-pdf',
        title: 'Conteúdo: E-book PDF',
        type: 'content',
        mediaType: 'pdf',
        description: 'Material de leitura complementar em PDF',
        steps: [
            { id: 'whatsapp', label: '1. Entrega (WhatsApp)' },
            { id: 'content', label: '2. Leitor de PDF (Web)' }
        ]
    },
    {
        id: 'content-image',
        title: 'Conteúdo: Infográfico',
        type: 'content',
        mediaType: 'image',
        description: 'Infográfico visual para fixação de conteúdo',
        steps: [
            { id: 'whatsapp', label: '1. Entrega (WhatsApp)' },
            { id: 'content', label: '2. Visualizador (Web)' }
        ]
    }
];

export const PreviewView: React.FC<PreviewViewProps> = ({ data }) => {
    const [selectedScenario, setSelectedScenario] = useState<SimulationScenario | null>(null);
    const [activeStepId, setActiveStepId] = useState<FlowStepId>('whatsapp');

    const handleScenarioSelect = (scenario: SimulationScenario) => {
        setSelectedScenario(scenario);
        setActiveStepId('whatsapp');
    };

    const handleNextStep = () => {
        if (!selectedScenario) return;

        const currentIndex = selectedScenario.steps.findIndex(s => s.id === activeStepId);
        if (currentIndex < selectedScenario.steps.length - 1) {
            setActiveStepId(selectedScenario.steps[currentIndex + 1].id);
        }
    };

    return (
        <div className="h-full flex overflow-hidden bg-gray-50">
            {/* Sidebar */}
            <aside className="w-80 border-r border-gray-200 flex flex-col bg-white flex-shrink-0 z-10 shadow-sm">
                <div className="p-5 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">Fluxos de Simulação</h3>
                    <p className="text-xs text-gray-500 mt-1">Selecione um cenário para testar a jornada do usuário.</p>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {SCENARIOS.map(scenario => {
                        const isSelected = selectedScenario?.id === scenario.id;
                        return (
                            <div key={scenario.id} className={`rounded-xl transition-all duration-200 border ${isSelected ? 'bg-purple-50 border-purple-200 shadow-sm' : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-200'}`}>
                                <button
                                    onClick={() => handleScenarioSelect(scenario)}
                                    className="w-full text-left p-3 flex items-start gap-3"
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400'}`}>
                                        <Icon
                                            name={scenario.mediaType === 'video' ? 'play_circle' :
                                                scenario.mediaType === 'podcast' ? 'headphones' :
                                                    scenario.mediaType === 'pdf' ? 'picture_as_pdf' :
                                                        scenario.mediaType === 'image' ? 'image' :
                                                            scenario.mediaType === 'quiz' ? 'quiz' : 'article'}
                                            size="sm"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className={`block text-sm font-semibold truncate ${isSelected ? 'text-purple-900' : 'text-gray-700'}`}>{scenario.title}</span>
                                        <span className="block text-xs text-gray-500 truncate mt-0.5">{scenario.description}</span>
                                    </div>
                                </button>

                                {isSelected && (
                                    <div className="px-3 pb-3 pt-0">
                                        <div className="h-px bg-purple-100 w-full mb-3"></div>
                                        <div className="space-y-1">
                                            {scenario.steps.map((step, index) => (
                                                <button
                                                    key={step.id}
                                                    onClick={() => setActiveStepId(step.id)}
                                                    className={`w-full text-left px-3 py-2 flex items-center gap-3 rounded-lg transition-colors text-xs font-medium ${activeStepId === step.id ? 'bg-white text-purple-700 shadow-sm border border-purple-100' : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50/50'}`}
                                                >
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border ${activeStepId === step.id ? 'bg-purple-600 text-white border-purple-600' : 'bg-white border-gray-200 text-gray-400'}`}>
                                                        {index + 1}
                                                    </div>
                                                    {step.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </aside>

            {/* Mobile Mockup Area */}
            <main className="flex-1 flex items-center justify-center bg-gray-100/50 p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>

                <div className="relative bg-gray-900 w-full max-w-[360px] h-[720px] rounded-[45px] shadow-2xl flex flex-col border-[8px] border-gray-900 ring-4 ring-gray-200/50 z-10 transition-all duration-500 ease-in-out transform hover:scale-[1.01]">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50 flex items-center justify-center gap-2">
                        <div className="w-12 h-1.5 bg-gray-800 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                    </div>

                    {/* Screen Content */}
                    <div className="flex-1 bg-white rounded-[35px] overflow-hidden relative w-full h-full">
                        {selectedScenario ? (
                            activeStepId === 'whatsapp' ? (
                                <WhatsAppScreen
                                    type={selectedScenario.type === 'content' ? 'content' : selectedScenario.type === 'evaluation' ? 'evaluation' : selectedScenario.type === 'nps-5' || selectedScenario.type === 'nps-10' ? 'nps' : 'survey'}
                                    mediaType={selectedScenario.mediaType}
                                    title={selectedScenario.title}
                                    description={selectedScenario.description}
                                    onNextStep={handleNextStep}
                                />
                            ) : (
                                <WebSimulationScreen
                                    step={activeStepId === 'result' ? 'result' : 'question'}
                                    flowType={selectedScenario.type}
                                    mediaType={selectedScenario.mediaType}
                                    title={selectedScenario.title}
                                    description={selectedScenario.description}
                                    onNextStep={handleNextStep}
                                    onBackToWhatsapp={() => setActiveStepId('whatsapp')}
                                />
                            )
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50 p-8 text-center">
                                <div className="w-20 h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 animate-bounce">
                                    <Icon name="touch_app" size="lg" className="text-purple-500 opacity-80" />
                                </div>
                                <h3 className="text-gray-900 font-bold text-lg mb-2">Simulador Interativo</h3>
                                <p className="text-sm text-gray-500 leading-relaxed max-w-[200px] mx-auto">Selecione um cenário na barra lateral para iniciar a simulação da jornada.</p>
                            </div>
                        )}
                    </div>

                    {/* Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-500 rounded-full opacity-50"></div>
                </div>
            </main>
        </div>
    );
};

