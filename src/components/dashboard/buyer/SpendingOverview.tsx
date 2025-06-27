
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { ArrowUp, ArrowDown } from 'lucide-react';

const SpendingOverview: React.FC = () => {
  // Remove demo data - show empty state until real data is available
  const spendingData: any[] = [];
  const currentMonthSpending = 0;
  const previousMonthSpending = 0;
  const percentageChange = 0;
  const isIncrease = false;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Spending Overview</CardTitle>
          <CardDescription>Your monthly spending trends</CardDescription>
        </div>
        <div className={`flex items-center ${isIncrease ? 'text-red-500' : 'text-green-500'}`}>
          {isIncrease ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
          <span className="text-sm font-medium">{Math.abs(percentageChange).toFixed(1)}%</span>
        </div>
      </CardHeader>
      <CardContent className="px-2">
        {spendingData.length > 0 ? (
          <ChartContainer
            config={{
              spending: {
                theme: {
                  light: '#9b87f5',
                  dark: '#9b87f5',
                },
                label: 'Spending',
              },
            }}
            className="h-[230px]"
          >
            <BarChart data={spendingData}>
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                fontSize={12}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false}
                fontSize={12}
                tickFormatter={(value) => `Rs. ${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip 
                content={({active, payload}) => {
                  if (active && payload && payload.length) {
                    return (
                      <ChartTooltipContent
                        active={active}
                        payload={payload}
                        label={payload[0].payload.month}
                        formatter={(value) => [`Rs. ${value.toLocaleString()}`, 'Spent']}
                      />
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="amount" 
                name="spending"
                fill="var(--color-spending)" 
                radius={[4, 4, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="h-[230px] flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p className="text-sm">No spending data available yet</p>
              <p className="text-xs mt-1">Start making purchases to see your spending trends</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpendingOverview;
