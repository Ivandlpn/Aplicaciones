import React from 'react';
import type { ForecastEntry } from '../types';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';

interface ForecastChartProps {
  data: ForecastEntry[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const time = new Date(label).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    return (
      <div className="bg-white/80 backdrop-blur-sm p-4 border border-slate-300 rounded-lg shadow-lg text-sm">
        <p className="font-bold text-slate-700 mb-2">{`Hora: ${time}`}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.color }}>{`${p.name}: ${p.value} ${p.unit}`}</p>
        ))}
      </div>
    );
  }
  return null;
};


const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  const chartData = data.map(entry => ({
    ...entry,
    time: new Date(entry.time).getTime(),
  }));

  return (
    <div className="bg-white/60 p-4 rounded-xl shadow-lg backdrop-blur-sm">
      <h3 className="text-lg font-semibold mb-4 px-2 text-sky-700">Resumen Gráfico del Día</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.7}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
               <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.7}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              tickFormatter={(timeStr) => new Date(timeStr).toLocaleTimeString('es-ES', { hour: '2-digit' })}
              stroke="#6b7280"
              tick={{ fontSize: 11 }}
            />
            <YAxis yAxisId="left" stroke="#6b7280" tick={{ fontSize: 11 }} label={{ value: '°C', angle: -90, position: 'insideLeft', fill: '#475569', fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" stroke="#6b7280" tick={{ fontSize: 11 }} label={{ value: 'Nudos', angle: 90, position: 'insideRight', fill: '#475569', fontSize: 11 }} />
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{fontSize: "12px"}} />
            <Area 
              yAxisId="left" 
              type="monotone" 
              dataKey="temperature" 
              name="Temperatura" 
              stroke="#f59e0b" 
              fillOpacity={1} 
              fill="url(#colorTemp)" 
              unit="°C" 
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="feelsLike"
              name="Sensación"
              stroke="#ef4444"
              strokeDasharray="5 5"
              unit="°C"
            />
            <Area 
              yAxisId="right"
              type="monotone" 
              dataKey="windSpeed" 
              name="Viento"
              stroke="#06b6d4" 
              fillOpacity={1} 
              fill="url(#colorWind)" 
              unit="nudos"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForecastChart;