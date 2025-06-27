
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Pencil, Save, BadgeCheck, Award, FileText, User } from 'lucide-react';
import PartnerDashboardLayout from '@/components/layout/PartnerDashboardLayout';
import { usePartnerProfile } from '@/hooks/usePartnerProfile';
import { usePartnerDashboard } from '@/contexts/PartnerDashboardContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import PartnerRatingBadge from '@/components/partner/PartnerRatingBadge';
import PartnerCredentials, { Credential } from '@/components/partner/PartnerCredentials';
import { updatePartner } from '@/services/partners/partnerProfileService';

const PartnerProfilePage = () => {
  const { partner: contextPartner } = usePartnerDashboard();
  const partnerId = contextPartner?.id;
  const { partner, isLoading, error, refetch } = usePartnerProfile(partnerId);
  const [activeTab, setActiveTab] = useState('about');
  const [isEditing, setIsEditing] = useState(false);
  
  // Edit form state
  const [formData, setFormData] = useState({
    business_name: '',
    contact_name: '',
    contact_email: '',
    bio: '',
    website: '',
    expertise: [''],
  });

  // Initialize form data when partner data is loaded
  React.useEffect(() => {
    if (partner) {
      setFormData({
        business_name: partner.business_name || '',
        contact_name: partner.contact_name || '',
        contact_email: partner.contact_email || '',
        bio: partner.bio || '',
        website: partner.website || '',
        expertise: partner.expertise || [''],
      });
    }
  }, [partner]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      if (!partnerId) return;
      
      await updatePartner(partnerId, {
        business_name: formData.business_name,
        contact_name: formData.contact_name,
        contact_email: formData.contact_email,
        bio: formData.bio,
        website: formData.website,
      });
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <PartnerDashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </PartnerDashboardLayout>
    );
  }

  if (error || !partner) {
    return (
      <PartnerDashboardLayout>
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64">
            <h2 className="text-2xl font-bold text-gray-700">Profile Not Found</h2>
            <p className="text-muted-foreground mt-2">Unable to load partner profile</p>
            <Button className="mt-4" onClick={() => refetch()}>Try Again</Button>
          </CardContent>
        </Card>
      </PartnerDashboardLayout>
    );
  }

  return (
    <PartnerDashboardLayout>
      <div className="container mx-auto py-6 px-4 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Partner Profile</h1>
          <div>
            {!isEditing ? (
              <Button onClick={handleEditToggle}>
                <Pencil className="h-4 w-4 mr-2" /> Edit Profile
              </Button>
            ) : (
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            )}
          </div>
        </div>
        
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={partner.avatar_url || ""} alt={partner.business_name} />
                  <AvatarFallback className="text-xl">
                    {partner.business_name?.charAt(0) || partner.contact_name?.charAt(0) || "P"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold">
                    {isEditing ? (
                      <input
                        type="text"
                        className="border p-1 rounded w-full"
                        value={formData.business_name}
                        onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                      />
                    ) : (
                      partner.business_name
                    )}
                  </h1>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 md:ml-2">
                    {partner.status === 'approved' ? 'Verified Partner' : 'Partner'}
                  </Badge>
                </div>
                <div className="text-muted-foreground">
                  {partner.partner_type === 'agency' ? 'Service Agency' : 'Independent Professional'}
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-3">
                  <PartnerRatingBadge 
                    rating={partner.rating || 0} 
                    reviewsCount={partner.reviews_count || 0} 
                    size="lg"
                  />
                </div>
                
                <div className="mt-4">
                  <PartnerCredentials 
                    credentials={partner.credentials || []} 
                    limit={3}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Content */}
        <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 md:w-auto">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>
          
          {/* About Tab */}
          <TabsContent value="about" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>About Your Business</CardTitle>
                <CardDescription>
                  Professional background and expertise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Bio</h3>
                    {isEditing ? (
                      <textarea
                        className="border p-2 rounded w-full min-h-[120px]"
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        placeholder="Tell potential clients about your business, experience, and what makes you unique..."
                      />
                    ) : (
                      <p className="text-gray-700">
                        {partner.bio || `No bio has been added yet. Click 'Edit Profile' to add information about your business.`}
                      </p>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Contact Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        {isEditing ? (
                          <input
                            type="text"
                            className="border p-1 rounded w-full"
                            value={formData.contact_name}
                            onChange={(e) => setFormData({...formData, contact_name: e.target.value})}
                          />
                        ) : (
                          <p>{partner.contact_name}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        {isEditing ? (
                          <input
                            type="email"
                            className="border p-1 rounded w-full"
                            value={formData.contact_email}
                            onChange={(e) => setFormData({...formData, contact_email: e.target.value})}
                          />
                        ) : (
                          <p>{partner.contact_email}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Website</p>
                        {isEditing ? (
                          <input
                            type="url"
                            className="border p-1 rounded w-full"
                            value={formData.website || ''}
                            onChange={(e) => setFormData({...formData, website: e.target.value})}
                            placeholder="https://example.com"
                          />
                        ) : (
                          <p>{partner.website || 'No website provided'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Areas of Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {(partner.expertise || []).map((area, index) => (
                        <Badge key={index} variant="secondary">{area}</Badge>
                      ))}
                      {partner.expertise?.length === 0 && (
                        <p className="text-gray-500">No expertise areas added yet.</p>
                      )}
                    </div>
                    {isEditing && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 mb-1">Expertise areas will be managed in a future update.</p>
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Service Stats</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-slate-50 p-4 rounded-md">
                        <div className="text-muted-foreground text-sm mb-1">Projects Completed</div>
                        <div className="font-bold text-xl">{partner.completed_projects || 0}</div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-md">
                        <div className="text-muted-foreground text-sm mb-1">Average Response Time</div>
                        <div className="font-bold text-xl">{partner.response_time || "N/A"}</div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-md">
                        <div className="text-muted-foreground text-sm mb-1">Years Experience</div>
                        <div className="font-bold text-xl">{partner.years_experience || 0}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Credentials Tab */}
          <TabsContent value="credentials" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Professional Credentials</CardTitle>
                    <CardDescription>
                      Manage your qualifications, certifications, and skills
                    </CardDescription>
                  </div>
                  <Button>Add New Credential</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <BadgeCheck className="mr-2 h-5 w-5 text-green-600" /> Certifications
                    </h3>
                    <div className="space-y-4">
                      {(partner.credentials || [])
                        .filter(c => c.credential_type === 'certification')
                        .map(cert => (
                          <div key={cert.id} className="flex justify-between p-4 border rounded-md">
                            <div>
                              <div className="font-medium">{cert.credential_name}</div>
                              {cert.issuer && <div className="text-sm">Issued by {cert.issuer}</div>}
                              {cert.issue_date && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  Issued: {new Date(cert.issue_date).toLocaleDateString()}
                                </div>
                              )}
                              {cert.verification_status === 'verified' ? (
                                <div className="flex items-center mt-2 text-sm text-green-600">
                                  <BadgeCheck className="h-4 w-4 mr-1" /> Verified
                                </div>
                              ) : (
                                <div className="flex items-center mt-2 text-sm text-amber-600">
                                  Pending Verification
                                </div>
                              )}
                            </div>
                            <div className="flex items-start gap-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm" className="text-red-500">Remove</Button>
                            </div>
                          </div>
                        ))}
                      {(partner.credentials || []).filter(c => c.credential_type === 'certification').length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No certifications added yet.
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <User className="mr-2 h-5 w-5 text-blue-600" /> Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(partner.credentials || [])
                        .filter(c => c.credential_type === 'skill')
                        .map(skill => (
                          <Badge key={skill.id} variant="outline" className="text-sm bg-blue-50 text-blue-800">
                            {skill.credential_name}
                          </Badge>
                        ))}
                      {(partner.credentials || []).filter(c => c.credential_type === 'skill').length === 0 && (
                        <div className="text-center py-4 w-full text-muted-foreground">
                          No skills added yet.
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <Award className="mr-2 h-5 w-5 text-purple-600" /> Awards & Recognition
                    </h3>
                    <div className="space-y-4">
                      {(partner.credentials || [])
                        .filter(c => c.credential_type === 'award')
                        .map(award => (
                          <div key={award.id} className="flex justify-between p-4 border rounded-md">
                            <div>
                              <div className="font-medium">{award.credential_name}</div>
                              {award.issuer && <div className="text-sm">Awarded by {award.issuer}</div>}
                              {award.issue_date && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  Date: {new Date(award.issue_date).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                            <div className="flex items-start gap-2">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm" className="text-red-500">Remove</Button>
                            </div>
                          </div>
                        ))}
                      {(partner.credentials || []).filter(c => c.credential_type === 'award').length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          No awards or recognition entries yet.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Your Portfolio</CardTitle>
                    <CardDescription>
                      Showcase your work and build credibility
                    </CardDescription>
                  </div>
                  <Button>Add Portfolio Item</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  You haven't added any portfolio items yet.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Services Tab */}
          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Your Services</CardTitle>
                    <CardDescription>
                      Services you're qualified to provide
                    </CardDescription>
                  </div>
                  <Button>Manage Services</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  Your services will appear here after they're assigned to you.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PartnerDashboardLayout>
  );
};

export default PartnerProfilePage;
