import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommentSection = ({ comments: initialComments = [], onAddComment }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleSubmitComment = (e) => {
    e?.preventDefault();
    if (!newComment?.trim()) return;

    const comment = {
      id: Date.now(),
      author: {
        name: "Current User",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      content: newComment,
      timestamp: new Date()?.toISOString(),
      replies: []
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
    onAddComment && onAddComment(comment);
  };

  const handleSubmitReply = (e, parentId) => {
    e?.preventDefault();
    if (!replyText?.trim()) return;

    const reply = {
      id: Date.now(),
      author: {
        name: "Current User",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      content: replyText,
      timestamp: new Date()?.toISOString()
    };

    setComments(prev => prev?.map(comment => 
      comment?.id === parentId 
        ? { ...comment, replies: [...(comment?.replies || []), reply] }
        : comment
    ));

    setReplyText('');
    setReplyingTo(null);
  };

  const CommentItem = ({ comment, isReply = false }) => (
    <div className={`${isReply ? 'ml-12' : ''} mb-6`}>
      <div className="flex space-x-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={comment?.author?.avatar}
            alt={comment?.author?.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">{comment?.author?.name}</h4>
              <span className="text-xs text-muted-foreground">
                {formatTimeAgo(comment?.timestamp)}
              </span>
            </div>
            <p className="text-foreground font-serif">{comment?.content}</p>
          </div>
          
          {!isReply && (
            <div className="flex items-center space-x-4 mt-2">
              <button
                onClick={() => setReplyingTo(replyingTo === comment?.id ? null : comment?.id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                <Icon name="Reply" size={14} className="inline mr-1" />
                Reply
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                <Icon name="Heart" size={14} className="inline mr-1" />
                Like
              </button>
            </div>
          )}

          {/* Reply Form */}
          {replyingTo === comment?.id && (
            <form onSubmit={(e) => handleSubmitReply(e, comment?.id)} className="mt-4">
              <div className="flex space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="Your avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e?.target?.value)}
                    placeholder={`Reply to ${comment?.author?.name}...`}
                    className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    rows={3}
                  />
                  <div className="flex justify-end space-x-2 mt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyingTo(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!replyText?.trim()}
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* Replies */}
          {comment?.replies && comment?.replies?.length > 0 && (
            <div className="mt-4">
              {comment?.replies?.map((reply) => (
                <CommentItem key={reply?.id} comment={reply} isReply={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="mt-12">
      <h3 className="text-2xl font-heading font-bold text-foreground mb-8">
        Comments ({comments?.length})
      </h3>
      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="flex space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="Your avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e?.target?.value)}
              placeholder="Share your thoughts..."
              className="w-full p-4 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              rows={4}
            />
            <div className="flex justify-end mt-3">
              <Button
                type="submit"
                disabled={!newComment?.trim()}
                iconName="Send"
                iconPosition="right"
              >
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      </form>
      {/* Comments List */}
      <div className="space-y-6">
        {comments?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="MessageCircle" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments?.map((comment) => (
            <CommentItem key={comment?.id} comment={comment} />
          ))
        )}
      </div>
    </section>
  );
};

export default CommentSection;