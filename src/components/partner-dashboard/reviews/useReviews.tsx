
import { useState } from 'react';
import { ReviewType } from './ReviewItem';
import { SortOption } from './ReviewSort';

// Mock data - in a real app this would come from an API
const initialReviews: ReviewType[] = [
  {
    id: 1,
    customerName: "Alex Johnson",
    serviceName: "Logo Design",
    date: "Apr 12, 2025",
    rating: 4,
    content: "Great work on our logo design! The partner was responsive and professional throughout the process. The final design perfectly captured our brand identity. Would definitely recommend their services.",
    read: false,
  },
  {
    id: 2,
    customerName: "Sarah Williams",
    serviceName: "Website Development",
    date: "Apr 8, 2025",
    rating: 5,
    content: "Exceptional service! The website exceeded my expectations. Very detailed work and great communication throughout the project. Will definitely work with them again for future projects.",
    read: false,
  },
  {
    id: 3,
    customerName: "Michael Rodriguez",
    serviceName: "SEO Optimization",
    date: "Mar 25, 2025",
    rating: 3,
    content: "Good work on the SEO optimization. We've seen improvements in our rankings. Some elements could have been implemented better, but overall satisfied with the results.",
    read: true,
  },
  {
    id: 4,
    customerName: "Emma Thompson",
    serviceName: "Social Media Management",
    date: "Mar 15, 2025",
    rating: 5,
    content: "Amazing job managing our social media accounts! Engagement has increased significantly, and the content has been consistently high quality. Very pleased with the results.",
    read: true,
  },
  {
    id: 5,
    customerName: "David Lee",
    serviceName: "Logo Design",
    date: "Feb 28, 2025",
    rating: 4,
    content: "Satisfied with the logo design. The process was smooth, and the designer was receptive to feedback. Would recommend to others looking for design services.",
    read: true,
  }
];

export const useReviews = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [sortOption, setSortOption] = useState<SortOption>('newest');

  const markAsRead = (id: number) => {
    setReviews(prev => 
      prev.map(review => 
        review.id === id ? { ...review, read: true } : review
      )
    );
  };

  const markAllAsRead = () => {
    setReviews(prev => prev.map(review => ({ ...review, read: true })));
  };

  const sortReviews = (reviewsToSort: ReviewType[], option: SortOption): ReviewType[] => {
    const reviewsCopy = [...reviewsToSort];

    switch (option) {
      case 'newest':
        // Sort by date descending (assuming the format "MMM DD, YYYY")
        return reviewsCopy.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        });
      case 'oldest':
        // Sort by date ascending
        return reviewsCopy.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA.getTime() - dateB.getTime();
        });
      case 'highest':
        // Sort by rating descending
        return reviewsCopy.sort((a, b) => b.rating - a.rating);
      case 'lowest':
        // Sort by rating ascending
        return reviewsCopy.sort((a, b) => a.rating - b.rating);
      default:
        return reviewsCopy;
    }
  };

  const sortedReviews = sortReviews(reviews, sortOption);
  const unreadCount = reviews.filter(r => !r.read).length;

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };

  return {
    reviews: sortedReviews,
    markAsRead,
    markAllAsRead,
    unreadCount,
    sortOption,
    handleSortChange
  };
};

export default useReviews;
