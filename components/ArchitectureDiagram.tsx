
import React from 'react';

const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-lg font-semibold flex items-center">
            <i className="fa-solid fa-diagram-project mr-2 text-indigo-600"></i>
            可解释 AI (XAI) 标准工作流
          </h3>
          <p className="text-xs text-slate-500 mt-1">从“黑盒”模型到人类理解的透明化过程</p>
        </div>
      </div>

      <div className="relative py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* 数据输入 */}
        <div className="flex flex-col items-center w-32">
          <div className="w-16 h-16 bg-slate-100 border-2 border-slate-300 rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-database text-slate-400"></i>
          </div>
          <span className="mt-2 text-xs font-bold">原始数据</span>
          <span className="text-[10px] text-slate-400 text-center">任务：特征工程<br/>与样本输入</span>
        </div>

        <div className="text-slate-300"><i className="fa-solid fa-arrow-right"></i></div>

        {/* AI 模型 (黑盒) */}
        <div className="flex flex-col items-center w-40 relative">
          <div className="w-24 h-24 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl">
            <div className="relative">
              <i className="fa-solid fa-brain text-white text-3xl opacity-20"></i>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fa-solid fa-question text-white text-xl animate-pulse"></i>
              </div>
            </div>
          </div>
          <span className="mt-2 text-xs font-bold text-slate-900">AI 黑盒模型</span>
          <span className="text-[10px] text-slate-500 text-center">任务：深度学习<br/>与复杂非线性推理</span>
          
          {/* 决策结果 */}
          <div className="absolute -top-6 right-0 bg-red-100 text-red-600 text-[9px] font-bold px-2 py-1 rounded border border-red-200">
            输出结果：98% 孤独症
          </div>
        </div>

        <div className="text-indigo-400"><i className="fa-solid fa-wand-magic-sparkles fa-2x"></i></div>

        {/* XAI 解释器 */}
        <div className="flex flex-col items-center w-40">
          <div className="w-24 h-24 bg-indigo-50 border-2 border-indigo-200 border-dashed rounded-2xl flex items-center justify-center">
            <i className="fa-solid fa-magnifying-glass text-indigo-500 text-2xl"></i>
          </div>
          <span className="mt-2 text-xs font-bold text-indigo-700">XAI 解释层</span>
          <span className="text-[10px] text-slate-500 text-center">任务：权重归因<br/>与决策回溯</span>
        </div>

        <div className="text-slate-300"><i className="fa-solid fa-arrow-right"></i></div>

        {/* 人类交互层 */}
        <div className="flex flex-col items-center w-32">
          <div className="w-16 h-16 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center">
            <i className="fa-solid fa-user-doctor text-green-600 text-xl"></i>
          </div>
          <span className="mt-2 text-xs font-bold text-green-700">人类医生</span>
          <span className="text-[10px] text-slate-400 text-center">任务：临床验证<br/>与建立信任</span>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
          <h4 className="text-[11px] font-bold text-slate-700 mb-1">1. 决策透明化任务</h4>
          <p className="text-[10px] text-slate-500 leading-relaxed">让 AI 告诉我们它看到了什么。比如它是通过病人的视觉脑区特征来判断孤独症的吗？</p>
        </div>
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
          <h4 className="text-[11px] font-bold text-slate-700 mb-1">2. 纠偏与除错任务</h4>
          <p className="text-[10px] text-slate-500 leading-relaxed">防止 AI “作弊”。比如 AI 可能因为照片背景的颜色而不是病灶本身来判定癌症，XAI 必须发现它。</p>
        </div>
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
          <h4 className="text-[11px] font-bold text-slate-700 mb-1">3. 知识发现任务</h4>
          <p className="text-[10px] text-slate-500 leading-relaxed">AI 可能发现了人类尚未察觉的生物规律，XAI 帮助科学家从数据中学习新知识。</p>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
