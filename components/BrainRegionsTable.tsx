
import React from 'react';
import { XAI_METHODS_COMPARISON } from '../constants';

const BrainRegionsTable: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold mb-6 flex items-center">
        <i className="fa-solid fa-toolbox mr-2 text-blue-500"></i>
        主流可解释方法 (XAI Toolbox) 对比
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 font-bold text-slate-700 uppercase">方法名称</th>
              <th className="px-4 py-3 font-bold text-slate-700 uppercase">解释维度</th>
              <th className="px-4 py-3 font-bold text-slate-700 uppercase">核心优势</th>
              <th className="px-4 py-3 font-bold text-slate-700 uppercase">典型应用场景</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {XAI_METHODS_COMPARISON.map((method, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-bold text-slate-900">{method.name}</td>
                <td className="px-4 py-3 text-slate-600">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[10px]">
                    {method.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">{method.strength}</td>
                <td className="px-4 py-3 font-medium text-slate-700">{method.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 p-4 bg-indigo-50 rounded-lg border border-indigo-100 flex items-start gap-4">
        <div className="text-indigo-600 text-xl mt-1"><i className="fa-solid fa-graduation-cap"></i></div>
        <div>
          <h4 className="text-sm font-bold text-indigo-900 mb-1">导师笔记：如何选择解释器？</h4>
          <p className="text-xs text-indigo-800 leading-relaxed">
            并没有一个完美的解释器。如果你需要处理简单的病人表格，<b>SHAP</b> 非常公平；如果你需要解释一张照片，<b>Attention Maps</b> 或 <b>Grad-CAM</b> 最直观；而对于脑科学中复杂的神经网络，<b>积分梯度 (Integrated Gradients)</b> 是科学家的首选。
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrainRegionsTable;
