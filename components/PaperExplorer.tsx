
import React, { useState, useRef, useEffect } from 'react';
import { getAIExplanation } from '../services/geminiService';
import { PAPER_INFO } from '../constants';

const PaperExplorer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!query.trim()) return;
    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    
    const aiResp = await getAIExplanation(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: aiResp }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 text-white p-4">
        <h3 className="text-sm font-bold truncate">导师：{PAPER_INFO.title}</h3>
        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">学术研究交互空间</p>
      </div>

      {/* Findings List */}
      <div className="p-4 bg-slate-50 border-b border-slate-200">
        <h4 className="text-xs font-bold text-slate-700 mb-2 flex items-center">
          <i className="fa-solid fa-flask mr-2 text-teal-600"></i>
          核心科研发现
        </h4>
        <ul className="space-y-2">
          {PAPER_INFO.findings.map((f, i) => (
            <li key={i} className="text-[11px] text-slate-600 flex items-start">
              <span className="mr-2 text-teal-500">●</span> {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat History */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60 text-center">
            <i className="fa-solid fa-graduation-cap text-4xl mb-4"></i>
            <p className="text-xs">你好！我是你的医学编程导师。<br/>你可以问我：“什么是自编码器？”<br/>或者“为什么视觉脑区对诊断很重要？”</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed ${
              m.role === 'user' 
              ? 'bg-teal-600 text-white rounded-tr-none shadow-sm' 
              : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 rounded-lg p-3 text-xs text-slate-500 rounded-tl-none animate-pulse italic">
              正在研读文献并整理思绪...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入你的科学疑问..."
            className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-700 text-white p-2 w-10 rounded-lg transition-colors disabled:opacity-50"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaperExplorer;
