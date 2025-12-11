import React from 'react';
import { Icon } from '../../Icon';
import { StoryMapData } from '../../StoryMapping/types';

interface DesignRequirementsViewProps {
    data: StoryMapData | null;
}

export const DesignRequirementsView: React.FC<DesignRequirementsViewProps> = ({ data }) => {
    return (
        <div className="h-full bg-gray-50 overflow-y-auto">
            <div className="max-w-6xl mx-auto p-8 space-y-12">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Diretrizes de Design & UX</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Padrões visuais, comportamentos de componentes e especificações de experiência para o SmartZap 2.0.
                    </p>
                </div>

                {/* 2. Component Behavior & UX */}
                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <Icon name="touch_app" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Comportamento & UX</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <h4 className="font-semibold text-gray-900 mb-2">Feedback Visual</h4>
                            <p className="text-sm text-gray-600 mb-4">Elementos interativos devem fornecer resposta imediata.</p>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 active:scale-95 transition-all text-sm font-medium shadow-sm hover:shadow-md">
                                    Hover & Click
                                </button>
                                <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:border-purple-300 hover:text-purple-600 transition-colors text-sm font-medium">
                                    Secondary
                                </button>
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <h4 className="font-semibold text-gray-900 mb-2">Deep Linking Highlight</h4>
                            <p className="text-sm text-gray-600 mb-4">Atenção guiada para elementos alvo de navegação.</p>
                            <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100"></div>
                                <div className="flex-1 h-2 bg-gray-100 rounded"></div>
                                <button className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center ring-4 ring-purple-400 ring-opacity-50 animate-pulse">
                                    <Icon name="add" size="sm" />
                                </button>
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <h4 className="font-semibold text-gray-900 mb-2">Transições Modais</h4>
                            <p className="text-sm text-gray-600 mb-4">Entradas suaves (Fade In + Scale Up) e backdrop blur.</p>
                            <div className="relative h-24 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                                <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
                                <div className="bg-white px-4 py-2 rounded shadow-lg transform scale-100 animate-fadeIn">
                                    <span className="text-xs font-bold">Modal Content</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Mobile Experience (End User) */}
                <section className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg border border-gray-700 p-8 text-white">
                    <div className="flex items-center gap-3 mb-8 border-b border-gray-700 pb-4">
                        <div className="p-2 bg-white/10 rounded-lg text-white">
                            <Icon name="smartphone" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Experiência Mobile (Aluno)</h3>
                            <p className="text-gray-400 text-sm">Foco em telas de NPS e Sucesso (Design Aprovado).</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* NPS/Agradecimento Screen Spec */}
                        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                            <div className="w-[280px] h-[580px] rounded-[2rem] border-8 border-gray-800 overflow-hidden relative shadow-2xl flex-shrink-0">
                                <div className="h-full flex flex-col font-sans text-white bg-[#1976D2] relative overflow-hidden">
                                    {/* Header Aprovado */}
                                    <div className="h-16 flex items-center justify-between px-4 pt-2 flex-shrink-0 z-10">
                                        <button className="bg-[#4CAF50] text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zM12.05 20.21c-1.5 0-2.97-.39-4.27-1.14l-.3-.18-3.15.83.84-3.07-.19-.31a8.154 8.154 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.24-8.22 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.23.24-.39.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.25 1.05.4 1.41.51.6.19 1.14.16 1.58.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.07-.11-.23-.18-.48-.3z" />
                                            </svg>
                                            Retornar
                                        </button>
                                        <button className="bg-[#4CAF50] text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                                            <Icon name="headset_mic" className="text-sm" /> Suporte
                                        </button>
                                    </div>

                                    {/* Conteúdo Central */}
                                    <div className="flex-1 flex flex-col items-center px-8 pt-4 pb-8 text-center animate-fadeIn z-10 overflow-y-auto">
                                        <h3 className="text-white/90 text-xs font-bold uppercase tracking-wider mb-8">
                                            PESQUISA DE SATISFAÇÃO
                                        </h3>

                                        <div className="mb-10 w-48 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 flex items-center justify-center">
                                            <span className="text-xs font-bold text-white/80 tracking-widest">[WORKSPACE_LOGO]</span>
                                        </div>

                                        <h2 className="text-2xl font-bold mb-1 leading-snug">Obrigado por</h2>
                                        <h2 className="text-2xl font-bold mb-1 leading-snug">responder, sua</h2>
                                        <h2 className="text-2xl font-bold mb-12 leading-snug">opinião é muito</h2>
                                        <h2 className="text-2xl font-bold mb-12 leading-snug">importante para nós</h2>

                                        <div className="mt-auto mb-8 relative">
                                            <div className="flex justify-center gap-4 mb-2">
                                                <div className="bg-white text-blue-600 p-2 rounded-lg shadow-lg transform -rotate-12">
                                                    <Icon name="favorite" filled className="text-red-500" />
                                                </div>
                                                <div className="bg-white text-blue-600 p-2 rounded-lg shadow-lg transform translate-y-[-10px]">
                                                    <Icon name="chat" filled className="text-gray-700" />
                                                </div>
                                                <div className="bg-white text-blue-600 p-2 rounded-lg shadow-lg transform rotate-12">
                                                    <Icon name="check" filled className="text-green-500" />
                                                </div>
                                            </div>
                                            <div className="flex justify-center gap-1 opacity-80">
                                                <div className="w-12 h-12 bg-[#FFCC80] rounded-full border-4 border-white/10"></div>
                                                <div className="w-12 h-12 bg-[#FFCC80] rounded-full border-4 border-white/10 transform translate-y-2"></div>
                                                <div className="w-12 h-12 bg-[#FFCC80] rounded-full border-4 border-white/10"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 py-4">
                                <h4 className="text-lg font-bold text-white mb-2">Tela de Agradecimento (Design Aprovado)</h4>
                                <ul className="space-y-3 text-gray-300 text-sm">
                                    <li className="flex gap-2">
                                        <Icon name="check_circle" size="sm" className="text-green-400 mt-0.5" />
                                        <span><strong>Identidade Visual:</strong> Fundo azul vibrante (#1976D2) com tipografia branca para alto contraste e legibilidade.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <Icon name="check_circle" size="sm" className="text-green-400 mt-0.5" />
                                        <span><strong>Navegação:</strong> Botões "Retornar" e "Suporte" no topo, em verde (#4CAF50), seguindo o padrão visual do WhatsApp.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <Icon name="check_circle" size="sm" className="text-green-400 mt-0.5" />
                                        <span><strong>Humanização:</strong> Ilustração com ícones de feedback e avatares abstratos para transmitir comunidade e escuta ativa.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Success/Quiz Screen Spec */}
                        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                            <div className="w-[280px] h-[580px] rounded-[2rem] border-8 border-gray-800 overflow-hidden relative shadow-2xl flex-shrink-0">
                                <div className="h-full flex flex-col font-sans text-white bg-[#1565C0] relative overflow-hidden">
                                    {/* Header Aprovado */}
                                    <div className="h-16 flex items-center justify-between px-4 pt-2 flex-shrink-0 z-10">
                                        <button className="bg-[#4CAF50] text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zM12.05 20.21c-1.5 0-2.97-.39-4.27-1.14l-.3-.18-3.15.83.84-3.07-.19-.31a8.154 8.154 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.24-8.22 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.23.24-.39.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.25 1.05.4 1.41.51.6.19 1.14.16 1.58.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.07-.11-.23-.18-.48-.3z" />
                                            </svg>
                                            Retornar
                                        </button>
                                        <button className="bg-[#4CAF50] text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                                            <Icon name="headset_mic" className="text-sm" /> Suporte
                                        </button>
                                    </div>

                                    {/* Conteúdo Central */}
                                    <div className="flex-1 flex flex-col items-center px-8 pt-4 pb-8 text-center animate-fadeIn z-10 overflow-y-auto">
                                        <h3 className="text-white/90 text-xs font-bold uppercase tracking-wider mb-8">
                                            [QUIZ_NAME]
                                        </h3>

                                        <div className="mb-10 w-48 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 flex items-center justify-center">
                                            <span className="text-xs font-bold text-white/80 tracking-widest">[WORKSPACE_LOGO]</span>
                                        </div>

                                        <h2 className="text-3xl font-bold mb-2 leading-tight">Parabéns,</h2>
                                        <h2 className="text-3xl font-bold mb-12 leading-tight">Você finalizou o Quiz</h2>

                                        <div className="relative mb-auto">
                                            <div className="relative z-10 transform rotate-[-5deg]">
                                                <Icon name="emoji_events" className="text-yellow-400 text-[120px] drop-shadow-2xl" filled />
                                            </div>
                                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-12 bg-[#FFCC80] rounded-t-xl opacity-0"></div>
                                        </div>

                                        <div className="mt-8 bg-black/20 px-6 py-3 rounded-full backdrop-blur-md">
                                            <p className="text-sm font-bold text-white">Você acertou 3 perguntas de 3</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 py-4">
                                <h4 className="text-lg font-bold text-white mb-2">Tela de Sucesso (Design Aprovado)</h4>
                                <ul className="space-y-3 text-gray-300 text-sm">
                                    <li className="flex gap-2">
                                        <Icon name="check_circle" size="sm" className="text-green-400 mt-0.5" />
                                        <span><strong>Celebração:</strong> Fundo azul escuro (#1565C0) destaca o troféu dourado gigante, criando um momento de vitória impactante.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <Icon name="check_circle" size="sm" className="text-green-400 mt-0.5" />
                                        <span><strong>Clareza de Resultado:</strong> Feedback de pontuação ("3 de 3") em destaque no rodapé com fundo translúcido.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <Icon name="check_circle" size="sm" className="text-green-400 mt-0.5" />
                                        <span><strong>Consistência:</strong> Mantém o layout de header e logo, reforçando a marca mesmo na tela de sucesso.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};
