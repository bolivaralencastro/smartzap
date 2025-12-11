import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
    chart: string;
}

mermaid.initialize({
    startOnLoad: true,
    theme: 'base',
    themeVariables: {
        primaryColor: '#e0e7ff',
        primaryTextColor: '#1e1b4b',
        primaryBorderColor: '#4338ca',
        lineColor: '#6366f1',
        secondaryColor: '#f0fdf4',
        tertiaryColor: '#fff',
    },
    securityLevel: 'loose',
});

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            // Resetar o conteúdo para garantir que o mermaid processe novamente
            ref.current.removeAttribute('data-processed');
            ref.current.innerHTML = chart;

            mermaid.run({
                nodes: [ref.current],
            }).catch(err => console.error('Mermaid error:', err));
        }
    }, [chart]);

    return (
        <div ref={ref} className="mermaid overflow-x-auto p-4 flex justify-center">
            {chart}
        </div>
    );
};
