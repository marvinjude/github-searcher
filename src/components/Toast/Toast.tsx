import { createContext, useContext } from "react";
import { ToastContextType } from "./typings";

export const ToastContext = createContext<ToastContextType>({ messages: [] });
export const useToastContext = () => useContext(ToastContext);
