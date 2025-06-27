
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BusinessDetailsCardProps {
  formData: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    businessType: string;
    website: string;
    taxId: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const BusinessDetailsCard: React.FC<BusinessDetailsCardProps> = ({
  formData,
  setFormData,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) =>
              setFormData({ ...formData, city: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) =>
              setFormData({ ...formData, zipCode: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="businessType">Business Type</Label>
          <Input
            id="businessType"
            value={formData.businessType}
            onChange={(e) =>
              setFormData({ ...formData, businessType: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, website: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="taxId">Tax ID</Label>
          <Input
            id="taxId"
            value={formData.taxId}
            onChange={(e) =>
              setFormData({ ...formData, taxId: e.target.value })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessDetailsCard;
