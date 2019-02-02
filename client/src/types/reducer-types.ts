export type DefaultAppStateType = {
  loading: Array<Object>,
  errors: any,
}

export type DefaultUserStateType = {
  token: string | null,
  currentUser?: Object | null,
}

export type DefaultEventStateType = {
  events?: Array<Object>,
  event?: Object,
}

export type DefaultUserProfileStateType = {
  user: Object | null,
}