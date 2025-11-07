import React from 'react';
import { ThumbsUp } from 'lucide-react';
import { Comment as CommentType, Reply } from '../types/comment';
import { CommentInput } from './CommentInput';

interface CommentProps {
  comment: CommentType;
  onLike: (id: string) => void;
  onReply: (commentId: string, replyText: string) => void;
  onToggleReplyInput: (id: string) => void;
  isReply?: boolean;
}

export const Comment: React.FC<CommentProps> = ({
  comment,
  onLike,
  onReply,
  onToggleReplyInput,
  isReply = false
}) => {
  const handleReplySubmit = (text: string) => {
    onReply(comment.id, text);
    onToggleReplyInput(comment.id);
  };

  const handleReplyCancel = () => {
    onToggleReplyInput(comment.id);
  };

  return (
    <div className={isReply ? 'ml-12 mt-3' : 'mt-4'}>
      <div className="flex gap-2">
        <img
          src={comment.avatar}
          alt={comment.author}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="bg-gray-100 rounded-2xl px-4 py-2 inline-block max-w-full">
            <div className="font-semibold text-sm text-gray-900">{comment.author}</div>
            <p className="text-sm text-gray-800 mt-0.5 break-words">{comment.text}</p>
          </div>

          <div className="flex items-center gap-4 mt-1 ml-4">
            <button
              onClick={() => onLike(comment.id)}
              className={`flex items-center gap-1 text-xs font-semibold transition-colors ${
                comment.isLiked ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <ThumbsUp className={`w-3 h-3 ${comment.isLiked ? 'fill-blue-600' : ''}`} />
              <span>{comment.likes > 0 ? comment.likes : 'Like'}</span>
            </button>

            {!isReply && (
              <button
                onClick={() => onToggleReplyInput(comment.id)}
                className="text-xs font-semibold text-gray-600 hover:text-blue-600 transition-colors"
              >
                Reply
              </button>
            )}

            <span className="text-xs text-gray-500">{comment.time}</span>
          </div>

          {comment.showReplyInput && (
            <CommentInput
              onSubmit={handleReplySubmit}
              onCancel={handleReplyCancel}
              placeholder="Write a reply..."
            />
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-2">
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
    <div className="mt-3">
      <div className="flex gap-2">
        <img
          src={reply.avatar}
          alt={reply.author}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <div className="bg-gray-100 rounded-2xl px-4 py-2 inline-block max-w-full">
            <div className="font-semibold text-sm text-gray-900">{reply.author}</div>
            <p className="text-sm text-gray-800 mt-0.5 break-words">{reply.text}</p>
          </div>

          <div className="flex items-center gap-4 mt-1 ml-4">
            <button
              onClick={() => onLike(reply.id)}
              className={`flex items-center gap-1 text-xs font-semibold transition-colors ${
                reply.isLiked ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <ThumbsUp className={`w-3 h-3 ${reply.isLiked ? 'fill-blue-600' : ''}`} />
              <span>{reply.likes > 0 ? reply.likes : 'Like'}</span>
            </button>

            <span className="text-xs text-gray-500">{reply.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
