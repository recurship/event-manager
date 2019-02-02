export type Comment = {
  id: string,
  commentedBy: {
    avatar?: string,
    username: string
  },
  comment: string,
  commentDatetime: string,
}

export type Comments = {
  comments: Array<Comment>,
  length?: number,
}

export type EventComments = {
  event: {
    comments: Array<Comment>
  },
}