
export interface ROARDataPoint {
  percentRemoved: number;
  integratedGradients: number;
  shap: number;
  lime: number;
  random: number;
  deepLift: number;
}

export interface BrainRegion {
  name: string;
  ba: string;
  importance: number;
  function: string;
}

export enum XAIMethod {
  IntegratedGradients = 'Integrated Gradients',
  SHAP = 'SHAP',
  LIME = 'LIME',
  DeepLift = 'DeepLift',
  DeepLiftShap = 'DeepLiftShap',
  GradientShap = 'GradientShap',
  GuidedBackprop = 'GuidedBackprop',
  ROAR = 'ROAR'
}

// 构建器状态
export type XAIAccessory = 'sparsity' | 'lime' | 'shap' | 'gradient' | 'attention';

export interface XAIModule {
  id: XAIAccessory;
  name: string;
  scientificName: string;
  icon: string;
  description: string;
  structureChange: string;
  effect: string;
  detailedMechanism: {
    title: string;
    analogy: string;
    logic: string[];
    result: string;
  };
}
