
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { isPast, isToday, isTomorrow } from 'date-fns';

interface DeliveryStatusBadgeProps {
  deliveryDate: string;
}

const DeliveryStatusBadge: React.FC<DeliveryStatusBadgeProps> = ({ deliveryDate }) => {
  const date = new Date(deliveryDate);
  const isOverdue = isPast(date) && !isToday(date);
  const isDueToday = isToday(date);
  const isDueTomorrow = isTomorrow(date);
  
  if (isOverdue) {
    return (
      <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
        Overdue
      </Badge>
    );
  }
  
  if (isDueToday) {
    return (
      <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
        Today
      </Badge>
    );
  }
  
  if (isDueTomorrow) {
    return (
      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
        Tomorrow
      </Badge>
    );
  }
  
  return null;
};

export default DeliveryStatusBadge;
