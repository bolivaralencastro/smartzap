
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CoursesPage } from './components/courses/CoursesPage';
import { CreateCoursePage } from './components/courses/CreateCoursePage';
import { HandoffModal } from './components/Handoff';
import { useStoryMapping } from './components/StoryMapping';

const App: React.FC = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [view, setView] = useState<'list' | 'create'>('create');
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [highlightTarget, setHighlightTarget] = useState<string | undefined>(undefined);

  // Fetch roadmap data once at app level or when needed
  const { data: roadmapData } = useStoryMapping('/roadmap.md');

  const handleInternalLink = (target: string) => {
    setIsRoadmapOpen(false);

    if (['quiz-eval', 'nps', 'result', 'whatsapp'].includes(target)) {
      setView('create');
      setHighlightTarget(target);
      // Remove o destaque após 5 segundos para não ficar persistente
      setTimeout(() => setHighlightTarget(undefined), 5000);
    } else if (target === 'create-course') {
      setView('create');
      setHighlightTarget(undefined);
    } else if (target === 'courses-list') {
      setView('list');
      setHighlightTarget(undefined);
    }
  };

  // Keyboard Shortcuts Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignorar se o usuário estiver digitando em um input ou textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      // 'S' -> Toggle Story Mapping / Roadmap
      if (e.key.toLowerCase() === 's') {
        e.preventDefault(); // Previne salvar página web se for Ctrl+S, mas aqui é só S
        setIsRoadmapOpen((prev) => !prev);
      }

      // 'F' -> Toggle Fullscreen
      if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch((err) => {
            console.error(`Error attempting to enable fullscreen: ${err.message}`);
          });
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="flex h-screen bg-white text-gray-800 transition-colors duration-300">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setSidebarCollapsed(prev => !prev)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            onToggleSidebar={() => setSidebarCollapsed(prev => !prev)}
          />
          <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50">
            {view === 'list' ? (
              <CoursesPage onCreateCourse={() => setView('create')} />
            ) : (
              <CreateCoursePage
                onBack={() => setView('list')}
                highlightTarget={highlightTarget}
              />
            )}
          </main>
        </div>
      </div>

      <HandoffModal
        isOpen={isRoadmapOpen}
        onClose={() => setIsRoadmapOpen(false)}
        data={roadmapData}
        onInternalLinkClick={handleInternalLink}
      />
    </>
  );
};

export default App;
