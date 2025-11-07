export interface Reply {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
  isLiked: boolean;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
  isLiked: boolean;
  replies: Reply[];
  showReplyInput?: boolean;
}
