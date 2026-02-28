import React from 'react';
import Nav from './Nav';
import { NavLink } from 'react-router-dom';
import { LlmTooltip } from '../ui/LlmTooltip';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-text-primary selection:bg-accent/10 selection:text-accent">
      <Nav />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          {children}
        </div>
      </main>

      <footer className="w-full border-t border-border bg-surface py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="text-text-secondary text-sm space-y-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent font-serif font-bold text-lg">L</span>
                <span className="font-serif font-bold text-lg text-text-primary tracking-tight">Lingua<span className="font-light italic text-accent">Metrics</span></span>
              </div>
              <p className="font-medium text-text-primary">© {new Date().getFullYear()} Алекс Есипенко</p>
              <p className="leading-relaxed">
                Казанский федеральный университет<br />
                Институт международных отношений и востоковедения<br />
                Направление: Перевод и Переводоведение
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-1">Проект</h4>
                <NavLink to="/" className="text-sm text-text-secondary hover:text-accent transition-colors">Обзор</NavLink>
                <NavLink to="/methodology" className="text-sm text-text-secondary hover:text-accent transition-colors">Методология</NavLink>
                <NavLink to="/prompts" className="text-sm text-text-secondary hover:text-accent transition-colors">Промпты</NavLink>
                <NavLink to="/evidence" className="text-sm text-text-secondary hover:text-accent transition-colors">Доказательная база</NavLink>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary mb-1">Модели</h4>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-text-secondary"><LlmTooltip name="Claude 4.6 Opus">Claude 4.6 Opus</LlmTooltip></span>
                  <span className="text-sm text-text-secondary"><LlmTooltip name="Gemini 3.1 Pro">Gemini 3.1 Pro</LlmTooltip></span>
                  <span className="text-sm text-text-secondary"><LlmTooltip name="GigaChat 2 Max">GigaChat 2 MAX</LlmTooltip></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
