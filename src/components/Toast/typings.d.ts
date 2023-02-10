export type MessageType = {
  id: number;
  value: string;
};

export type ToastContextType = {
  messages?: MessageType[];
  addToast?: (message: string) => any;
};
