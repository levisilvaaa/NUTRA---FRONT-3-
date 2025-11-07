import React, { useState } from 'react';

interface CommentInputProps {
  onSubmit: (text: string) => void;
  onCancel: () => void;
  placeholder?: string;
}

export const CommentInput: React.FC<CommentInputProps> = ({
  onSubmit,
  onCancel,
  placeholder = "Write a reply..."
}) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim().length > 0) {
      onSubmit(text);
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="mt-2 ml-12">
      <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-transparent border-none outline-none resize-none text-sm"
          rows={2}
        />
        <div className="flex justify-end gap-2 mt-1">
          <button
            onClick={onCancel}
            className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={text.trim().length === 0}
            className="px-3 py-1 text-xs font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};
