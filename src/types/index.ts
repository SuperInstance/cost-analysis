/**
 * Cost analysis types for multi-provider API tracking
 */

export interface ProviderCost {
  provider: string;
  model: string;
  costPer1kTokens: number;
  totalTokens: number;
  totalCost: number;
  requestCount: number;
  avgRequestSize: number;
}

export interface CostBreakdown {
  period: {
    start: Date;
    end: Date;
  };
  totalCost: number;
  totalTokens: number;
  totalRequests: number;
  providers: ProviderCost[];
  costOverTime: CostDataPoint[];
}

export interface CostDataPoint {
  timestamp: Date;
  cost: number;
  tokens: number;
  requests: number;
}

export interface CostForecast {
  period: string;
  projectedCost: number;
  confidence: number;
  factors: {
    trend: 'increasing' | 'stable' | 'decreasing';
    seasonality?: number;
    variance?: number;
  };
}

export interface CostComparison {
  providers: string[];
  costs: number[];
  savings?: {
    provider: string;
    amount: number;
    percentage: number;
  };
}

export interface CostAnalysisProps {
  costData: CostBreakdown;
  forecast?: CostForecast;
  comparison?: CostComparison;
  onProviderClick?: (provider: string) => void;
  theme?: 'light' | 'dark';
}

export interface CostBreakdownChartProps {
  data: ProviderCost[];
  showTokens?: boolean;
  showRequests?: boolean;
  animated?: boolean;
}

export interface CostTimelineProps {
  data: CostDataPoint[];
  showForecast?: boolean;
  forecastData?: CostDataPoint[];
  height?: number;
}

export interface CostComparisonProps {
  comparison: CostComparison;
  showSavings?: boolean;
}

export interface BudgetAlertProps {
  currentSpend: number;
  budget: number;
  period: string;
  onExceed?: () => void;
}
