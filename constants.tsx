
import { ROARDataPoint, XAIMethod, XAIModule } from './types';

export const XAI_KNOWLEDGE_BASE = {
  title: "可解释 AI (XAI) 结构实验室",
  subtitle: "从'黑盒'到'透明机器'的结构演进",
  intro: "AI 的可解释性不是一天建成的。从最简单的限制模型大小，到复杂的数学追踪，科学家们像搭建乐高一样为 AI 开发了各种'透视'配件。"
};

export const XAI_EVOLUTION_STAGES = [
  {
    stage: "阶段一：固有解释 (Intrinsic)",
    structure: "改造模型内部结构",
    task: "限制复杂度（稀疏性）",
    action: "在损失函数中加入 L1 惩罚项，强制 90% 的连接消失。",
    result: "模型变得极简，人类可以直接看清哪根导线起作用，但性能可能下降。"
  },
  {
    stage: "阶段二：局部代理 (Local Proxy)",
    structure: "加装外部模拟器",
    task: "局部线性拟合 (LIME)",
    action: "模型本身不动。在结果周围制造'噪音'输入，用一个简单的尺子去测量局部的斜率。",
    result: "不破坏原模型，但只能解释‘这一个’样本，无法理解全局。"
  },
  {
    stage: "阶段三：深度归因 (Attribution)",
    structure: "加装反向流向追踪器",
    task: "梯度积分与博弈分配",
    action: "利用数学导数，从输出结果沿着神经元路径倒着走，把得分分摊给输入。",
    result: "能精准定位每一个输入的功劳，是目前医学 AI 最常用的结构。"
  }
];

export const XAI_MODULES: XAIModule[] = [
  {
    id: 'sparsity',
    name: '稀疏约束器',
    scientificName: 'L1 Regularization',
    icon: 'fa-scissors',
    description: '通过 L1 正则化剪掉不重要的神经元连接。',
    structureChange: '模型权重矩阵变得非常稀疏（大部分为0）。',
    effect: '直接看到最重要的几个特征，让模型变得简洁明了。',
    detailedMechanism: {
      title: "核心机制：生存税 (Survival Tax)",
      analogy: "我们可以把模型训练想象成一个生态系统：",
      logic: [
        "任务奖励：如果某个神经元连接能帮助模型准确识别孤独症（降低误差），它就会获得‘奖励’。",
        "L1 惩罚（生存税）：稀疏约束器给每一个连接都加了一份固定的‘租金’。不管你有没有用，只要你存在（权重不为 0），你就必须支付这个成本。",
        "强者生存：那些对诊断至关重要的连接（如视觉脑区关键路径），其‘奖励’远大于‘租金’，所以它能活下来。",
        "弱者淘汰：可有可无或背景噪音连接，奖励抵消不掉租金，为了总支出最低，模型会自动将其权重压到绝对的 0。"
      ],
      result: "复杂的神经网络被修剪成了一张清晰的‘核心特征地图’。"
    }
  },
  {
    id: 'lime',
    name: '局部放大镜',
    scientificName: 'LIME',
    icon: 'fa-magnifying-glass-plus',
    description: '在黑盒旁边建立一个微型的线性替代模型。',
    structureChange: '在原模型外层包裹一个“采样-模拟”循环。',
    effect: '给出局部的决策边界，告诉你“这次判定”的原因。',
    detailedMechanism: {
      title: "核心机制：局部线性放大 (Local Proxy)",
      analogy: "如果黑盒模型是一座迷雾山脉，我们就在山脚下用手电筒观察：",
      logic: [
        "扰动采样：在你想解释的病人样本周围，通过随机加噪声制造数千个相似的‘影子样本’。",
        "黑盒探测：让复杂的黑盒给这些‘影子样本’打分，观察黑盒对细微变化的反应趋势。",
        "线性拟合：在这一小块局部区域，用一条简单的直线（线性模型）去尽可能模仿黑盒的行为。",
        "局部忠诚度：这条直线不求理解全局，只求在这个病人周围‘贴合’黑盒的决策边缘。"
      ],
      result: "不破坏原模型结构，实现了对‘特定预测’的局部放大切片。"
    }
  },
  {
    id: 'shap',
    name: '博弈分账计',
    scientificName: 'SHAP',
    icon: 'fa-scale-balanced',
    description: '基于博弈论，公平计算每个特征对结果的贡献。',
    structureChange: '在输出端接入特征组合计算引擎。',
    effect: '生成特征贡献排名，确保没有一个特征被冤枉。',
    detailedMechanism: {
      title: "核心机制：博弈论利益分配 (Shapley Value)",
      analogy: "如果模型预测是一场多人运动，我们得算出每个人（特征）的准确功劳：",
      logic: [
        "博弈组合：列出特征所有可能的‘组队组合’（例如：只看脑区A，或脑区A+B，或脑区A+C）。",
        "边际贡献：计算‘特征X’加入任何一个已有组合后，模型预测准确率的平均提升值。",
        "公平分账：基于沙普利值数学公式，将最终的预测得分完美地分摊给每一个参与的特征。",
        "正负推拉：有些特征在合力把预测推向‘孤独症’（正贡献），有些在往反方向拉（负贡献）。"
      ],
      result: "实现了数学意义上最公平、无歧义的特征重要性权重分配。"
    }
  },
  {
    id: 'gradient',
    name: '梯度追踪针',
    scientificName: 'Integrated Gradients',
    icon: 'fa-route',
    description: '利用反向传播，将权重流量溯源到输入端。',
    structureChange: '开启模型内部的反向梯度流监听。',
    effect: '生成精细的归因热力图，定位病灶极其准确。',
    detailedMechanism: {
      title: "核心机制：能量溯源 (Gradient Back-tracing)",
      analogy: "如果结果是河流的终点，我们要顺着河道逆流而上寻找水源：",
      logic: [
        "基准对比：找一个‘完全空白’的参考输入（如全黑图像），作为归零的基准线。",
        "步进积分：从空白输入到真实输入的路径上，通过数百次微小的步进，追踪模型输出的每一丝变化。",
        "斜率累加：计算每一小步的‘敏感度’（梯度），并将其累积积分到输入的每个像素或脑区上。",
        "消除饱和：利用牛顿-莱布尼茨公式原理，确保深度学习中那些‘反应迟钝’的长路径也能被准确溯源。"
      ],
      result: "这根‘追踪针’能穿透复杂的层级，把最终诊断的能量回溯到最初的输入特征上。"
    }
  }
];

export const ROAR_CHART_DATA: ROARDataPoint[] = [
  { percentRemoved: 0, integratedGradients: 98, shap: 98, lime: 98, random: 98, deepLift: 98 },
  { percentRemoved: 5, integratedGradients: 92, shap: 94, lime: 96, random: 97, deepLift: 93 },
  { percentRemoved: 10, integratedGradients: 85, shap: 88, lime: 94, random: 96, deepLift: 89 },
  { percentRemoved: 20, integratedGradients: 70, shap: 75, lime: 90, random: 94, deepLift: 78 }
];

export const PAPER_INFO = {
  title: "XAI 演进：从透明模型到后验归因",
  findings: [
    "早期线性模型虽透明但准确率低。",
    "现代深度学习通过加装‘解释插件’兼顾了高性能与高透明度。",
    "积分梯度是目前结构最严谨的深度学习解释方案。"
  ]
};

export const XAI_DESCRIPTIONS: Record<string, string> = {
  [XAIMethod.IntegratedGradients]: "积分梯度：沿着预测路径累积梯度，解决梯度饱和问题。",
  [XAIMethod.SHAP]: "SHAP：基于博弈论，计算特征在所有组合中的平均边际贡献。",
  [XAIMethod.LIME]: "LIME：局部代理，用可解释模型去逼近不可解释模型的局部行为。",
  [XAIMethod.ROAR]: "ROAR：通过破坏性实验验证解释的忠实度。"
};

export const XAI_METHODS_COMPARISON = [
  {
    name: "SHAP (Shapley)",
    type: "归因 (Attribution)",
    strength: "基于博弈论，确保特征贡献分配公平。",
    usage: "金融风控、医疗核心特征归因。"
  },
  {
    name: "LIME",
    type: "局部代理 (Local Proxy)",
    strength: "模型无关，灵活性极高。",
    usage: "解释单个病例的决策逻辑，如医疗影像诊断。"
  },
  {
    name: "Integrated Gradients",
    type: "归因 (Attribution)",
    strength: "满足公理化要求，能有效处理深度网络的梯度饱和。",
    usage: "精密影像分析、脑电信号特征提取。"
  },
  {
    name: "Attention Maps",
    type: "内在结构 (Intrinsic)",
    strength: "直观展示模型关注区域，无需外部计算。",
    usage: "Transformer 模型解释、NLP 文本处理。"
  }
];
