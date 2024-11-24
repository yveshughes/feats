export interface Scale {
  title: string;
  rating: string;
  description: string;
  explanation: string;
}

export interface AnalysisMetadata {
  processingTime: number;
  modelVersion: string;
}

export interface AnalysisResult {
  timestamp: string;
  imageUrl: string;
  scales: Scale[];
  metadata: AnalysisMetadata;
}

export interface InferenceResult {
  scales: Scale[];
  processingTime: number;
  modelVersion: string;
}