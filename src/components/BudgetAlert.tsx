import React from 'react';
import { BudgetAlertProps } from '../types';

/**
 * BudgetAlert Component
 *
 * Budget tracking with visual alerts when approaching or exceeding limits
 */
export const BudgetAlert: React.FC<BudgetAlertProps> = ({
  currentSpend,
  budget,
  period,
  onExceed,
}) => {
  const percentage = (currentSpend / budget) * 100;
  const remaining = budget - currentSpend;

  const getStatus = () => {
    if (percentage >= 100) return 'exceeded';
    if (percentage >= 90) return 'critical';
    if (percentage >= 75) return 'warning';
    return 'normal';
  };

  const status = getStatus();

  React.useEffect(() => {
    if (status === 'exceeded' && onExceed) {
      onExceed();
    }
  }, [status, onExceed]);

  const getStatusColor = () => {
    switch (status) {
      case 'exceeded':
        return '#ef4444';
      case 'critical':
        return '#f87171';
      case 'warning':
        return '#f59e0b';
      default:
        return '#10b981';
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'exceeded':
        return 'Budget exceeded!';
      case 'critical':
        return 'Critical: Approaching budget limit';
      case 'warning':
        return 'Warning: Using 75% of budget';
      default:
        return 'On track';
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#1f2937',
        borderRadius: '8px',
        padding: '20px',
        border: `2px solid ${getStatusColor()}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: '600',
              color: '#fff',
            }}
          >
            Budget Status
          </h3>
          <p
            style={{
              margin: '4px 0 0 0',
              fontSize: '12px',
              color: '#9ca3af',
            }}
          >
            {period}
          </p>
        </div>
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              color: '#9ca3af',
              marginBottom: '4px',
            }}
          >
            {getStatusMessage()}
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: getStatusColor(),
            }}
          >
            {percentage.toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: '100%',
          height: '12px',
          backgroundColor: '#374151',
          borderRadius: '6px',
          overflow: 'hidden',
          marginBottom: '12px',
        }}
      >
        <div
          style={{
            width: `${Math.min(percentage, 100)}%`,
            height: '100%',
            backgroundColor: getStatusColor(),
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* Details */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          fontSize: '12px',
        }}
      >
        <div>
          <div style={{ color: '#9ca3af', marginBottom: '2px' }}>
            Spent
          </div>
          <div style={{ color: '#fff', fontWeight: '600' }}>
            ${currentSpend.toFixed(2)}
          </div>
        </div>
        <div>
          <div style={{ color: '#9ca3af', marginBottom: '2px' }}>
            Budget
          </div>
          <div style={{ color: '#fff', fontWeight: '600' }}>
            ${budget.toFixed(2)}
          </div>
        </div>
        <div>
          <div style={{ color: '#9ca3af', marginBottom: '2px' }}>
            {remaining >= 0 ? 'Remaining' : 'Over'}
          </div>
          <div
            style={{
              color: remaining >= 0 ? '#fff' : '#ef4444',
              fontWeight: '600',
            }}
          >
            ${Math.abs(remaining).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetAlert;
