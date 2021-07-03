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
  gap: 0.5rem;

  .input {
    ${(props) => props.theme.focusStyle}
    padding: 1rem;
    border-radius: 5px;
    height: 40px;
    background-color: #191b20;
    border: solid 1px #24262e;
    min-width: 220px;
    color: white;
    width: 100%;
    line-height: 50%;
    color: #787c8e;
    white-space: nowrap;

    ::placeholder {
      color: #787c8e;
    }
  }

  .select__popup {
    position: absolute;
    width: 100%;
    padding: 0.4rem;
    top: 110%;
    background-color: #191b20;
    border-radius: 5px;
    border: solid 1px #24262e;
    font-size: 14px;
    z-index: 30;
    min-height: 100px;
    max-height: 200px;
    overflow: auto;
  }

  .select__item {
    color: white;
    padding: 0.5rem;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background-color: #14161a;
    }
  }
`;
interface SelectProps {
  items: [any];
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
              <div onClick={() => onSelect(item)} className="select__item">
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
