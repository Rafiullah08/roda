
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Star, Calendar, User, BadgeCheck, Award, UserRound, LinkIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import PartnerRatingBadge from '@/components/partner/PartnerRatingBadge';
import PartnerCredentials, { Credential } from '@/components/partner/PartnerCredentials';
import { toast } from '@/components/ui/use-toast';

const PartnerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('about');
  const [loading, setLoading] = useState(true);
  const [partner, setPartner] = useState<any>(null);
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartnerData = async () => {
      setLoading(true);
      try {
        if (!id) {
          setError('Partner ID is required');
          return;
        }

        // Fetch partner data from the database
        const { data: partnerData, error: partnerError } = await supabase
          .from('partners')
          .select('*')
          .eq('id', id)
          .single();

        if (partnerError) {
          throw partnerError;
        }

        if (!partnerData) {
          setError('Partner not found');
          return;
        }

        // For demo purposes, we'll create some mock credentials
        const mockCredentials: Credential[] = [
          {
            id: '1',
            credential_type: 'certification',
            credential_name: 'Professional Service Provider',
            issuer: 'Service Quality Association',
            issue_date: '2022-05-15',
            verification_status: 'verified'
          },
          {
            id: '2',
            credential_type: 'certification',
            credential_name: 'Customer Service Excellence',
            issuer: 'Customer Experience Institute',
            issue_date: '2021-09-10',
            verification_status: 'verified'
          },
          {
            id: '3',
            credential_type: 'skill',
            credential_name: 'Project Management',
            verification_status: 'verified'
          },
          {
            id: '4',
            credential_type: 'education',
            credential_name: 'Bachelor of Business Administration',
            issuer: 'State University',
            issue_date: '2019-06-01',
            verification_status: 'verified'
          },
          {
            id: '5',
            credential_type: 'award',
            credential_name: 'Service Provider of the Year',
            issuer: 'Industry Association',
            issue_date: '2023-01-10',
            verification_status: 'verified'
          },
        ];

        setPartner({
          ...partnerData,
          rating: 4.7,
          reviewsCount: 32,
          completedProjects: 47,
          responseTime: '2 hours',
          expertise: ['Customer Service', 'Project Management', 'Quality Assurance'],
          availability: 'available'
        });
        setCredentials(mockCredentials);
      } catch (err: any) {
        console.error('Error fetching partner data:', err);
        setError(err.message || 'Failed to load partner profile');
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerData();
  }, [id]);

  const handleContactPartner = () => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the partner. They will respond shortly.",
    });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !partner) {
    return (
      <MainLayout>
        <div className="container mx-auto py-8 px-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-64">
              <h2 className="text-2xl font-bold text-gray-700">Partner Not Found</h2>
              <p className="text-muted-foreground mt-2">{error || 'Unable to load partner profile'}</p>
              <Button className="mt-4" onClick={() => window.history.back()}>Go Back</Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex-shrink-0">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={partner.business_name} />
                  <AvatarFallback className="text-xl">
                    {partner.business_name?.charAt(0) || partner.contact_name?.charAt(0) || "P"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold">{partner.business_name}</h1>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 md:ml-2">
                    Verified Partner
                  </Badge>
                  {partner.availability === 'available' && (
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Available Now
                    </Badge>
                  )}
                </div>
                <div className="text-muted-foreground">
                  {partner.partner_type === 'agency' ? 'Service Agency' : 'Independent Professional'}
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-3">
                  <PartnerRatingBadge 
                    rating={partner.rating} 
                    reviewsCount={partner.reviewsCount} 
                    size="lg"
                  />
                  
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm">Member since {new Date(partner.created_at).getFullYear()}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <PartnerCredentials 
                    credentials={credentials.slice(0, 3)} 
                    limit={3}
                  />
                </div>
              </div>
              <div className="flex-shrink-0 mt-4 md:mt-0">
                <Button onClick={handleContactPartner}>
                  <MessageSquare className="h-4 w-4 mr-2" /> Contact
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Content */}
        <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 md:w-auto w-full">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          {/* About Tab */}
          <TabsContent value="about" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>About {partner.business_name}</CardTitle>
                <CardDescription>
                  Professional background and expertise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Bio</h3>
                    <p className="text-gray-700">
                      {partner.bio || `${partner.business_name} is a ${partner.partner_type === 'agency' ? 'professional agency' : 'skilled individual'} specializing in delivering high-quality services to clients. With a strong focus on customer satisfaction and excellence in service delivery, ${partner.business_name} has built a reputation for reliability and professionalism.`}
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Service Areas</h3>
                    <div className="flex flex-wrap gap-2">
                      {(partner.expertise || ["Consulting", "Customer Service", "Project Management"]).map((area: string, index: number) => (
                        <Badge key={index} variant="secondary">{area}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Service Stats</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-slate-50 p-4 rounded-md">
                        <div className="text-muted-foreground text-sm mb-1">Projects Completed</div>
                        <div className="font-bold text-xl">{partner.completedProjects || 45}</div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-md">
                        <div className="text-muted-foreground text-sm mb-1">Average Response Time</div>
                        <div className="font-bold text-xl">{partner.responseTime || "2 hours"}</div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-md">
                        <div className="text-muted-foreground text-sm mb-1">Satisfaction Rate</div>
                        <div className="font-bold text-xl">98%</div>
                      </div>
                    </div>
                  </div>
                  
                  {partner.website && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="text-lg font-medium mb-2">Contact</h3>
                        <div className="flex items-center">
                          <LinkIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {partner.website}
                          </a>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Credentials Tab */}
          <TabsContent value="credentials" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Professional Credentials</CardTitle>
                <CardDescription>
                  Verified qualifications, certifications, and skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <BadgeCheck className="mr-2 h-5 w-5 text-green-600" /> Certifications
                    </h3>
                    <div className="space-y-4">
                      {credentials.filter(c => c.credential_type === 'certification').map(cert => (
                        <div key={cert.id} className="p-4 border rounded-md">
                          <div className="font-medium">{cert.credential_name}</div>
                          {cert.issuer && <div className="text-sm">Issued by {cert.issuer}</div>}
                          {cert.issue_date && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Issued: {new Date(cert.issue_date).toLocaleDateString()}
                            </div>
                          )}
                          {cert.verification_status === 'verified' && (
                            <div className="flex items-center mt-2 text-sm text-green-600">
                              <BadgeCheck className="h-4 w-4 mr-1" /> Verified
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <UserRound className="mr-2 h-5 w-5 text-blue-600" /> Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {credentials.filter(c => c.credential_type === 'skill').map(skill => (
                        <Badge key={skill.id} variant="outline" className="text-sm bg-blue-50 text-blue-800">
                          {skill.credential_name}
                        </Badge>
                      ))}
                      {partner.expertise?.map((skill: string, index: number) => (
                        <Badge key={`skill-${index}`} variant="outline" className="text-sm bg-blue-50 text-blue-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <Award className="mr-2 h-5 w-5 text-purple-600" /> Awards & Recognition
                    </h3>
                    <div className="space-y-4">
                      {credentials.filter(c => c.credential_type === 'award').map(award => (
                        <div key={award.id} className="p-4 border rounded-md">
                          <div className="font-medium">{award.credential_name}</div>
                          {award.issuer && <div className="text-sm">Awarded by {award.issuer}</div>}
                          {award.issue_date && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Date: {new Date(award.issue_date).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      ))}
                      {credentials.filter(c => c.credential_type === 'award').length === 0 && (
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
                <CardTitle>Portfolio</CardTitle>
                <CardDescription>
                  Showcase of past work and projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  Portfolio content is being updated.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Client Reviews</CardTitle>
                <CardDescription>
                  Feedback from previous clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  Client reviews will be displayed here.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default PartnerProfile;
