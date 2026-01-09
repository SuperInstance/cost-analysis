import React from 'react';
import { CostAnalysisProps } from '../types';
import { CostBreakdownChart } from './CostBreakdownChart';
import { CostTimeline } from './CostTimeline';
import { CostComparisonCard } from './CostComparisonCard';
import { BudgetAlert } from './BudgetAlert';

/**
 * CostAnalysis Component
 *
 * Comprehensive cost analysis dashboard for multi-provider API usage
 * Features:
 * - Cost breakdown by provider
 * - Time-series cost tracking
 * - Cost forecasting
 * - Provider comparison
 * - Budget alerts
 */
export const CostAnalysis: React.FC<CostAnalysisProps> = ({
  costData,
  forecast,
  comparison,
  onProviderClick,
  theme = 'dark',
}) => {
  const totalCost = costData.totalCost;
  const totalTokens = costData.totalTokens;
  const totalRequests = costData.totalRequests;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div
      className={`cost-analysis ${theme}`}
      style={{
        minHeight: '100vh',
        backgroundColor: theme === 'dark' ? '#111827' : '#f9fafb',
        color: theme === 'dark' ? '#fff' : '#000',
        padding: '24px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          marginBottom: '24px',
          borderBottom: `1px solid ${theme === 'dark' ? '#374151' : '#d1d5db'}`,
          paddingBottom: '16px',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>
          Cost Analysis Dashboard
        </h1>
        <p style={{ margin: '8px 0 0 0', color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
          {new Date(costData.period.start).toLocaleDateString()} -{' '}
          {new Date(costData.period.end).toLocaleDateString()}
        </p>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
            borderRadius: '8px',
            padding: '20px',
            border: `1px solid ${theme === 'dark' ? '#374151' : '#d1d5db'}`,
          }}
        >
          <div
            style={{
              fontSize: '14px',
              color: theme === 'dark' ? '#9ca3af' : '#6b7280',
              marginBottom: '8px',
            }}
          >
            Total Cost
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#3b82f6',
            }}
          >
            {formatCurrency(totalCost)}
          </div>
        </div>

        <div
          style={{
            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
            borderRadius: '8px',
            padding: '20px',
            border: `1px solid ${theme === 'dark' ? '#374151' : '#d1d5db'}`,
          }}
        >
          <div
            style={{
              fontSize: '14px',
              color: theme === 'dark' ? '#9ca3af' : '#6b7280',
              marginBottom: '8px',
            }}
          >
            Total Tokens
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#10b981',
            }}
          >
            {formatNumber(totalTokens)}
          </div>
        </div>

        <div
          style={{
            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
            borderRadius: '8px',
            padding: '20px',
            border: `1px solid ${theme === 'dark' ? '#374151' : '#d1d5db'}`,
          }}
        >
          <div
            style={{
              fontSize: '14px',
              color: theme === 'dark' ? '#9ca3af' : '#6b7280',
              marginBottom: '8px',
            }}
          >
            Total Requests
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#f59e0b',
            }}
          >
            {formatNumber(totalRequests)}
          </div>
        </div>

        <div
          style={{
            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
            borderRadius: '8px',
            padding: '20px',
            border: `1px solid ${theme === 'dark' ? '#374151' : '#d1d5db'}`,
          }}
        >
          <div
            style={{
              fontSize: '14px',
              color: theme === 'dark' ? '#9ca3af' : '#6b7280',
              marginBottom: '8px',
            }}
          >
            Avg Cost per 1k Tokens
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#8b5cf6',
            }}
          >
            {formatCurrency((totalCost / totalTokens) * 1000)}
          </div>
        </div>
      </div>

      {/* Cost Breakdown Chart */}
      <div style={{ marginBottom: '24px' }}>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '16px',
          }}
        >
          Cost Breakdown by Provider
        </h2>
        <CostBreakdownChart
          data={costData.providers}
          showTokens={true}
          showRequests={true}
          animated={true}
        />
      </div>

      {/* Cost Timeline */}
      <div style={{ marginBottom: '24px' }}>
        <h2
          style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '16px',
          }}
        >
          Cost Over Time
        </h2>
        <CostTimeline
          data={costData.costOverTime}
          showForecast={!!forecast}
          forecastData={forecast ? costData.costOverTime.slice(-7).map(d => ({
            ...d,
            cost: d.cost * (1 + (forecast?.factors.trend === 'increasing' ? 0.1 : forecast?.factors.trend === 'decreasing' ? -0.1 : 0))
          })) : undefined}
          height={350}
        />
      </div>

      {/* Provider Comparison */}
      {comparison && (
        <div style={{ marginBottom: '24px' }}>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: '600',
              marginBottom: '16px',
            }}
          >
            Provider Comparison
          </h2>
          <CostComparisonCard comparison={comparison} showSavings={true} />
        </div>
      )}

      {/* Forecast */}
      {forecast && (
        <div
          style={{
            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
            borderRadius: '8px',
            padding: '20px',
            border: `1px solid ${theme === 'dark' ? '#374151' : '#d1d5db'}`,
            marginBottom: '24px',
          }}
        >
          <h3
            style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '16px',
            }}
          >
            Cost Forecast
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '12px',
                  color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                  marginBottom: '4px',
                }}
              >
                Period
              </div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {forecast.period}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: '12px',
                  color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                  marginBottom: '4px',
                }}
              >
                Projected Cost
              </div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#3b82f6',
                }}
              >
                {formatCurrency(forecast.projectedCost)}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: '12px',
                  color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                  marginBottom: '4px',
                }}
              >
                Trend
              </div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color:
                    forecast.factors.trend === 'increasing'
                      ? '#ef4444'
                      : forecast.factors.trend === 'decreasing'
                      ? '#10b981'
                      : '#9ca3af',
                }}
              >
                {forecast.factors.trend.charAt(0).toUpperCase() +
                  forecast.factors.trend.slice(1)}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: '12px',
                  color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                  marginBottom: '4px',
                }}
              >
                Confidence
              </div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {(forecast.confidence * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostAnalysis;
