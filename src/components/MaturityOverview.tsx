import { Card, Badge, Text, Heading } from '@jonmatum/react-mfe-shell';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { MaturitySummary } from '../types/maturity';
import { interpretMaturityLevel } from '../utils/maturityUtils';
import { TrendingUpIcon, ChartBarIcon } from './Icons';

interface MaturityOverviewProps {
  summary: MaturitySummary;
}

export function MaturityOverview({ summary }: MaturityOverviewProps) {
  const chartData = summary.perSection.map((section) => ({
    name: section.title.replace(/^\d+\.\s*/, '').replace(/&/g, '&'),
    fullName: section.title,
    value: section.pct,
  }));

  const getMaturityBadgeVariant = (pct: number) => {
    if (pct <= 30) return 'secondary';
    if (pct <= 60) return 'warning';
    if (pct <= 85) return 'primary';
    return 'success';
  };

  const getMaturityIcon = (pct: number) => {
    return (
      <TrendingUpIcon
        className={`w-5 h-5 ${
          pct <= 30
            ? 'text-text-tertiary'
            : pct <= 60
              ? 'text-warning-600'
              : pct <= 85
                ? 'text-primary-600'
                : 'text-success-600'
        }`}
      />
    );
  };

  // Color function for bars based on percentage
  const getBarColor = (value: number) => {
    if (value <= 30) return '#6b7280'; // gray-500
    if (value <= 60) return '#f59e0b'; // amber-500
    if (value <= 85) return '#3b82f6'; // blue-500
    return '#10b981'; // emerald-500
  };

  // Custom tooltip
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: Array<{ payload: any }>;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface-primary border border-border-primary rounded-lg shadow-lg p-3 max-w-xs">
          <Text className="font-medium text-text-primary mb-1">{data.fullName}</Text>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getBarColor(data.value) }}
            />
            <Text className="text-sm text-text-secondary">
              {data.value}% - {interpretMaturityLevel(data.value)}
            </Text>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Overall Score Card */}
      <Card className="p-6 hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-surface-primary to-surface-secondary">
        <div className="flex items-center justify-between mb-3">
          <Text className="text-sm text-text-secondary font-medium">Overall Maturity Score</Text>
          {getMaturityIcon(summary.overallPct)}
        </div>

        <div className="text-4xl font-bold text-text-primary mb-3">
          {summary.totals.total}
          <span className="text-text-tertiary text-xl font-normal ml-2">
            / {summary.totals.max}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Badge variant={getMaturityBadgeVariant(summary.overallPct)} className="font-medium">
            {summary.overallPct}%
          </Badge>
          <Text className="text-sm text-text-secondary font-medium">
            {interpretMaturityLevel(summary.overallPct)}
          </Text>
        </div>

        <div className="w-full bg-surface-secondary rounded-full h-3 overflow-hidden shadow-inner">
          <div
            className={`h-3 transition-all duration-700 ease-out rounded-full ${
              summary.overallPct <= 30
                ? 'bg-gradient-to-r from-gray-400 to-gray-500'
                : summary.overallPct <= 60
                  ? 'bg-gradient-to-r from-warning-400 to-warning-600'
                  : summary.overallPct <= 85
                    ? 'bg-gradient-to-r from-primary-400 to-primary-600'
                    : 'bg-gradient-to-r from-success-400 to-success-600'
            }`}
            style={{ width: `${summary.overallPct}%` }}
          />
        </div>
      </Card>

      {/* Enhanced Category Chart */}
      <Card className="p-6 lg:col-span-2 hover:shadow-lg transition-all duration-200">
        <div className="flex items-center gap-2 mb-6">
          <ChartBarIcon className="w-5 h-5 text-text-secondary" />
          <Heading level={3} size="lg" className="text-text-primary">
            Category Performance
          </Heading>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(156 163 175)" strokeOpacity={0.3} />
              <XAxis
                dataKey="name"
                interval={0}
                angle={-35}
                textAnchor="end"
                height={80}
                fontSize={11}
                fill="rgb(107 114 128)"
                tick={{ fill: 'rgb(107 114 128)', fontSize: 11 }}
                tickMargin={8}
                axisLine={{ stroke: 'rgb(156 163 175)' }}
              />
              <YAxis
                domain={[0, 100]}
                fontSize={12}
                fill="rgb(107 114 128)"
                tick={{ fill: 'rgb(107 114 128)', fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
                width={40}
                axisLine={{ stroke: 'rgb(156 163 175)' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                radius={[6, 6, 0, 0]}
                className="hover:opacity-80 transition-opacity duration-200"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-border-secondary">
          <div className="flex flex-wrap justify-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500" />
              <Text className="text-text-secondary">0-30% Initial</Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <Text className="text-text-secondary">31-60% Developing</Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <Text className="text-text-secondary">61-85% Established</Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <Text className="text-text-secondary">86-100% Optimized</Text>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
