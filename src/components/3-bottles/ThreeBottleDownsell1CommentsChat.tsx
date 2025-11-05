import React, { useState, useEffect, useRef } from 'react';
import { Heart, Send } from 'lucide-react';

interface Comment {
  id: string;
  name: string;
  message: string;
  timeAgo: string;
  likes: number;
  liked: boolean;
  avatar: string;
  replies: Reply[];
}

interface Reply {
  id: string;
  name: string;
  message: string;
  timeAgo: string;
  likes: number;
  liked: boolean;
  avatar: string;
}

const ThreeBottleDownsell1CommentsChat: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [visibleComments, setVisibleComments] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // All comments data
  const allComments: Comment[] = [
    {
      id: '1',
      name: 'Jake M.',
      message: 'Had to grab this deal, the price is insane. Didn\'t think I\'d see it again!',
      timeAgo: '2m',
      likes: 12,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '2',
      name: 'Brandon S.',
      message: 'Got this offer just in time. Already feeling more energized every day.',
      timeAgo: '1m',
      likes: 8,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '3',
      name: 'Tyler G.',
      message: 'This deal is insane. I couldn\'t pass it up.',
      timeAgo: '3m',
      likes: 15,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '4',
      name: 'Ethan R.',
      message: 'Just completed my 9-month cycle. Best decision I made for myself.',
      timeAgo: '4m',
      likes: 23,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '5',
      name: 'Cameron H.',
      message: 'Finished my first 3 bottles, now completing the rest with this offer!',
      timeAgo: '5m',
      likes: 18,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '6',
      name: 'Logan D.',
      message: 'I\'ve bought with this discount once before… never saw it come back till now.',
      timeAgo: '5m',
      likes: 9,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '7',
      name: 'Austin W.',
      message: 'I didn\'t expect much, but it really boosted my drive. Worth it.',
      timeAgo: '6m',
      likes: 14,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '8',
      name: 'Mason J.',
      message: 'Seriously, this stuff works. Energy\'s up, confidence is back.',
      timeAgo: '7m',
      likes: 21,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '9',
      name: 'Bryce D.',
      message: 'Glad I clicked and saw this discount. Buying now before it\'s gone.',
      timeAgo: '8m',
      likes: 11,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '10',
      name: 'Liam T.',
      message: 'Crazy how much better I feel just 2 months into the treatment.',
      timeAgo: '9m',
      likes: 16,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1558203728-00f45181dd84?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '11',
      name: 'Shawn K.',
      message: 'Honestly… this stuff works better than anything I\'ve tried before.',
      timeAgo: '10m',
      likes: 19,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '12',
      name: 'Noah B.',
      message: 'Guys, don\'t sleep on this offer. I almost missed it.',
      timeAgo: '10m',
      likes: 13,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '13',
      name: 'Trevor M.',
      message: 'Already seeing progress and just hit month two. Let\'s go!',
      timeAgo: '12m',
      likes: 17,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '14',
      name: 'Aiden S.',
      message: 'My performance and drive skyrocketed. Worth every dollar.',
      timeAgo: '12m',
      likes: 25,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '15',
      name: 'Caleb K.',
      message: 'Ordered again to finish the 9-month protocol. Too good to pass.',
      timeAgo: '13m',
      likes: 20,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '16',
      name: 'Colton A.',
      message: 'Energy levels, focus, and confidence — all up. Just reordered.',
      timeAgo: '14m',
      likes: 22,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '17',
      name: 'Connor L.',
      message: 'Never felt this good in years. Highly recommend it.',
      timeAgo: '15m',
      likes: 18,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '18',
      name: 'Xavier N.',
      message: 'Second order now. Can\'t believe how fast this works.',
      timeAgo: '16m',
      likes: 14,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '19',
      name: 'Hunter W.',
      message: 'Saved over $900 with this deal. Don\'t think, just go!',
      timeAgo: '16m',
      likes: 27,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '20',
      name: 'Jace R.',
      message: 'Don\'t think twice. If you\'re on this page, take the deal!',
      timeAgo: '17m',
      likes: 16,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '21',
      name: 'Jackson F.',
      message: 'Energy\'s through the roof. Honestly surprised it worked this well.',
      timeAgo: '18m',
      likes: 19,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '22',
      name: 'Grayson J.',
      message: 'Never thought a natural product could actually work. This one does.',
      timeAgo: '19m',
      likes: 21,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '23',
      name: 'Nathan C.',
      message: 'Grabbed this last time and saw real changes. I\'m back for more.',
      timeAgo: '19m',
      likes: 15,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '24',
      name: 'Landon V.',
      message: 'Back here to finish the 9-month treatment. Feels amazing.',
      timeAgo: '21m',
      likes: 23,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '25',
      name: 'Chase H.',
      message: 'This is my second order. Can\'t believe the results I\'m seeing.',
      timeAgo: '21m',
      likes: 17,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '26',
      name: 'Micah T.',
      message: 'Not just hype — this stuff really made a difference for me.',
      timeAgo: '23m',
      likes: 20,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '27',
      name: 'Gavin P.',
      message: 'Finally something that delivers. This offer is solid.',
      timeAgo: '23m',
      likes: 12,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '28',
      name: 'Brody B.',
      message: 'Got a huge boost in energy and drive. No brainer at this price.',
      timeAgo: '24m',
      likes: 18,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '29',
      name: 'Cole E.',
      message: 'Got mine with free shipping. Can\'t beat that.',
      timeAgo: '25m',
      likes: 11,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '30',
      name: 'Jaxon L.',
      message: 'Didn\'t think I needed more bottles, but I was wrong. Completing it now.',
      timeAgo: '26m',
      likes: 16,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '31',
      name: 'Dylan V.',
      message: 'Using for 3 months now. Libido and energy are way up.',
      timeAgo: '27m',
      likes: 24,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '32',
      name: 'Parker E.',
      message: 'I\'ve tried other stuff. Nothing compares to this formula.',
      timeAgo: '27m',
      likes: 19,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1558203728-00f45181dd84?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '33',
      name: 'Blake Z.',
      message: 'Didn\'t think I needed the full cycle, but now I get it. Just ordered more.',
      timeAgo: '29m',
      likes: 13,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '34',
      name: 'Ryder C.',
      message: 'Shipping was fast. Results came even faster.',
      timeAgo: '29m',
      likes: 15,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '35',
      name: 'Brayden N.',
      message: 'Don\'t wait like I did the first time. Take the deal now.',
      timeAgo: '30m',
      likes: 22,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '36',
      name: 'Knox F.',
      message: 'Best investment I\'ve made in myself in a long time.',
      timeAgo: '30m',
      likes: 26,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '37',
      name: 'Ryan G.',
      message: 'Trust me, I was skeptical too. But it\'s been life-changing.',
      timeAgo: '32m',
      likes: 28,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '38',
      name: 'Beau Z.',
      message: 'Finally something that delivers on what it promises.',
      timeAgo: '32m',
      likes: 17,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '39',
      name: 'Zachary B.',
      message: 'Just locked in the discount. Let\'s finish this right!',
      timeAgo: '33m',
      likes: 14,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face',
      replies: []
    },
    {
      id: '40',
      name: 'Tanner Y.',
      message: 'Guys… this is your sign. Grab the offer while it\'s still active.',
      timeAgo: '34m',
      likes: 21,
      liked: false,
      avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face',
      replies: []
    }
  ];

  // Initialize with first few comments
  useEffect(() => {
    setComments(allComments.slice(0, 5));
    setVisibleComments(5);
  }, []);

  // Gradually show more comments
  useEffect(() => {
    if (visibleComments >= allComments.length || isUserInteracting) return;

    const showNextComment = () => {
      if (visibleComments < allComments.length && !isUserInteracting) {
        setVisibleComments(prev => prev + 1);
        // Get user comments and automatic comments
        const userComments = comments.filter(comment => comment.name === 'Guest');
        const automaticComments = allComments.slice(0, visibleComments + 1);
        // Put automatic comments first, then user comments (so new automatics appear below user)
        setComments([...automaticComments, ...userComments]);
        
        // Auto scroll to show new comment
        setTimeout(() => {
          if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
          }
        }, 100);
      }
    };

    const randomDelay = Math.random() * 4000 + 3000; // 3-7 seconds
    intervalRef.current = setTimeout(showNextComment, randomDelay);

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [visibleComments, isUserInteracting]);

  // Handle user interaction
  const handleUserInteraction = () => {
    setIsUserInteracting(true);
    setTimeout(() => setIsUserInteracting(false), 15000); // Resume after 15 seconds
  };

  const handleLike = (commentId: string, isReply: boolean = false, replyId?: string) => {
    setComments(prevComments =>
      prevComments.map(comment => {
        if (comment.id === commentId && !isReply) {
          return {
            ...comment,
            liked: !comment.liked,
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1
          };
        }
        if (isReply && replyId) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === replyId) {
                return {
                  ...reply,
                  liked: !reply.liked,
                  likes: reply.liked ? reply.likes - 1 : reply.likes + 1
                };
              }
              return reply;
            })
          };
        }
        return comment;
      })
    );
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    handleUserInteraction();

    const userComment: Comment = {
      id: Date.now().toString(),
      name: 'Guest',
      message: newComment,
      timeAgo: 'now',
      likes: 0,
      liked: false,
      avatar: `https://ui-avatars.com/api/?name=Guest&background=6366f1&color=fff&size=32`,
      replies: []
    };

    // Add user comment after automatic comments but before other user comments
    setComments(prev => {
      const automaticComments = prev.filter(comment => comment.name !== 'Guest');
      const existingUserComments = prev.filter(comment => comment.name === 'Guest');
      return [...automaticComments, ...existingUserComments, userComment];
    });
    setNewComment('');

    // Auto scroll to show new comment
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleAddReply = (commentId: string) => {
    if (!replyText.trim()) return;

    handleUserInteraction();

    const newReply: Reply = {
      id: Date.now().toString(),
      name: 'Guest',
      message: replyText,
      timeAgo: 'now',
      likes: 0,
      liked: false,
      avatar: `https://ui-avatars.com/api/?name=Guest&background=6366f1&color=fff&size=24`
    };

    setComments(prevComments =>
      prevComments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply]
          };
        }
        return comment;
      })
    );

    setReplyText('');
    setReplyingTo(null);

    // Auto scroll to show new reply
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: 'comment' | 'reply', commentId?: string) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (action === 'comment') {
        handleAddComment();
      } else if (action === 'reply' && commentId) {
        handleAddReply(commentId);
      }
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm mt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 via-red-100 to-red-50 p-4 border-b border-red-200 relative overflow-hidden">
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-100/50 via-red-200/30 to-red-100/50 animate-pulse"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-center space-x-3 mb-2">
            {/* Animated live indicator */}
            <div className="relative">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
            </div>
            
            {/* Main title with gradient */}
            <h3 className="text-base font-black bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent uppercase tracking-wider">
              LIVE COMMENTS
            </h3>
          </div>
          
          {/* Subtitle with enhanced styling */}
          <p className="text-center text-red-600 font-semibold text-sm tracking-wide">
            Real-time feedback
          </p>
        </div>
      </div>

      {/* Comments List */}
      <div ref={chatRef} className="max-h-[600px] overflow-y-auto p-4 space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-2">
            {/* Main Comment */}
            <div className="flex space-x-3">
              <img
                src={comment.avatar}
                alt={comment.name}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.name)}&background=6366f1&color=fff&size=32`;
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="bg-gray-100 rounded-2xl px-3 py-2">
                  <div className="font-semibold text-sm text-gray-900">{comment.name}</div>
                  <div className="text-sm text-gray-800">{comment.message}</div>
                </div>
                <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                  <span>{comment.timeAgo}</span>
                  <button
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center space-x-1 hover:text-red-500 transition-colors ${
                      comment.liked ? 'text-red-500' : ''
                    }`}
                  >
                    <Heart className={`w-3 h-3 ${comment.liked ? 'fill-current' : ''}`} />
                    <span>{comment.likes}</span>
                  </button>
                  <button
                    onClick={() => {
                      setReplyingTo(replyingTo === comment.id ? null : comment.id);
                      setReplyText('');
                      handleUserInteraction();
                    }}
                    className="hover:text-blue-500 transition-colors"
                  >
                    Reply
                  </button>
                </div>

                {/* Reply Input */}
                {replyingTo === comment.id && (
                  <div className="flex items-center space-x-2 mt-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=Guest&background=6366f1&color=fff&size=24`}
                      alt="Guest"
                      className="w-6 h-6 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 flex items-center space-x-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, 'reply', comment.id)}
                        placeholder="Write a reply..."
                        className="flex-1 bg-gray-100 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        maxLength={200}
                      />
                      {replyText.trim() && (
                        <button
                          onClick={() => handleAddReply(comment.id)}
                          className="text-blue-500 hover:text-blue-600 transition-colors"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="ml-6 mt-2 space-y-2">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex space-x-2">
                        <img
                          src={reply.avatar}
                          alt={reply.name}
                          className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(reply.name)}&background=6366f1&color=fff&size=24`;
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="bg-gray-100 rounded-2xl px-3 py-2">
                            <div className="font-semibold text-xs text-gray-900">{reply.name}</div>
                            <div className="text-xs text-gray-800">{reply.message}</div>
                          </div>
                          <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                            <span>{reply.timeAgo}</span>
                            <button
                              onClick={() => handleLike(comment.id, true, reply.id)}
                              className={`flex items-center space-x-1 hover:text-red-500 transition-colors ${
                                reply.liked ? 'text-red-500' : ''
                              }`}
                            >
                              <Heart className={`w-3 h-3 ${reply.liked ? 'fill-current' : ''}`} />
                              <span>{reply.likes}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src={`https://ui-avatars.com/api/?name=Guest&background=6366f1&color=fff&size=32`}
            alt="Guest"
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          <div className="flex-1 flex items-center space-x-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => {
                setNewComment(e.target.value);
                handleUserInteraction();
              }}
              onKeyPress={(e) => handleKeyPress(e, 'comment')}
              placeholder="Write a comment..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={200}
            />
            {newComment.trim() && (
              <button
                onClick={handleAddComment}
                className="text-blue-500 hover:text-blue-600 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeBottleDownsell1CommentsChat;