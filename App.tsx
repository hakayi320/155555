
import React from 'react';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import XAIBenchmark from './components/XAIBenchmark';
import BrainRegionsTable from './components/BrainRegionsTable';
import XAIBuilder from './components/XAIBuilder';
import { XAI_KNOWLEDGE_BASE, XAI_EVOLUTION_STAGES } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* 导航栏 */}
      <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-500/40 transform -rotate-6">
              <i className="fa-solid fa-microchip text-lg"></i>
            </div>
            <div>
              <h1 className="text-lg font-black text-white leading-none tracking-tight">XAI 结构实验室</h1>
              <span className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">Explainable AI Structural Dynamics</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="bg-slate-800 text-teal-400 text-[10px] px-3 py-1.5 rounded-full border border-teal-500/30 flex items-center gap-2 font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse shadow-[0_0_8px_#2dd4bf]"></span>
              引擎状态：实时模拟中
            </span>
          </div>
        </div>
      </nav>

      {/* 主内容区 - 采用更宽的单栏布局 */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10 space-y-12">
        
        {/* 顶部介绍 */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-10 -mt-10 transition-all group-hover:scale-110"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tighter">{XAI_KNOWLEDGE_BASE.title}</h2>
            <p className="text-sm text-rose-600 font-black mb-6 uppercase tracking-widest">{XAI_KNOWLEDGE_BASE.subtitle}</p>
            <p className="text-sm text-slate-500 leading-relaxed max-w-3xl">
              {XAI_KNOWLEDGE_BASE.intro}
            </p>
          </div>
        </div>

        {/* 核心交互区：XAI 实验室构建器 */}
        <section>
          <XAIBuilder />
        </section>

        {/* 演进时间轴 */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">演进路线图</h3>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {XAI_EVOLUTION_STAGES.map((stage, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">{stage.stage}</span>
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-black border border-indigo-100">
                    0{i + 1}
                  </div>
                </div>
                <h4 className="text-sm font-black text-slate-900 mb-3">{stage.structure}</h4>
                <div className="space-y-4">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[9px] text-slate-400 font-black uppercase mb-1">任务定义</p>
                    <p className="text-[11px] text-slate-700 font-medium">{stage.task}</p>
                  </div>
                  <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                    <p className="text-[9px] text-indigo-400 font-black uppercase mb-1">结构改造</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{stage.action}</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <p className="text-[11px] text-indigo-700 font-bold italic">
                    <i className="fa-solid fa-circle-check mr-2"></i>
                    结果：{stage.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 深度架构与评估 */}
        <section className="space-y-10">
          <ArchitectureDiagram />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <XAIBenchmark />
            <BrainRegionsTable />
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <p className="font-black text-white tracking-widest uppercase text-sm">XAI Structural Dynamics Lab</p>
            <p className="text-slate-500 text-xs">基于 2025 ABIDE 数据集与 eClinicalMedicine 研究设计的教学演示系统</p>
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span className="hover:text-rose-500 transition-colors cursor-pointer">科学协议</span>
            <span className="hover:text-rose-500 transition-colors cursor-pointer">实验室规范</span>
            <span className="hover:text-rose-500 transition-colors cursor-pointer">学术引用</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
