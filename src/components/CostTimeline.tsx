import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { CostTimelineProps } from '../types';

/**
 * CostTimeline Component
 *
 * Displays cost trends over time with optional forecast
 */
export const CostTimeline: React.FC<CostTimelineProps> = ({
  data,
  showForecast = false,
  forecastData,
  height = 350,
}) => {
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
          <p style={{ margin: 0 }}>
            {new Date(data.timestamp).toLocaleDateString()}
          </p>
          <p style={{ margin: '5px 0 0 0' }}>
            Cost: <strong>${data.cost.toFixed(2)}</strong>
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#9ca3af' }}>
            Tokens: {data.tokens.toLocaleString()}
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#9ca3af' }}>
            Requests: {data.requests.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        backgroundColor: '#1f2937',
        borderRadius: '8px',
        padding: '16px',
        border: '1px solid #374151',
      }}
    >
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            {showForecast && (
              <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            )}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="timestamp"
            stroke="#9ca3af"
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#9ca3af"
            tickFormatter={(value) => `$${value.toFixed(0)}`}
            style={{ fontSize: '12px' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="cost"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorCost)"
            strokeWidth={2}
          />
          {showForecast && forecastData && (
            <Area
              type="monotone"
              dataKey="cost"
              data={forecastData}
              stroke="#8b5cf6"
              strokeDasharray="5 5"
              fillOpacity={1}
              fill="url(#colorForecast)"
              strokeWidth={2}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CostTimeline;
