
import React from "react";
import { BadgeCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

export interface Credential {
  id: string;
  credential_type: 'certification' | 'skill' | 'education' | 'award';
  credential_name: string;
  issuer?: string;
  issue_date?: string;
  expiry_date?: string;
  verification_status: 'pending' | 'verified' | 'rejected';
}

interface PartnerCredentialsProps {
  credentials: Credential[];
  limit?: number;
  showAll?: boolean;
  variant?: 'badges' | 'list';
}

const PartnerCredentials = ({
  credentials,
  limit = 3,
  showAll = false,
  variant = 'badges'
}: PartnerCredentialsProps) => {
  
  // Sort credentials: verified first, then by type priority
  const typePriority = {
    'certification': 1,
    'skill': 2,
    'education': 3,
    'award': 4,
  };

  const sortedCredentials = [...credentials].sort((a, b) => {
    // Verified credentials first
    if (a.verification_status === 'verified' && b.verification_status !== 'verified') return -1;
    if (a.verification_status !== 'verified' && b.verification_status === 'verified') return 1;
    
    // Then sort by type priority
    return typePriority[a.credential_type] - typePriority[b.credential_type];
  });
  
  const displayCredentials = showAll ? sortedCredentials : sortedCredentials.slice(0, limit);

  if (variant === 'badges') {
    return (
      <div className="flex flex-wrap gap-2">
        {displayCredentials.map((credential) => (
          <TooltipProvider key={credential.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge 
                  variant="outline" 
                  className={`flex items-center gap-1 ${
                    credential.verification_status === 'verified' ? 'bg-green-50 text-green-700 border-green-200' : 
                    'bg-gray-50 text-gray-700 border-gray-200'
                  }`}
                >
                  {credential.verification_status === 'verified' && (
                    <BadgeCheck className="h-3 w-3 text-green-500" />
                  )}
                  {credential.credential_name}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <div className="p-1">
                  <p className="font-medium">{credential.credential_name}</p>
                  {credential.issuer && (
                    <p className="text-xs text-muted-foreground">Issued by {credential.issuer}</p>
                  )}
                  {credential.issue_date && (
                    <p className="text-xs text-muted-foreground">
                      Issued: {new Date(credential.issue_date).toLocaleDateString()}
                    </p>
                  )}
                  {credential.verification_status === 'verified' ? (
                    <div className="flex items-center mt-1 text-xs text-green-600">
                      <BadgeCheck className="h-3 w-3 mr-1" />
                      Verified
                    </div>
                  ) : (
                    <div className="text-xs text-amber-600 mt-1">Verification pending</div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        
        {!showAll && sortedCredentials.length > limit && (
          <Badge variant="outline" className="bg-gray-50 text-gray-700">
            +{sortedCredentials.length - limit} more
          </Badge>
        )}
      </div>
    );
  }
  
  // List variant
  return (
    <div className="space-y-2">
      {displayCredentials.map((credential) => (
        <div key={credential.id} className="flex items-start">
          {credential.verification_status === 'verified' && (
            <BadgeCheck className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
          )}
          <div>
            <div className="font-medium">{credential.credential_name}</div>
            {credential.issuer && (
              <div className="text-sm text-muted-foreground">{credential.issuer}</div>
            )}
            {credential.issue_date && (
              <div className="text-xs text-muted-foreground">
                Issued: {new Date(credential.issue_date).toLocaleDateString()}
                {credential.expiry_date && ` · Expires: ${new Date(credential.expiry_date).toLocaleDateString()}`}
              </div>
            )}
          </div>
        </div>
      ))}
      
      {!showAll && sortedCredentials.length > limit && (
        <div className="text-sm text-muted-foreground pt-1">
          +{sortedCredentials.length - limit} more credentials
        </div>
      )}
    </div>
  );
};

export default PartnerCredentials;
