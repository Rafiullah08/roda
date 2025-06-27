
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Info } from "lucide-react";
import { Partner, PartnerExpertise, PartnerExpertiseTabProps } from "@/types/partner";
import { getPartnerExpertise } from "@/services/partners";

const PartnerExpertiseTab = ({ partner }: PartnerExpertiseTabProps) => {
  const [expertise, setExpertise] = useState<PartnerExpertise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExpertise = async () => {
      setLoading(true);
      try {
        const expertiseData = await getPartnerExpertise(partner.id);
        setExpertise(expertiseData || []);
      } catch (error) {
        console.error("Error fetching partner expertise:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpertise();
  }, [partner.id]);

  if (loading) {
    return <div className="text-center py-4">Loading expertise data...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Partner Expertise</CardTitle>
        <CardDescription>Areas of specialization and experience</CardDescription>
      </CardHeader>
      <CardContent>
        {expertise.length > 0 ? (
          <div className="space-y-4">
            <div className="rounded-md border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategory</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill Level</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {expertise.map((exp) => (
                    <tr key={exp.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{exp.category_name || "N/A"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{exp.subcategory_name || "N/A"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{exp.years_experience ? `${exp.years_experience} years` : "N/A"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">{exp.skill_level || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Expertise Registered</h3>
            <p className="text-muted-foreground">
              This partner has not registered any areas of expertise yet.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Edit Expertise
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PartnerExpertiseTab;
