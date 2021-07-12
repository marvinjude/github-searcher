import { ToastContext } from "./Toast";
import { MessageType } from "./typings";
import { FC, useState, useCallback } from "react";

/*
 * Wrap the tree that need to use toast
 */
export const ToastProvider: FC = ({ children }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const addToast = useCallback((value: string) => {
    const id: number = Date.now();

    setMessages((prev) => [
      ...prev,
      {
        id,
        value,
      },
    ]);

    setTimeout(() => {
      setMessages((messages) =>
        messages.filter((message) => message.id !== id)
      );
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, messages }}>
      {children}
    </ToastContext.Provider>
  );
};
