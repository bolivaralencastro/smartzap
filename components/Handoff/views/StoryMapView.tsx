import React, { useEffect, useState } from 'react';
import { Icon } from '../../Icon';
import { StoryMapData, Link } from '../../StoryMapping/types';

interface StoryMapViewProps {
    data: StoryMapData | null;
    onLinkClick: (link: Link) => void;
    onDeepLinkClick?: (target: string) => void;
}

interface StoryCard {
    id: string;
    title: string;
    description: string;
    version?: string;
    status: boolean;
    linkTarget?: string;
}

interface StoryColumn {
    id: string;
    title: string;
    color: string;
    stories: StoryCard[];
}

export const StoryMapView: React.FC<StoryMapViewProps> = ({ onDeepLinkClick }) => {
    const [columns, setColumns] = useState<StoryColumn[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Parser de Markdown simples
    const parseMarkdown = (text: string): StoryColumn[] => {
        const cols: StoryColumn[] = [];
        const columnBlocks = text.split(/^## /m).slice(1); // Ignora o título principal

        columnBlocks.forEach((block, colIndex) => {
            const lines = block.split('\n');
            const header = lines[0].trim();
            const titleMatch = header.match(/^(.*?)\s*\((.*?)\)$/);
            const title = titleMatch ? titleMatch[1] : header;
            const colorName = titleMatch ? titleMatch[2] : 'gray';

            // Mapear nomes de cores para classes Tailwind
            const colorMap: Record<string, string> = {
                yellow: 'bg-yellow-100 border-yellow-200 text-yellow-800',
                blue: 'bg-blue-100 border-blue-200 text-blue-800',
                purple: 'bg-purple-100 border-purple-200 text-purple-800',
                gray: 'bg-gray-100 border-gray-200 text-gray-800',
            };
            const colorClass = colorMap[colorName] || colorMap['gray'];

            const storyBlocks = block.split(/^### /m).slice(1);
            const stories: StoryCard[] = storyBlocks.map((storyBlock, storyIndex) => {
                const storyLines = storyBlock.split('\n');
                const storyTitle = storyLines[0].trim();

                let version = '';
                let status = false;
                let linkTarget = '';
                let descriptionLines: string[] = [];

                // Processar metadados e descrição
                for (let i = 1; i < storyLines.length; i++) {
                    const line = storyLines[i].trim();
                    if (line.startsWith('- Status:')) {
                        status = line.includes('[x]');
                    } else if (line.startsWith('- Versão:')) {
                        version = line.replace('- Versão:', '').trim();
                    } else if (line.startsWith('- Link:')) {
                        linkTarget = line.replace('- Link:', '').trim();
                    } else if (line !== '') {
                        descriptionLines.push(line);
                    }
                }

                return {
                    id: `${colIndex}-${storyIndex}`,
                    title: storyTitle,
                    description: descriptionLines.join('\n').trim(),
                    version,
                    status,
                    linkTarget
                };
            });

            cols.push({
                id: `col-${colIndex}`,
                title,
                color: colorClass,
                stories
            });
        });

        return cols;
    };

    useEffect(() => {
        const loadMarkdown = async () => {
            try {
                const response = await fetch(`${import.meta.env.BASE_URL}STORY_MAPPING.md`);
                if (!response.ok) throw new Error('Arquivo STORY_MAPPING.md não encontrado');
                const text = await response.text();
                const parsedColumns = parseMarkdown(text);
                setColumns(parsedColumns);
            } catch (err) {
                console.error('Erro ao carregar story mapping:', err);
                setError('Erro ao carregar dados do Story Mapping');
            } finally {
                setIsLoading(false);
            }
        };

        loadMarkdown();
    }, []);

    const toggleStatus = (colId: string, storyId: string) => {
        setColumns(prev => prev.map(col => {
            if (col.id !== colId) return col;
            return {
                ...col,
                stories: col.stories.map(story => {
                    if (story.id !== storyId) return story;
                    return { ...story, status: !story.status };
                })
            };
        }));
    };

    if (isLoading) return <div className="p-8 text-center text-gray-500">Carregando Story Mapping...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
            {/* Header / Toolbar */}
            <div className="px-6 py-3 bg-white border-b border-gray-200 flex items-center justify-between flex-shrink-0">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Story Mapping</h3>
                    <p className="text-xs text-gray-500">Fluxo de Pesquisas e Avaliações 2026</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-yellow-50 text-yellow-700 border border-yellow-100">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        Planejamento
                    </span>
                    <span className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-green-50 text-green-700 border border-green-100">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        Aprovado
                    </span>
                </div>
            </div>

            {/* Board Area */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
                <div className="flex gap-6 h-full min-w-max">
                    {columns.map(column => (
                        <div key={column.id} className="w-80 flex flex-col h-full">
                            {/* Column Header */}
                            <div className={`p-3 rounded-t-lg border-b-0 border ${column.color} font-bold text-sm uppercase tracking-wide flex items-center justify-between shadow-sm`}>
                                {column.title}
                                <span className="bg-white/50 px-2 py-0.5 rounded text-[10px] font-extrabold opacity-70">
                                    {column.stories.length}
                                </span>
                            </div>

                            {/* Column Content */}
                            <div className="bg-gray-100/50 border-x border-b border-gray-200 rounded-b-lg p-3 flex-1 overflow-y-auto space-y-3 shadow-inner">
                                {column.stories.map(story => (
                                    <div key={story.id} className={`bg-white p-4 rounded-lg shadow-sm border transition-all group relative ${story.status ? 'border-green-200 bg-green-50/30' : 'border-gray-200 hover:shadow-md'}`}>

                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={story.status}
                                                    onChange={() => toggleStatus(column.id, story.id)}
                                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer w-4 h-4"
                                                />
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                                    {story.id}
                                                </span>
                                            </div>
                                            {story.version && (
                                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-medium border border-gray-200">
                                                    {story.version}
                                                </span>
                                            )}
                                        </div>

                                        <h4 className={`font-bold text-sm mb-3 leading-tight transition-colors ${story.status ? 'text-gray-500 line-through' : 'text-gray-800 group-hover:text-indigo-600'}`}>
                                            {story.title}
                                        </h4>

                                        <div className={`text-xs space-y-1 whitespace-pre-line leading-relaxed border-t border-gray-50 pt-2 ${story.status ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {story.description}
                                        </div>

                                        {/* Botão de Deep Linking */}
                                        {story.linkTarget && onDeepLinkClick && (
                                            <div className="mt-4 pt-2 border-t border-gray-100 flex justify-end">
                                                <button
                                                    onClick={() => onDeepLinkClick(story.linkTarget!)}
                                                    className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full hover:bg-indigo-100 transition-all hover:scale-105 animate-pulse"
                                                    title="Ver na Aplicação"
                                                >
                                                    <Icon name="open_in_new" size="sm" />
                                                    Ver na App
                                                </button>
                                            </div>
                                        )}

                                        <div className="mt-3 pt-2 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded p-1">
                                            <button className="text-gray-400 hover:text-indigo-600" title="Editar">
                                                <Icon name="edit" size="sm" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Add Card Placeholder */}
                                <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 text-xs font-medium hover:border-gray-400 hover:text-gray-500 transition-colors flex items-center justify-center gap-1">
                                    <Icon name="add" size="sm" /> Adicionar História
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
