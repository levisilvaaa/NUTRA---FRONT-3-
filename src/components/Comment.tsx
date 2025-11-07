import React, { useState } from 'react';
import { ThumbsUp, Heart } from 'lucide-react';
import { Comment as CommentType, Reply } from '../types/comment';
import { CommentInput } from './CommentInput';

interface CommentProps {
  comment: CommentType;
  onLike: (id: string) => void;
  onReply: (commentId: string, replyText: string) => void;
  onToggleReplyInput: (id: string) => void;
}

export const Comment: React.FC<CommentProps> = ({
  comment,
  onLike,
  onReply,
  onToggleReplyInput
}) => {
  const [showReplies, setShowReplies] = useState(false);

  const handleReplySubmit = (text: string) => {
    onReply(comment.id, text);
    onToggleReplyInput(comment.id);
    setShowReplies(true);
  };

  const handleReplyCancel = () => {
    onToggleReplyInput(comment.id);
  };

  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className="bg-gray-50 rounded-lg p-3 mb-3">
      <div className="flex gap-3">
        <img
          src={comment.avatar}
          alt={comment.author}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="mb-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-gray-900">{comment.author}</span>
              <span className="text-xs text-gray-500">{comment.time}</span>
            </div>
            <p className="text-sm text-gray-700 mt-1 break-words">{comment.text}</p>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={() => onLike(comment.id)}
              className={`text-xs font-semibold transition-colors ${
                comment.isLiked ? 'text-blue-600' : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              like
            </button>

            <button
              onClick={() => onToggleReplyInput(comment.id)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Comment
            </button>

            <div className="flex items-center gap-1 ml-auto">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                  <ThumbsUp className="w-3 h-3 text-white fill-white" />
                </div>
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center -ml-1">
                  <Heart className="w-3 h-3 text-white fill-white" />
                </div>
              </div>
              <span className="text-xs text-gray-600 ml-1">{comment.likes}</span>
            </div>
          </div>

          {comment.showReplyInput && (
            <CommentInput
              onSubmit={handleReplySubmit}
              onCancel={handleReplyCancel}
              placeholder="Write a comment..."
            />
          )}

          {hasReplies && !showReplies && (
            <button
              onClick={() => setShowReplies(true)}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 mt-3 transition-colors"
            >
              View {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
            </button>
          )}

          {hasReplies && showReplies && (
            <div className="mt-3 space-y-3">
              {comment.replies.map((reply) => (
                <ReplyComment
                  key={reply.id}
                  reply={reply}
                  onLike={onLike}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface ReplyCommentProps {
  reply: Reply;
  onLike: (id: string) => void;
}

const ReplyComment: React.FC<ReplyCommentProps> = ({ reply, onLike }) => {
  return (
    <div className="flex gap-2 ml-2">
      <img
        src={reply.avatar}
        alt={reply.author}
        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <div className="mb-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-gray-900">{reply.author}</span>
            <span className="text-xs text-gray-500">{reply.time}</span>
          </div>
          <p className="text-sm text-gray-700 mt-1 break-words">{reply.text}</p>
        </div>

        <div className="flex items-center gap-4 mt-1">
          <button
            onClick={() => onLike(reply.id)}
            className={`text-xs font-semibold transition-colors ${
              reply.isLiked ? 'text-blue-600' : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            like
          </button>

          <button
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};
