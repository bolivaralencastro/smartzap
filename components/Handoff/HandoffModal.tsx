import React, { useEffect, useState } from 'react';
import { Icon } from '../Icon';
import { StoryMapData, Story, Link } from '../StoryMapping/types';
import { StoryMapView } from './views/StoryMapView';
import { FlowchartView } from './views/FlowchartView';
import { DesignRequirementsView } from './views/DesignRequirementsView';
import { PreviewView } from './views/PreviewView';

export interface HandoffModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: StoryMapData | null;
    onInternalLinkClick?: (target: string) => void;
}

type ViewMode = 'storymap' | 'flowchart' | 'design' | 'preview';

export const HandoffModal: React.FC<HandoffModalProps> = ({ isOpen, onClose, data, onInternalLinkClick }) => {
    const [viewMode, setViewMode] = useState<ViewMode>('storymap');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setViewMode('storymap');
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleLinkClick = (link: Link) => {
        if (link.type === 'internal' && onInternalLinkClick) {
            onInternalLinkClick(link.url.replace('app://', ''));
            onClose();
        } else {
            window.open(link.url, '_blank');
        }
    };

    const tabs = [
        { id: 'storymap' as ViewMode, label: 'Story Mapping', icon: 'map' },
        { id: 'flowchart' as ViewMode, label: 'Fluxograma', icon: 'account_tree' },
        { id: 'design' as ViewMode, label: 'Design', icon: 'palette' },
        { id: 'preview' as ViewMode, label: 'Simulação', icon: 'smartphone' },
    ];

    return (
        <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center animate-fadeIn p-1" onClick={onClose}>
            <div
                className="bg-white w-full h-full max-w-[98vw] max-h-[98vh] rounded-lg shadow-2xl flex flex-col overflow-hidden animate-scaleUp"
                onClick={e => e.stopPropagation()}
            >
                {/* Header - Minimalist Tech Style */}
                <div className="flex items-center justify-between border-b border-gray-200 bg-white flex-shrink-0">
                    {/* Left: Logo + Title */}
                    <div className="flex items-center gap-3 px-6 py-3.5">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-md flex items-center justify-center">
                            <Icon name="handshake" className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Handoff</h2>
                            <p className="text-xs text-gray-500 font-medium">{data?.title || 'Documentação do projeto'}</p>
                        </div>
                    </div>

                    {/* Center: Tabs Container - Small & Discrete */}
                    <div className="flex-1 flex items-center justify-center px-6">
                        <div className="inline-flex items-center gap-1 bg-gray-50 rounded-md p-1 border border-gray-200">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setViewMode(tab.id)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all text-xs font-medium ${viewMode === tab.id
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    <Icon name={tab.icon} className="text-[14px]" />
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Close Button */}
                    <div className="px-6">
                        <button
                            onClick={onClose}
                            className="w-9 h-9 flex items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                        >
                            <Icon name="close" size="sm" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto">
                    {viewMode === 'storymap' && <StoryMapView
                        data={data}
                        onLinkClick={handleLinkClick}
                        onDeepLinkClick={(target) => {
                            if (onInternalLinkClick) {
                                onInternalLinkClick(target);
                            }
                        }}
                    />}
                    {viewMode === 'flowchart' && <FlowchartView data={data} />}
                    {viewMode === 'design' && <DesignRequirementsView data={data} />}
                    {viewMode === 'preview' && <PreviewView data={data} />}
                </div>
            </div>

            <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out forwards; }
        @keyframes scaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-scaleUp { animation: scaleUp 0.2s ease-out forwards; }
      `}</style>
        </div>
    );
};
