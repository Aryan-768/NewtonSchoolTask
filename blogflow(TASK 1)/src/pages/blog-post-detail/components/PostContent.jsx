import React from 'react';

const PostContent = ({ content, excerpt }) => {
  // Format content with proper paragraph breaks
  const formatContent = (text) => {
    return text?.split('\n\n')?.map((paragraph, index) => (
      <p key={index} className="mb-6 text-lg leading-relaxed text-foreground font-serif">
        {paragraph}
      </p>
    ));
  };

  return (
    <article className="prose prose-lg max-w-none">
      {/* Excerpt */}
      {excerpt && (
        <div className="text-xl text-muted-foreground font-serif italic mb-8 p-6 bg-muted/30 rounded-lg border-l-4 border-primary">
          {excerpt}
        </div>
      )}
      {/* Main Content */}
      <div className="text-foreground">
        {formatContent(content)}
      </div>
      {/* Tags */}
      <div className="mt-12 pt-8 border-t border-border">
        <h4 className="text-sm font-medium text-muted-foreground mb-4">TAGS</h4>
        <div className="flex flex-wrap gap-2">
          {['React', 'JavaScript', 'Web Development', 'Frontend', 'Tutorial']?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full hover:bg-primary/10 hover:text-primary transition-smooth cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default PostContent;