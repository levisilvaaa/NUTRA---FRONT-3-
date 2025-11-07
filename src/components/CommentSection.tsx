import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Comment } from './Comment';
import { Comment as CommentType, Reply } from '../types/comment';
import { commentsData } from '../data/commentsData';

export const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<CommentType[]>(commentsData);

  const handleLike = (id: string) => {
    setComments(prevComments =>
      prevComments.map(comment => {
        if (comment.id === id) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          };
        }

        if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: comment.replies.map(reply =>
              reply.id === id
                ? {
                    ...reply,
                    isLiked: !reply.isLiked,
                    likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
                  }
                : reply
            )
          };
        }

        return comment;
      })
    );
  };

  const handleToggleReplyInput = (id: string) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === id
          ? { ...comment, showReplyInput: !comment.showReplyInput }
          : { ...comment, showReplyInput: false }
      )
    );
  };

  const handleReply = (commentId: string, replyText: string) => {
    setComments(prevComments =>
      prevComments.map(comment => {
        if (comment.id === commentId) {
          const newReply: Reply = {
            id: `${commentId}-${Date.now()}`,
            author: 'You',
            avatar: 'https://i.postimg.cc/439DzHNp/SEMUSURAIO.png',
            text: replyText,
            time: 'Just now',
            likes: 0,
            isLiked: false
          };

          return {
            ...comment,
            replies: [...comment.replies, newReply],
            showReplyInput: false
          };
        }
        return comment;
      })
    );
  };

  const totalComments = comments.reduce(
    (total, comment) => total + 1 + (comment.replies?.length || 0),
    0
  );

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg mt-6 mb-6">
      <div className="px-2">
        <div className="space-y-0">
          {comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              onLike={handleLike}
              onReply={handleReply}
              onToggleReplyInput={handleToggleReplyInput}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
