import type messages from '../../messages/ko.json';

export type Messages = typeof messages;

export type FlattenMessages<T, K extends string = ''> = T extends object
  ? {
      [P in keyof T]: FlattenMessages<T[P], K extends '' ? `${string & P}` : `${K}.${string & P}`>;
    }[keyof T]
  : K;

export type MessageKey = FlattenMessages<Messages>;
