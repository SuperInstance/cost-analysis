import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { CostBreakdownChartProps } from '../types';

/**
 * CostBreakdownChart Component
 *
 * Visualizes cost breakdown by provider with bar and pie charts
 */
export const CostBreakdownChart: React.FC<CostBreakdownChartProps> = ({
  data,
  showTokens = false,
  showRequests = false,
  animated = true,
}) => {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: '#1f2937',
            color: '#fff',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #374151',
          }}
        >
          <p style={{ margin: 0, fontWeight: 'bold' }}>{data.provider}</p>
          <p style={{ margin: '5px 0 0 0' }}>
            Model: {data.model}
          </p>
          <p style={{ margin: '5px 0 0 0' }}>
            Cost: ${data.totalCost.toFixed(2)}
          </p>
          <p style={{ margin: '5px 0 0 0' }}>
            Tokens: {data.totalTokens.toLocaleString()}
          </p>
          <p style={{ margin: '5px 0 0 0' }}>
            Requests: {data.requestCount.toLocaleString()}
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#9ca3af' }}>
            ${data.costPer1kTokens.toFixed(4)}/1k tokens
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '16px',
      }}
    >
      {/* Bar Chart */}
      <div
        style={{
          backgroundColor: '#1f2937',
          borderRadius: '8px',
          padding: '16px',
          border: '1px solid #374151',
        }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="provider"
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="totalCost" fill="#3b82f6" name="Cost ($)" isAnimationActive={animated} />
            {showTokens && (
              <Bar dataKey="totalTokens" fill="#10b981" name="Tokens" isAnimationActive={animated} />
            )}
            {showRequests && (
              <Bar dataKey="requestCount" fill="#f59e0b" name="Requests" isAnimationActive={animated} />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div
        style={{
          backgroundColor: '#1f2937',
          borderRadius: '8px',
          padding: '16px',
          border: '1px solid #374151',
        }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ provider, percent }) =>
                `${provider} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="totalCost"
              isAnimationActive={animated}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CostBreakdownChart;
