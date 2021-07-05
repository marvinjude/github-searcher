import React, { useState, useRef } from "react";
import styled from "styled-components";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { motion, AnimatePresence } from "framer-motion";

interface SelectWrapperProps {
  opened: boolean;
}

const SelectWrapper = styled.div<SelectWrapperProps>`
  width: 10rem;
  display: flex;
  position: relative;
  align-items: center;
 

  .input {
    ${(props) => props.theme.focusStyle}
    padding: 1rem;
    border-radius: 5px;
    height: 40px;
    border:  ${({ theme }) => `1px solid ${theme.borderColor}`};
    color: ${(props) => props.theme.foregroundColor};
    width: 100%;
    line-height: 50%;
    white-space: nowrap;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items:center;

    ::placeholder {
      color: #787c8e;
    }
  }

  .select__popup {
    position: absolute;
    width: 100%;
    padding: 0.4rem;
    top: 110%;
    background-color: ${(props) => props.theme.backgroundColor};
    border-radius: 5px;
    border:  ${({ theme }) => `1px solid ${theme.borderColor}`};
    font-size: 14px;
    z-index: 30;
    min-height: 100px;
    max-height: 200px;
    overflow: auto;
  }

  .select__item {
    color: ${(props) => props.theme.foregroundColor};
    padding: 0.5rem;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background-color:${({ theme }) => theme.borderColor};
    }
  }
`;
interface SelectProps {
  items: [...any];
  onChange: (x: any) => void;
  placeholder?: any;
}

function Select({ items, onChange, placeholder, ...delegated }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const ref = useRef();

  useOnClickOutside(ref, () => setOpen(false));

  const onSelect = (item: any) => {
    setValue(item);
    setOpen(false);
    onChange(item);
  };

  return (
    <SelectWrapper {...delegated} opened={open} ref={ref as any}>
      <div className="input" onClick={() => setOpen((o) => !o)}>
        {value || placeholder}
        <svg
          focusable='false'
          width="6"
          height="4"
          tabIndex={-1}
          viewBox="0 0 6 4"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <path
              id="a"
              tabIndex={-1}
              d="M132.047 389.564l.644-.537a.134.134 0 0 1 .091-.028.124.124 0 0 1 .085.042l2.134 2.438 2.133-2.438a.124.124 0 0 1 .085-.042.137.137 0 0 1 .091.028l.645.537c.025.021.04.05.043.083a.115.115 0 0 1-.03.088l-2.872 3.223a.127.127 0 0 1-.19 0l-2.873-3.223a.116.116 0 0 1-.03-.088.12.12 0 0 1 .044-.083z"
            />
          </defs>
          <use
            opacity=".7"
            fill="currentColor"
            xlinkHref="#a"
            tabIndex={-1}
            transform="translate(-132 -389)"
          />
        </svg>
      </div>



      <AnimatePresence>
        {open && (
          <motion.div
            className="select__popup"
            transition={{ type: "tween" }}
            initial={{ opacity: 0, y: -20, scaleY: 0.7 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -20, scaleY: 0.7 }}
          >
            {items.map((item: any) => (
              <div key={item} onClick={() => onSelect(item)} className="select__item">
                {item}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </SelectWrapper>
  );
}

export default Select;
