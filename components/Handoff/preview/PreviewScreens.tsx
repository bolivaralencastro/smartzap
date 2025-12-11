import React from 'react';
import { Icon } from '../../Icon';

export type MediaType = 'video' | 'podcast' | 'pdf' | 'image' | 'text' | 'quiz';

interface WhatsAppScreenProps {
    type: 'survey' | 'evaluation' | 'nps' | 'content';
    mediaType?: MediaType;
    title?: string;
    description?: string;
    onNextStep: () => void;
}

export const WhatsAppScreen: React.FC<WhatsAppScreenProps> = ({
    type,
    mediaType = 'text',
    title = '[CONTENT_TITLE]',
    description = '[CONTENT_DESCRIPTION]',
    onNextStep
}) => {
    const isContent = type === 'content';

    const getMediaIcon = () => {
        switch (mediaType) {
            case 'video': return 'play_circle';
            case 'podcast': return 'headphones';
            case 'pdf': return 'picture_as_pdf';
            case 'image': return 'image';
            case 'quiz': return 'quiz';
            default: return 'article';
        }
    };

    const getMediaColor = () => {
        switch (mediaType) {
            case 'video': return 'text-red-500';
            case 'podcast': return 'text-purple-500';
            case 'pdf': return 'text-red-600';
            case 'image': return 'text-blue-500';
            default: return 'text-gray-500';
        }
    };

    return (
        <div className="bg-[#0b141a] h-full flex flex-col font-sans text-[#e9edef]">
            {/* Header */}
            <div className="bg-[#202c33] p-3 flex items-center gap-3 shadow-md flex-shrink-0 z-20">
                <button className="text-white"><Icon name="arrow_back" /></button>
                <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs border border-white/10">SZ</div>
                <div className="flex-1">
                    <h3 className="font-semibold text-sm text-white leading-tight">Smartzap Bot</h3>
                    <p className="text-[10px] text-gray-400 leading-tight">Business Account</p>
                </div>
                <div className="flex gap-4 mr-1">
                    <Icon name="videocam" className="text-white" />
                    <Icon name="call" className="text-white" />
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-[#0b141a] relative bg-opacity-95">
                <div className="absolute inset-0 opacity-[0.06] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] pointer-events-none"></div>

                <div className="relative z-10 flex flex-col gap-4">
                    <div className="flex justify-center mb-2">
                        <span className="bg-[#1f2c34] text-[#8696a0] text-[10px] px-2 py-1 rounded-lg uppercase font-medium shadow-sm border border-[#2a3942]">Hoje</span>
                    </div>

                    {/* Mensagem de Conteúdo (se for fluxo de conteúdo) */}
                    {isContent && (
                        <div className="flex flex-col items-start animate-fadeIn">
                            <div className="bg-[#202c33] p-1 rounded-lg rounded-tl-none max-w-[85%] shadow-sm relative text-sm border border-[#2a3942]">
                                <div className="bg-[#1f2c34] rounded overflow-hidden">
                                    {mediaType === 'image' || mediaType === 'video' ? (
                                        <div className="h-32 bg-slate-700 flex items-center justify-center relative">
                                            <Icon name="image" className="text-slate-500 text-4xl" />
                                            {mediaType === 'video' && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                                    <div className="w-10 h-10 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm">
                                                        <Icon name="play_arrow" className="text-white" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="p-3 flex items-center gap-3 border-l-4 border-[#00a884] bg-[#2a3942]/50">
                                            <Icon name={getMediaIcon()} className={`${getMediaColor()} text-2xl`} />
                                            <div className="flex-1 overflow-hidden">
                                                <p className="font-bold text-xs text-gray-200 truncate">{title}</p>
                                                <p className="text-[10px] text-gray-400 truncate">1 arquivo • {mediaType.toUpperCase()}</p>
                                            </div>
                                            <Icon name="download" className="text-gray-400" size="sm" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-2 pb-4">
                                    <p className="text-sm text-gray-100 leading-relaxed">{description}</p>
                                </div>
                                <span className="text-[10px] text-[#8696a0] absolute right-2 bottom-1 flex items-center gap-1">
                                    10:42 <Icon name="done_all" className="text-[#53bdeb] text-[14px]" />
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Mensagem do Bot com Botões */}
                    <div className="flex flex-col items-start animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                        <div className="bg-[#202c33] p-3 rounded-lg rounded-tl-none max-w-[85%] shadow-sm relative text-sm border border-[#2a3942]">
                            <p className="text-[#dba642] font-semibold text-xs mb-1 flex items-center gap-1">
                                🤖 Smartzap Bot
                            </p>

                            {!isContent ? (
                                <>
                                    <p className="mb-2 text-white">Olá! Temos uma nova atividade para você.</p>
                                    <p className="mb-2 text-gray-300 font-medium">{title}</p>
                                    <p className="mb-3 text-gray-400 text-xs">{description}</p>
                                    <p className="font-bold text-sm mb-1 text-white">👇 Acesse pelo link abaixo:</p>
                                    <button onClick={onNextStep} className="text-[#53bdeb] hover:underline break-all text-left block mb-3 cursor-pointer">
                                        https://keeps.page.link/JN3a
                                    </button>
                                </>
                            ) : (
                                <p className="mb-3 text-white">O que você achou deste conteúdo? Selecione uma opção abaixo:</p>
                            )}

                            <div className="mt-1 border-t border-[#2a3942] pt-2 space-y-2">
                                <button onClick={isContent ? onNextStep : undefined} className="w-full text-center text-[#00a884] font-medium py-1.5 hover:bg-[#2a3942] rounded transition-colors flex items-center justify-center gap-2 text-sm bg-[#2a3942]/30">
                                    <Icon name={isContent ? "check_circle" : "reply"} className={isContent ? "" : "rotate-180"} size="sm" />
                                    {isContent ? "Marcar como Concluído" : "Receber conteúdo"}
                                </button>
                                <button className="w-full text-center text-[#00a884] font-medium py-1.5 hover:bg-[#2a3942] rounded transition-colors flex items-center justify-center gap-2 text-sm bg-[#2a3942]/30">
                                    <Icon name="headset_mic" size="sm" /> Suporte
                                </button>
                            </div>

                            <span className="text-[10px] text-[#8696a0] absolute right-2 bottom-2 flex items-center gap-1">
                                10:43 <Icon name="done_all" className="text-[#53bdeb] text-[14px]" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Input */}
            <div className="bg-[#202c33] p-2 flex items-center gap-2 flex-shrink-0 z-20">
                <Icon name="mood" className="text-[#8696a0] ml-1" />
                <Icon name="add" className="text-[#8696a0]" />
                <div className="flex-1 bg-[#2a3942] rounded-lg h-10 px-4 flex items-center text-[#8696a0] text-sm border border-[#2a3942]">Mensagem</div>
                <div className="w-10 h-10 bg-[#00a884] rounded-full flex items-center justify-center shadow-lg hover:bg-[#008f6f] transition-colors cursor-pointer">
                    <Icon name="mic" className="text-white" />
                </div>
            </div>
        </div>
    );
};

interface WebSimulationScreenProps {
    step: 'question' | 'result';
    flowType: 'qualitative' | 'quantitative' | 'evaluation' | 'nps-5' | 'nps-10' | 'content';
    mediaType?: MediaType;
    title?: string;
    description?: string;
    onNextStep: () => void;
    onBackToWhatsapp: () => void;
}

export const WebSimulationScreen: React.FC<WebSimulationScreenProps> = ({
    step,
    flowType,
    mediaType = 'text',
    title = '[TITLE]',
    description = '[DESCRIPTION]',
    onNextStep,
    onBackToWhatsapp
}) => {
    const isEvaluation = flowType === 'evaluation';
    const isQuantitative = flowType === 'quantitative' || flowType === 'evaluation';
    const isNPS = flowType === 'nps-5' || flowType === 'nps-10';
    const isContent = flowType === 'content';

    // Tela de Resultado
    if (step === 'result') {
        const bgColor = isEvaluation ? 'bg-[#1565C0]' : 'bg-[#1976D2]'; // Azul escuro para Quiz, Azul vibrante para Pesquisa (baseado na imagem)

        return (
            <div className={`h-full flex flex-col font-sans text-white ${bgColor} relative overflow-hidden`}>
                {/* Header Aprovado */}
                <div className="h-16 flex items-center justify-between px-4 pt-2 flex-shrink-0 z-10">
                    <button onClick={onBackToWhatsapp} className="bg-[#4CAF50] hover:bg-[#43A047] text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-md transition-colors">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zM12.05 20.21c-1.5 0-2.97-.39-4.27-1.14l-.3-.18-3.15.83.84-3.07-.19-.31a8.154 8.154 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.24-8.22 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.23.24-.39.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.25 1.05.4 1.41.51.6.19 1.14.16 1.58.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.07-.11-.23-.18-.48-.3z" />
                        </svg>
                        Retornar
                    </button>
                    <button className="bg-[#4CAF50] hover:bg-[#43A047] text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-md transition-colors">
                        <Icon name="headset_mic" className="text-sm" /> Suporte
                    </button>
                </div>

                {/* Conteúdo Central */}
                <div className="flex-1 flex flex-col items-center px-8 pt-4 pb-8 text-center animate-fadeIn z-10 overflow-y-auto">

                    {/* Nome do Quiz/Pesquisa */}
                    <h3 className="text-white/90 text-xs font-bold uppercase tracking-wider mb-8">
                        {title || (isEvaluation ? '[QUIZ_NAME]' : '[QUIZ_SEARCH_NAME]')}
                    </h3>

                    {/* Logo Area */}
                    <div className="mb-10 w-48 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 flex items-center justify-center">
                        <span className="text-xs font-bold text-white/80 tracking-widest">[WORKSPACE_LOGO]</span>
                    </div>

                    {isEvaluation ? (
                        /* Layout de Sucesso (Quiz) */
                        <>
                            <h2 className="text-3xl font-bold mb-2 leading-tight">Parabéns,</h2>
                            <h2 className="text-3xl font-bold mb-12 leading-tight">Você finalizou o Quiz</h2>

                            <div className="relative mb-auto">
                                {/* Ilustração Troféu (Simulada com Ícone e CSS) */}
                                <div className="relative z-10 transform rotate-[-5deg]">
                                    <Icon name="emoji_events" className="text-yellow-400 text-[120px] drop-shadow-2xl" filled />
                                </div>
                                {/* Mão segurando (Abstrata) */}
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-12 bg-[#FFCC80] rounded-t-xl opacity-0"></div>
                            </div>

                            <div className="mt-8 bg-black/20 px-6 py-3 rounded-full backdrop-blur-md">
                                <p className="text-sm font-bold text-white">Você acertou 3 perguntas de 3</p>
                            </div>
                        </>
                    ) : (
                        /* Layout de Agradecimento (Pesquisa) */
                        <>
                            <h2 className="text-2xl font-bold mb-1 leading-snug">Obrigado por</h2>
                            <h2 className="text-2xl font-bold mb-1 leading-snug">responder, sua</h2>
                            <h2 className="text-2xl font-bold mb-12 leading-snug">opinião é muito</h2>
                            <h2 className="text-2xl font-bold mb-12 leading-snug">importante para nós</h2>

                            <div className="mt-auto mb-8 relative">
                                {/* Ilustração Feedback (Simulada) */}
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
                        </>
                    )}
                </div>
            </div>
        )
    }

    // Tela de Conteúdo (Vídeo, PDF, etc)
    if (isContent) {
        return (
            <div className="bg-gray-50 h-full flex flex-col font-sans text-gray-800 relative">
                <div className="h-14 flex items-center justify-between px-4 bg-white border-b border-gray-200 flex-shrink-0 shadow-sm z-10">
                    <button onClick={onBackToWhatsapp} className="text-gray-500 hover:text-gray-900">
                        <Icon name="close" />
                    </button>
                    <span className="font-semibold text-sm text-gray-700 truncate max-w-[150px]">{title}</span>
                    <button className="text-gray-500 hover:text-gray-900">
                        <Icon name="more_vert" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {/* Media Player / Viewer */}
                    <div className="bg-black w-full aspect-video flex items-center justify-center relative group cursor-pointer">
                        {mediaType === 'video' ? (
                            <>
                                <img src="/api/placeholder/400/225" alt="Video thumbnail" className="w-full h-full object-cover opacity-60" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Icon name="play_arrow" className="text-white text-3xl" filled />
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                                    <div className="h-1 bg-gray-600 rounded-full overflow-hidden">
                                        <div className="h-full w-1/3 bg-red-600"></div>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-white mt-1">
                                        <span>04:20</span>
                                        <span>12:45</span>
                                    </div>
                                </div>
                            </>
                        ) : mediaType === 'image' ? (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <Icon name="image" className="text-gray-400 text-4xl" />
                            </div>
                        ) : mediaType === 'pdf' ? (
                            <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center gap-2">
                                <Icon name="picture_as_pdf" className="text-red-500 text-4xl" />
                                <span className="text-xs text-gray-500">Visualizador de PDF</span>
                            </div>
                        ) : (
                            <div className="w-full h-full bg-purple-900 flex items-center justify-center">
                                <Icon name="headphones" className="text-white/50 text-4xl" />
                            </div>
                        )}
                    </div>

                    <div className="p-6">
                        <h1 className="text-xl font-bold text-gray-900 mb-2">{title}</h1>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
                            <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium uppercase">{mediaType}</span>
                            <span>•</span>
                            <span>12 min de leitura</span>
                        </div>

                        <div className="prose prose-sm max-w-none text-gray-600">
                            <p>{description}</p>
                            <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
                    <button onClick={onNextStep} className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                        <span>Próximo</span>
                        <Icon name="arrow_forward" size="sm" />
                    </button>
                </div>
            </div>
        );
    }

    // Tela de Questão (Quiz/Survey/NPS)
    return (
        <div className="bg-gray-50 h-full flex flex-col font-sans text-gray-800 relative">
            <div className="h-14 flex items-center justify-between px-4 bg-white border-b border-gray-200 flex-shrink-0 shadow-sm z-10">
                <button onClick={onBackToWhatsapp} className="text-gray-500 hover:text-gray-900 flex items-center gap-1 text-xs font-medium">
                    <Icon name="chevron_left" /> Voltar
                </button>
                <div className="flex gap-1">
                    <div className="w-8 h-1 bg-purple-600 rounded-full"></div>
                    <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
                    <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
                </div>
                <div className="w-6"></div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col w-full">
                <div className="mb-8">
                    <span className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2 block">{isEvaluation ? 'Quiz Avaliativo' : 'Pesquisa'}</span>
                    <h2 className="text-xl font-bold text-gray-900 leading-tight">{description}</h2>
                </div>

                <div className="w-full space-y-3 flex-1">
                    {isQuantitative ? (
                        <>
                            {['Opção A: Resposta correta', 'Opção B: Alternativa incorreta', 'Opção C: Outra alternativa', 'Opção D: Nenhuma das anteriores'].map((opt, i) => (
                                <button key={i} onClick={onNextStep} className="w-full p-4 border-2 border-gray-200 rounded-xl text-gray-700 font-medium text-left hover:border-purple-500 hover:bg-purple-50 transition-all shadow-sm bg-white group flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-purple-500 flex items-center justify-center flex-shrink-0">
                                        <div className="w-3 h-3 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                    {opt}
                                </button>
                            ))}
                        </>
                    ) : isNPS ? (
                        <div className="flex flex-col items-center justify-center py-8">
                            <div className="flex flex-wrap gap-2 justify-center mb-6 max-w-[280px]">
                                {Array.from({ length: flowType === 'nps-5' ? 5 : 10 }, (_, i) => i + 1).map((num) => (
                                    <button key={num} onClick={onNextStep} className={`w-10 h-10 rounded-lg font-bold text-sm shadow-sm transition-all transform hover:scale-110 ${num <= 6 ? 'bg-red-100 text-red-600 hover:bg-red-500 hover:text-white' :
                                        num <= 8 ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-500 hover:text-white' :
                                            'bg-green-100 text-green-600 hover:bg-green-500 hover:text-white'
                                        }`}>
                                        {num}
                                    </button>
                                ))}
                            </div>
                            <div className="flex justify-between w-full text-xs font-medium text-gray-400 px-4">
                                <span>Pouco provável</span>
                                <span>Muito provável</span>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col">
                            <textarea className="w-full h-40 border-2 border-gray-200 rounded-xl p-4 text-gray-700 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all resize-none shadow-inner placeholder-gray-400" placeholder="Digite sua resposta aqui..."></textarea>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
                <button onClick={onNextStep} className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-purple-700 transition-colors">
                    {isQuantitative ? 'Confirmar Resposta' : 'Enviar'}
                </button>
            </div>
        </div>
    );
};

