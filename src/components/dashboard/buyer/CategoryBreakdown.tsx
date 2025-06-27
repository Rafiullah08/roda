
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CategoryBreakdown: React.FC = () => {
  // Remove demo data - show empty state until real data is available
  const categoryData: any[] = [];

  const COLORS = ['#9b87f5', '#7c3aed', '#a855f7', '#c084fc', '#e879f9'];

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>Breakdown of your purchases by service category</CardDescription>
      </CardHeader>
      <CardContent>
        {categoryData.length > 0 ? (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`Rs. ${value.toLocaleString()}`, 'Amount']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p className="text-sm">No category data available yet</p>
              <p className="text-xs mt-1">Your spending breakdown will appear here after purchases</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdown;
