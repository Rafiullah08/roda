
import React from "react";
import { Clock } from "lucide-react";

const EmptyOrdersState: React.FC = () => {
  return (
    <div className="text-center py-12 bg-gray-50 border rounded-lg">
      <Clock className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
      <h3 className="text-lg font-medium">No orders yet</h3>
      <p className="text-muted-foreground mt-1">
        Orders from customers will appear here.
      </p>
    </div>
  );
};

export default EmptyOrdersState;
