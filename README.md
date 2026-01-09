# @luciddreamer/cost-analysis

[![npm version](https://badge.fury.io/js/%40luciddreamer%2Fcost-analysis.svg)](https://www.npmjs.com/package/@luciddreamer/cost-analysis)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Multi-provider cost visualization and analysis dashboard for AI API usage with real-time tracking, forecasting, and optimization insights.

## Features

- **Cost Breakdown** - Visualize costs by provider, model, and usage
- **Time-Series Analysis** - Track costs over time with detailed metrics
- **Cost Forecasting** - Predict future costs with confidence intervals
- **Provider Comparison** - Compare providers and identify savings opportunities
- **Budget Tracking** - Monitor spending against budgets with alerts
- **Token Analysis** - Understand token usage patterns
- **Interactive Charts** - Responsive visualizations with Recharts
- **Dark/Light Theme** - Built-in theme support
- **TypeScript Support** - Full type definitions included

## Installation

```bash
npm install @luciddreamer/cost-analysis
# or
yarn add @luciddreamer/cost-analysis
# or
pnpm add @luciddreamer/cost-analysis
```

## Quick Start

```tsx
import React, { useState, useEffect } from 'react';
import { CostAnalysis } from '@luciddreamer/cost-analysis';

function App() {
  const [costData, setCostData] = useState(null);

  useEffect(() => {
    // Fetch cost data from your API
    const fetchCostData = async () => {
      const response = await fetch('/api/costs');
      const data = await response.json();
      setCostData(data);
    };

    fetchCostData();
  }, []);

  return (
    <CostAnalysis
      costData={costData}
      forecast={{
        period: 'Next 30 days',
        projectedCost: 450.00,
        confidence: 0.85,
        factors: {
          trend: 'increasing',
        },
      }}
      comparison={{
        providers: ['OpenAI', 'Anthropic', 'Google'],
        costs: [320.50, 285.30, 410.80],
        savings: {
          provider: 'Anthropic',
          amount: 35.20,
          percentage: 11.0,
        },
      }}
      theme="dark"
    />
  );
}
```

## Components

### CostAnalysis

Main dashboard component aggregating all cost analysis features.

**Props:**

- `costData: CostBreakdown` - Cost breakdown data
- `forecast?: CostForecast` - Cost forecast data
- `comparison?: CostComparison` - Provider comparison data
- `onProviderClick?: (provider: string) => void` - Provider click handler
- `theme?: 'light' | 'dark'` - Color theme (default: 'dark')

### CostBreakdownChart

Bar and pie charts showing cost distribution by provider.

**Props:**

- `data: ProviderCost[]` - Array of provider cost data
- `showTokens?: boolean` - Show token counts (default: false)
- `showRequests?: boolean` - Show request counts (default: false)
- `animated?: boolean` - Enable animations (default: true)

### CostTimeline

Time-series chart showing cost trends with optional forecast.

**Props:**

- `data: CostDataPoint[]` - Time-series cost data
- `showForecast?: boolean` - Display forecast overlay (default: false)
- `forecastData?: CostDataPoint[]` - Forecast data points
- `height?: number` - Chart height in px (default: 350)

### CostComparisonCard

Provider comparison with savings analysis.

**Props:**

- `comparison: CostComparison` - Comparison data
- `showSavings?: boolean` - Show savings highlight (default: true)

### BudgetAlert

Budget monitoring with visual alerts.

**Props:**

- `currentSpend: number` - Current amount spent
- `budget: number` - Budget limit
- `period: string` - Budget period description
- `onExceed?: () => void` - Callback when budget exceeded

## Type Definitions

```typescript
interface ProviderCost {
  provider: string;
  model: string;
  costPer1kTokens: number;
  totalTokens: number;
  totalCost: number;
  requestCount: number;
  avgRequestSize: number;
}

interface CostBreakdown {
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

interface CostForecast {
  period: string;
  projectedCost: number;
  confidence: number;
  factors: {
    trend: 'increasing' | 'stable' | 'decreasing';
    seasonality?: number;
    variance?: number;
  };
}

interface CostComparison {
  providers: string[];
  costs: number[];
  savings?: {
    provider: string;
    amount: number;
    percentage: number;
  };
}
```

## Usage Examples

### Basic Cost Dashboard

```tsx
import { CostAnalysis } from '@luciddreamer/cost-analysis';

const costData = {
  period: {
    start: new Date('2024-01-01'),
    end: new Date('2024-01-31'),
  },
  totalCost: 1250.50,
  totalTokens: 15000000,
  totalRequests: 45000,
  providers: [
    {
      provider: 'OpenAI',
      model: 'gpt-4',
      costPer1kTokens: 0.03,
      totalTokens: 8000000,
      totalCost: 240.00,
      requestCount: 25000,
      avgRequestSize: 320,
    },
    // ... more providers
  ],
  costOverTime: [
    // time-series data
  ],
};

<CostAnalysis costData={costData} theme="dark" />
```

### Budget Monitoring

```tsx
import { BudgetAlert } from '@luciddreamer/cost-analysis';

<BudgetAlert
  currentSpend={850.50}
  budget={1000}
  period="January 2024"
  onExceed={() => alert('Budget exceeded!')}
/>
```

### Provider Comparison

```tsx
import { CostComparisonCard } from '@luciddreamer/cost-analysis';

const comparison = {
  providers: ['OpenAI', 'Anthropic', 'Google', 'Cohere'],
  costs: [320.50, 285.30, 410.80, 295.60],
  savings: {
    provider: 'Anthropic',
    amount: 35.20,
    percentage: 11.0,
  },
};

<CostComparisonCard comparison={comparison} showSavings={true} />
```

### Cost Timeline with Forecast

```tsx
import { CostTimeline } from '@luciddreamer/cost-analysis';

<CostTimeline
  data={historicalCosts}
  showForecast={true}
  forecastData={projectedCosts}
  height={400}
/>
```

## Integration Examples

### With Real-time Data

```tsx
function CostMonitor() {
  const [costs, setCosts] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/costs');

    ws.onmessage = (event) => {
      const update = JSON.parse(event.data);
      setCosts((prev) => [...prev.slice(-100), update]);
    };

    return () => ws.close();
  }, []);

  return <CostAnalysis costData={costs} />;
}
```

### With Periodic Refresh

```tsx
function CostDashboard() {
  const [costs, setCosts] = useState(null);

  useEffect(() => {
    const fetchCosts = async () => {
      const response = await fetch('/api/costs/summary');
      const data = await response.json();
      setCosts(data);
    };

    fetchCosts();
    const interval = setInterval(fetchCosts, 60000); // Every minute
    return () => clearInterval(interval);
  }, []);

  return costs ? <CostAnalysis costData={costs} /> : <div>Loading...</div>;
}
```

## Customization

### Styling

Components use inline styles and respond to the `theme` prop:

```tsx
// Light theme
<CostAnalysis costData={data} theme="light" />

// Dark theme (default)
<CostAnalysis costData={data} theme="dark" />
```

### Custom Colors

You can customize chart colors by modifying the Recharts configuration:

```tsx
import { CostBreakdownChart } from '@luciddreamer/cost-analysis';

// The component uses default colors but you can extend it
// with custom color schemes for your branding
```

## Dependencies

- React >= 18.0.0
- React-DOM >= 18.0.0
- Recharts >= 2.12.0

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © LucidDreamer

## Related Packages

- [@luciddreamer/monitoring-dashboard](https://www.npmjs.com/package/@luciddreamer/monitoring-dashboard) - System monitoring
- [@luciddreamer/agent-grid](https://www.npmjs.com/package/@luciddreamer/agent-grid) - Agent management
- [@luciddreamer/memory-visualization](https://www.npmjs.com/package/@luciddreamer/memory-visualization) - Memory visualization

## Support

For issues and questions, please visit our [GitHub repository](https://github.com/luciddreamer/cost-analysis).
