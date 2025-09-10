import React from 'react';
import BlogPostCard from './BlogPostCard';

const BlogPostGrid = ({ posts, onLike, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 })?.map((_, index) => (
          <div key={index} className="bg-card border border-border rounded-lg shadow-subtle overflow-hidden animate-pulse">
            <div className="h-48 bg-muted"></div>
            <div className="p-6">
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <div className="h-3 bg-muted rounded w-20"></div>
                <div className="h-3 bg-muted rounded w-16"></div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-4">
                  <div className="h-3 bg-muted rounded w-8"></div>
                  <div className="h-3 bg-muted rounded w-8"></div>
                  <div className="h-3 bg-muted rounded w-8"></div>
                </div>
                <div className="h-3 bg-muted rounded w-16"></div>
              </div>
              <div className="h-10 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!posts || posts?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          No posts found
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We couldn't find any blog posts matching your criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts?.map((post) => (
        <BlogPostCard
          key={post?.id}
          post={post}
          onLike={onLike}
        />
      ))}
    </div>
  );
};

export default BlogPostGrid;