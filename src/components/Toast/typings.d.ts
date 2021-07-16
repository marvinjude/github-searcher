export type MessageType = {
  /*The very first comment*/
  id: number;

  /*The very second comment*/
  value: string;
};

export type ToastContextType = {
  messages?: MessageType[];
  addToast?: (message: string) => any;
};
