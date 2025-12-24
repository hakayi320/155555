
import React, { useState, useEffect } from 'react';
import { XAI_MODULES } from '../constants';
import { XAIAccessory, XAIModule } from '../types';

const XAIBuilder: React.FC = () => {
  const [activeModule, setActiveModule] = useState<XAIModule | null>(null);
  const [animStep, setAnimStep] = useState(0);

  // 模拟动画步进，用于所有动画的循环
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimStep((s) => (s + 2) % 100); // 增加步进速度，使扫视更有力
    }, 40);
    return () => clearInterval(timer);
  }, []);

  // 渲染不同的逻辑动画
  const renderLogicAnimation = () => {
    if (!activeModule) {
      return (
        <div className="flex flex-col items-center opacity-40">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700 animate-pulse">
            <i className="fa-solid fa-layer-group text-3xl text-slate-500"></i>
          </div>
          <p className="mt-4 text-[10px] text-slate-500 font-mono tracking-[0.4em] uppercase">Ready to Inject Module</p>
        </div>
      );
    }

    switch (activeModule.id) {
      case 'sparsity':
        return (
          <div className="relative w-72 h-48 flex items-center justify-between px-10 bg-slate-900/50 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
            {/* 左侧：输入特征神经元 */}
            <div className="flex flex-col gap-4 relative z-10">
              {[1, 2, 3, 4, 5].map(i => {
                const isWinner = i === 3;
                // 当扫视线没到 20% 时，所有节点保持原样；扫视过后，非核心节点变暗
                const nodeActive = animStep < 20 || isWinner || animStep < 20 + i * 5;
                return (
                  <div 
                    key={i} 
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      nodeActive ? 'bg-slate-300' : 'bg-slate-700'
                    } ${isWinner && animStep > 80 ? 'bg-teal-400 shadow-[0_0_12px_#2dd4bf] scale-125' : ''}`}
                  ></div>
                );
              })}
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="taxGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>

              {[1, 2, 3, 4, 5].map(i => {
                const isWinner = i === 3;
                // 连线主要跨越 25% 到 75% 的区域
                // 我们让扫视线 (animStep) 与连线的消失精确同步
                const lineProgress = (animStep - 20) / 60; // 在 animStep 为 20-80 期间进行“收税”
                
                let lineOpacity = isWinner ? 1 : 0.6;
                if (!isWinner) {
                  // 扫视线位置对应的触发点：越靠上的线越早被“扫描”
                  const lineTriggerPoint = 20 + (i * 8); 
                  if (animStep > lineTriggerPoint) {
                    // 扫过之后，不重要的连线迅速消失
                    lineOpacity = Math.max(0, 0.6 - (animStep - lineTriggerPoint) / 10);
                  }
                }

                return (
                  <line 
                    key={i}
                    x1="28%" y1={`${i * 20 - 10}%`} 
                    x2="72%" y2="50%" 
                    stroke={isWinner ? "#2dd4bf" : "#475569"} 
                    strokeWidth={isWinner ? "3" : "1.5"}
                    opacity={lineOpacity}
                    className="transition-opacity duration-150"
                  />
                );
              })}
              
              {/* 红色收税扫视线 */}
              <rect 
                x={`${animStep}%`} 
                y="0" 
                width="4%" 
                height="100%" 
                fill="url(#taxGradient)" 
                opacity={animStep > 5 && animStep < 95 ? 0.7 : 0}
              />
            </svg>

            {/* 右侧：决策核心 */}
            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-2xl bg-slate-800 border-2 flex items-center justify-center shadow-xl transition-all duration-500 ${
                animStep > 80 ? 'border-teal-500 bg-slate-800' : 'border-slate-700'
              }`}>
                <i className={`fa-solid fa-brain text-lg ${
                  animStep > 80 ? 'text-teal-400 animate-pulse' : 'text-slate-600'
                }`}></i>
              </div>
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                 {animStep > 15 && animStep < 85 && (
                   <div className="flex flex-col items-center">
                     <span className="text-[8px] font-black text-rose-500 animate-pulse uppercase tracking-widest bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/30">
                       L1 惩罚执行中 (收税)
                     </span>
                     <div className="w-px h-4 bg-rose-500/40 mt-1"></div>
                   </div>
                 )}
              </div>
            </div>
          </div>
        );
      case 'lime':
        return (
          <div className="relative w-56 h-36 overflow-hidden border border-slate-700 rounded-2xl bg-slate-900/40 shadow-inner">
            <svg className="absolute inset-0 w-full h-full">
              <path d="M 0 100 Q 50 20, 100 100 T 220 100" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />
              {Array.from({length: 12}).map((_, i) => (
                <circle 
                  key={i} 
                  cx={100 + Math.sin(i + animStep/8) * 25} 
                  cy={60 + Math.cos(i + animStep/8) * 25} 
                  r="2" 
                  fill={i % 3 === 0 ? "#2dd4bf" : "#f43f5e"}
                  className="animate-pulse"
                  style={{animationDelay: `${i*150}ms`}}
                />
              ))}
              <line 
                x1="70" y1="30" 
                x2="140" y2="80" 
                stroke="#2dd4bf" 
                strokeWidth="3" 
                strokeLinecap="round"
                className="animate-pulse"
              />
            </svg>
            <div className="absolute bottom-2 left-2 text-[8px] text-teal-400 px-1.5 py-0.5 bg-teal-950/40 border border-teal-500/30 rounded uppercase font-bold tracking-widest">Local Proxy Active</div>
          </div>
        );
      case 'shap':
        return (
          <div className="w-full px-16 flex flex-col items-center gap-6">
            <div className="w-full h-3 bg-slate-800 rounded-full relative overflow-hidden border border-slate-700 shadow-inner">
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white z-10 shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
              <div 
                className="absolute right-1/2 h-full bg-gradient-to-l from-rose-500 to-rose-700 transition-all duration-500 rounded-l-full" 
                style={{width: `${15 + Math.sin(animStep/10)*5}%`, marginRight: '1px'}}
              ></div>
              <div 
                className="absolute left-1/2 h-full bg-gradient-to-r from-teal-500 to-teal-700 transition-all duration-500 rounded-r-full" 
                style={{width: `${30 + Math.cos(animStep/10)*8}%`, marginLeft: '1px'}}
              ></div>
            </div>
            <div className="flex justify-between w-full text-[9px] font-black uppercase tracking-[0.2em]">
              <div className="flex flex-col items-start gap-1">
                <span className="text-rose-400 flex items-center gap-2"><i className="fa-solid fa-minus-circle"></i> 特征集 B</span>
                <span className="text-slate-500 text-[8px]">抑制预测得分</span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-teal-400 flex items-center gap-2">特征集 A <i className="fa-solid fa-plus-circle"></i></span>
                <span className="text-slate-500 text-[8px]">增强预测得分</span>
              </div>
            </div>
          </div>
        );
      case 'gradient':
        return (
          <div className="relative w-56 h-40 flex items-center justify-center">
             <div className="grid grid-cols-3 gap-10">
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map(i => <div key={i} className={`w-3.5 h-3.5 rounded ${i === 2 ? 'bg-teal-400 shadow-[0_0_12px_#2dd4bf]' : 'bg-slate-700'} transition-all duration-300`}></div>)}
              </div>
              <div className="flex flex-col gap-2 justify-center">
                {[1, 2, 3, 4].map(i => <div key={i} className="w-2 h-2 rounded-full bg-slate-800 border border-slate-700"></div>)}
              </div>
              <div className="flex items-center">
                <div className={`w-6 h-6 bg-slate-800 rounded-full border-2 flex items-center justify-center ${animStep > 50 ? 'border-teal-500 shadow-[0_0_15px_rgba(45,212,191,0.3)]' : 'border-slate-700'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full bg-teal-400 ${animStep > 50 ? 'animate-ping' : 'opacity-0'}`}></div>
                </div>
              </div>
            </div>
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
               <path 
                d="M 180 80 L 100 80 L 50 80" 
                fill="none" 
                stroke="#2dd4bf" 
                strokeWidth="2.5" 
                strokeDasharray="6,6"
                className="animate-[dash_1.5s_linear_infinite]"
                opacity={animStep > 10 ? 0.8 : 0}
               />
               <style>{`
                @keyframes dash {
                  to { stroke-dashoffset: -24; }
                }
               `}</style>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black flex items-center text-slate-900 tracking-tight">
            <i className="fa-solid fa-vial-circle-check mr-3 text-rose-500"></i>
            XAI 动力学实验室
          </h3>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-[0.2em] font-bold">算法博弈与结构剔除可视化</p>
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <div className="text-right">
             <p className="text-[10px] font-black text-slate-400 uppercase">GPU Acceleration</p>
             <p className="text-[10px] text-teal-600 font-bold uppercase tracking-widest">Enabled & Syncing</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-teal-400">
            <i className="fa-solid fa-bolt-lightning text-sm animate-pulse"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 左侧：可视化展示与文字解析 */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* 动画区 */}
          <div className="bg-slate-950 rounded-3xl relative h-[340px] flex flex-col items-center justify-center p-10 overflow-hidden border-4 border-slate-900 shadow-2xl">
            <div className="absolute top-6 left-6">
               <div className="flex items-center gap-3">
                 <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping"></div>
                 <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase">System Monitoring</span>
               </div>
            </div>
            
            {renderLogicAnimation()}

            {activeModule && (
              <div className="absolute bottom-6 text-center w-full">
                <div className="inline-flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-800">
                  <span className="text-[10px] text-teal-400 font-black uppercase tracking-[0.3em]">
                    Active: {activeModule.name}
                  </span>
                  <div className="w-px h-3 bg-slate-700"></div>
                  <span className="text-[9px] text-slate-500 font-mono italic">
                    {activeModule.scientificName}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 深度机制解析面板 */}
          <div className={`transition-all duration-700 transform ${activeModule ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl">
              <div className="bg-slate-900 px-6 py-3 flex justify-between items-center">
                <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
                   {activeModule ? `${activeModule.name} · 机制透视` : 'Module Analysis'}
                </span>
                <div className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                </div>
              </div>
              <div className="p-8">
                {activeModule ? (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-rose-500 shrink-0 border border-slate-200">
                        <i className={`fa-solid ${activeModule.icon} text-xl`}></i>
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-900 mb-1 leading-tight">
                          {activeModule.detailedMechanism.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-bold italic tracking-tight leading-relaxed">
                          "{activeModule.detailedMechanism.analogy}"
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                      {activeModule.detailedMechanism.logic.map((line, i) => (
                        <div key={i} className="group">
                          <div className="flex gap-3 items-start">
                            <div className="mt-1.5 w-2 h-2 rounded-full bg-slate-200 shrink-0 group-hover:bg-teal-500 group-hover:shadow-[0_0_8px_#2dd4bf] transition-all"></div>
                            <p className="text-[12px] text-slate-700 leading-relaxed">
                              <span className="font-black text-slate-900 uppercase tracking-tighter block mb-0.5">{line.split('：')[0]}</span>
                              <span className="opacity-80 font-medium">{line.split('：')[1]}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50/50 -mx-8 -mb-8 p-8 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                          <i className="fa-solid fa-flag-checkered"></i>
                        </div>
                        <div>
                          <p className="text-[10px] text-teal-600 font-black uppercase tracking-widest mb-0.5">博弈最终结果</p>
                          <p className="text-sm font-black text-slate-900 leading-tight">
                            {activeModule.detailedMechanism.result}
                          </p>
                        </div>
                      </div>
                      <i className="fa-solid fa-chevron-right text-slate-300"></i>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：配件选择区 */}
        <div className="lg:col-span-4 space-y-4">
          <div className="px-1 mb-2">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Select Lab Module</h4>
          </div>
          {XAI_MODULES.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module)}
              className={`w-full p-5 rounded-3xl border-2 text-left transition-all relative overflow-hidden group ${
                activeModule?.id === module.id 
                ? 'bg-slate-900 border-slate-900 shadow-2xl shadow-slate-900/20 translate-x-2' 
                : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-5 relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  activeModule?.id === module.id 
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/40 rotate-6 scale-110' 
                  : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                }`}>
                  <i className={`fa-solid ${module.icon} text-2xl`}></i>
                </div>
                <div className="flex-1">
                  <h4 className={`text-sm font-black tracking-tight ${activeModule?.id === module.id ? 'text-white' : 'text-slate-900'}`}>
                    {module.name}
                  </h4>
                  <p className={`text-[10px] mt-1 font-black uppercase tracking-widest ${activeModule?.id === module.id ? 'text-teal-400/80' : 'text-slate-400'}`}>
                    {module.scientificName}
                  </p>
                </div>
              </div>
              {activeModule?.id === module.id && (
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-teal-500"></div>
              )}
            </button>
          ))}
          
          <div className="mt-8 p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <i className="fa-solid fa-microscope text-5xl text-white"></i>
             </div>
             <div className="relative z-10 flex gap-4">
               <div className="w-1.5 h-auto bg-amber-500 rounded-full"></div>
               <div>
                 <p className="text-[10px] font-black text-amber-500 uppercase mb-2 tracking-[0.2em]">实验室笔记</p>
                 <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                   在处理如 ABIDE 这样复杂的 fMRI 数据时，我们不仅需要 AI 告诉我们结果，更需要知道它是否真的抓住了如前额叶、小脑等与孤独症强相关的特征。
                 </p>
               </div>
             </div>
          </div>

          <button 
            onClick={() => setActiveModule(null)}
            className="w-full py-4 mt-6 border-2 border-dashed border-slate-200 rounded-3xl text-[10px] text-slate-400 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all uppercase font-black tracking-[0.3em]"
          >
            <i className="fa-solid fa-rotate-left mr-3"></i> Clear Lab Bench
          </button>
        </div>
      </div>
    </div>
  );
};

export default XAIBuilder;
