
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NotFoundStateProps {
  title: string;
  description: string;
  backLink: string;
  backLinkText: string;
}

const NotFoundState = ({ title, description, backLink, backLinkText }: NotFoundStateProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link to={backLink}>{backLinkText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotFoundState;
