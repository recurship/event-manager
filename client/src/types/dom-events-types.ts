import React from 'react';

export type SubmitVoid = {
  onSubmit: (e: React.SyntheticEvent) => void
}

export interface InputChange<T> {
  target: T
}

export type HTMLFormEvent = {
  handleSubmit: (e: React.SyntheticEvent) => void
}