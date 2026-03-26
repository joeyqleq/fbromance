"use client";

import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface TerminalBarChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  events?: { date: string; description: string; delta: number; source: string }[];
  highlightCondition?: (entry: any) => boolean;
}

export function TerminalBarChart({ data, xKey, yKey, events, highlightCondition }: TerminalBarChartProps) {
  // Format events to match xKey format if possible
  const formattedEvents = useMemo(() => {
    if (!events) return [];
    return events.map(e => ({
      ...e,
      month: e.date.substring(0, 7) // Assumes xKey is YYYY-MM
    }));
  }, [events]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const entry = payload[0].payload;
      return (
        <div className="bg-[#0a0a0a] border border-[#ff0080] p-4 shadow-[0_0_20px_rgba(255,0,128,0.3)] min-w-[200px] font-mono">
          <p className="text-[#00ff41] text-xs mb-2 border-b border-[#00ff41]/30 pb-1">{label}</p>
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-[#888888]">COMMENTS</span>
            <span className="text-white font-bold">{entry[yKey]}</span>
          </div>
          {entry.post_zscore && (
            <div className="flex justify-between items-center text-xs text-[#ff0080]">
              <span>Z-SCORE</span>
              <span>{parseFloat(entry.post_zscore).toFixed(3)}</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px] md:h-[500px] bg-[#0a0a0a] border border-[#00ff41]/20 p-4 relative glow-green-box">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,0,128,0.1)" vertical={false} />
          <XAxis 
            dataKey={xKey} 
            stroke="#888888" 
            tick={{ fill: '#888888', fontSize: 10, fontFamily: 'monospace' }}
            tickMargin={10}
            axisLine={false}
            tickLine={false}
            minTickGap={30}
          />
          <YAxis 
            stroke="#888888" 
            tick={{ fill: '#888888', fontSize: 10, fontFamily: 'monospace' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ fill: 'rgba(0, 255, 65, 0.1)' }}
          />
          
          {/* Main Bar Series */}
          <Bar 
            dataKey={yKey} 
            isAnimationActive={true}
            animationDuration={1500}
            animationBegin={300}
            shape={(props: any) => {
              const { fill, x, y, width, height, payload } = props;
              const isHighlight = highlightCondition ? highlightCondition(payload) : false;
              
              if (isHighlight) {
                return (
                  <g>
                    <rect x={x} y={y} width={width} height={height} fill="#ff0080" />
                    {/* Inner glowing core */}
                    <rect x={x+width/4} y={y} width={width/2} height={height} fill="#fff" opacity={0.8} />
                  </g>
                );
              }
              return <rect x={x} y={y} width={width} height={height} fill="#111111" stroke="#00ff41" strokeWidth={1} opacity={0.6} />;
            }}
          />

          {/* Event markers using ReferenceLine */}
          {formattedEvents.map((evt, i) => {
             // We can only reliably draw ReferenceLine if the x value matches an exact dataKey value 
             // in a categorical XAxis context, so we map evt.month to the axis.
             return (
               <ReferenceLine 
                 key={i} 
                 x={evt.month} 
                 stroke="#00ff41" 
                 strokeDasharray="3 3" 
                 label={{ position: 'insideTopLeft', value: evt.description, fill: '#00ff41', fontSize: 9, fontFamily: 'monospace', offset: 10 }}
               />
             );
          })}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
