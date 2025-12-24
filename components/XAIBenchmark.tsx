
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ROAR_CHART_DATA } from '../constants';

const XAIBenchmark: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold flex items-center">
          <i className="fa-solid fa-chart-line mr-2 text-indigo-600"></i>
          解释器可靠性评估 (ROAR)
        </h3>
        <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-bold">移除并重训练</span>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={ROAR_CHART_DATA}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="percentRemoved" 
              label={{ value: '移除的关键特征占比 (%)', position: 'insideBottom', offset: -5, fontSize: 10 }}
              tick={{ fontSize: 10 }}
            />
            {/* Fix: Adjusted domain to [60, 100] as ROAR data points drop significantly below 90% */}
            <YAxis 
              domain={[60, 100]} 
              label={{ value: '诊断准确率 (%)', angle: -90, position: 'insideLeft', fontSize: 10 }}
              tick={{ fontSize: 10 }}
            />
            <Tooltip 
              formatter={(value) => [`${value}%`, '准确率']}
              labelFormatter={(label) => `移除占比: ${label}%`}
              contentStyle={{ fontSize: '12px', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
            <Line type="monotone" dataKey="integratedGradients" name="积分梯度 (IG)" stroke="#0d9488" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="shap" name="SHAP" stroke="#4f46e5" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="lime" name="LIME" stroke="#ea580c" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="random" name="随机试验" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={1} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 text-xs text-slate-500 leading-relaxed">
        <strong>如何阅读：</strong> 如果我们移除了解释器认为“重要”的特征后，模型准确率掉得越快（曲线越陡），说明这个解释器找得越准。可以看到<b>积分梯度 (曲线最陡)</b> 表现最佳。
      </p>
    </div>
  );
};

export default XAIBenchmark;
