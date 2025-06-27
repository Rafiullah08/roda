
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotRegisteredPartner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <AlertCircle className="w-12 h-12 text-yellow-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Partner Profile Not Found</h2>
      <p className="text-gray-600 mb-6 text-center">
        You are not registered as a partner yet. 
        Please apply to become a partner to access the partner dashboard.
      </p>
      <Button asChild>
        <Link to="/become-partner">Apply to Become a Partner</Link>
      </Button>
    </div>
  );
};

export default NotRegisteredPartner;
