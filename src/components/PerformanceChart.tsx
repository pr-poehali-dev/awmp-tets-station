import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

interface ChartData {
  time: string;
  power: number;
  temperature: number;
  efficiency: number;
}

interface PerformanceChartProps {
  data: ChartData[];
  title: string;
  height?: number;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  data, 
  title, 
  height = 300 
}) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-white mb-4 font-mono">
        {title}
      </h3>
      <div className="bg-gray-700 rounded-lg p-4">
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF"
              fontSize={12}
              fontFamily="Roboto Mono"
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              fontFamily="Roboto Mono"
            />
            <Legend 
              wrapperStyle={{ 
                color: '#F3F4F6',
                fontSize: '12px',
                fontFamily: 'Roboto Mono'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="power" 
              stroke="#10B981" 
              strokeWidth={2}
              name="Мощность (МВт)"
              dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: '#10B981', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              stroke="#F59E0B" 
              strokeWidth={2}
              name="Температура (°C)"
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: '#F59E0B', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="efficiency" 
              stroke="#3B82F6" 
              strokeWidth={2}
              name="КПД (%)"
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: '#3B82F6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;