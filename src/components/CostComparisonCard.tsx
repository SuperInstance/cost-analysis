import React from 'react';
import { CostComparisonProps } from '../types';

/**
 * CostComparisonCard Component
 *
 * Displays cost comparison between providers with savings analysis
 */
export const CostComparisonCard: React.FC<CostComparisonProps> = ({
  comparison,
  showSavings = true,
}) => {
  const maxCost = Math.max(...comparison.costs);
  const cheapestProvider = comparison.providers[comparison.costs.indexOf(Math.min(...comparison.costs))];

  return (
    <div
      style={{
        backgroundColor: '#1f2937',
        borderRadius: '8px',
        padding: '20px',
        border: '1px solid #374151',
      }}
    >
      <h3
        style={{
          margin: '0 0 16px 0',
          fontSize: '16px',
          fontWeight: '600',
          color: '#fff',
        }}
      >
        Provider Cost Comparison
      </h3>

      {/* Bar Chart */}
      <div style={{ marginBottom: '16px' }}>
        {comparison.providers.map((provider, index) => {
          const cost = comparison.costs[index];
          const percentage = (cost / maxCost) * 100;
          const isCheapest = provider === cheapestProvider;

          return (
            <div
              key={provider}
              style={{
                marginBottom: '12px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '4px',
                  fontSize: '12px',
                }}
              >
                <span style={{ color: '#fff', fontWeight: isCheapest ? '600' : '400' }}>
                  {provider}
                  {isCheapest && (
                    <span style={{ color: '#10b981', marginLeft: '8px' }}>
                      ✓ Lowest Cost
                    </span>
                  )}
                </span>
                <span style={{ color: '#9ca3af' }}>
                  ${cost.toFixed(2)}
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '24px',
                  backgroundColor: '#374151',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${percentage}%`,
                    height: '100%',
                    backgroundColor: isCheapest ? '#10b981' : '#3b82f6',
                    transition: 'width 0.5s ease',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Savings */}
      {showSavings && comparison.savings && (
        <div
          style={{
            padding: '12px',
            backgroundColor: '#10b98120',
            borderRadius: '6px',
            border: '1px solid #10b981',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              color: '#10b981',
              marginBottom: '4px',
            }}
          >
            Potential Savings
          </div>
          <div
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#fff',
            }}
          >
            ${comparison.savings.amount.toFixed(2)}
            <span
              style={{
                fontSize: '14px',
                color: '#10b981',
                marginLeft: '8px',
              }}
            >
              ({comparison.savings.percentage.toFixed(1)}%)
            </span>
          </div>
          <div
            style={{
              fontSize: '11px',
              color: '#9ca3af',
              marginTop: '4px',
            }}
          >
            by switching to {comparison.savings.provider}
          </div>
        </div>
      )}
    </div>
  );
};

export default CostComparisonCard;
