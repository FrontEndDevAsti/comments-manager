// Comment interfaces
export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface NewComment {
  postId: number;
  name: string;
  email: string;
  body: string;
}
