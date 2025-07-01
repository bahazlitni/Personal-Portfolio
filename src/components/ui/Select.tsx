import { useState, useEffect, useRef } from 'react';
import styles from './Select.module.css';

interface SelectOption {
   value: string;
   label: string;
}

interface SelectProps {
   options: SelectOption[];
   value: string;
   onChange: (value: string) => void;
   placeholder?: string;
   required?: boolean;
   className?: string;
   triggerClassName?: string;
   dropdownClassName?: string;
}

const Select = ({
   options,
   value,
   onChange,
   placeholder = 'Select an option',
   required = false,
   className = '',
   triggerClassName = '',
   dropdownClassName = '',
}: SelectProps) => {
   const [isOpen, setIsOpen] = useState(false);
   const [highlightedIndex, setHighlightedIndex] = useState(0);
   const selectRef = useRef<HTMLDivElement>(null);

   const selectedOption = options.find(option => option.value === value);

   const handleSelect = (value: string) => {
      onChange(value);
      setIsOpen(false);
   };

   useEffect(() => {
      if (isOpen) setHighlightedIndex(0);
   }, [isOpen]);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setIsOpen(false);
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isOpen) {
         if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(true);
            e.preventDefault();
         }
         return;
      }

      switch (e.key) {
         case 'Escape':
            setIsOpen(false);
            break;
         case 'ArrowDown':
            e.preventDefault();
            setHighlightedIndex(prev => Math.min(prev + 1, options.length - 1));
            break;
         case 'ArrowUp':
            e.preventDefault();
            setHighlightedIndex(prev => Math.max(prev - 1, 0));
            break;
         case 'Enter':
         case ' ':
            e.preventDefault();
            handleSelect(options[highlightedIndex].value);
            break;
      }
   };

   return (
      <div
         ref={selectRef}
         className={`${styles.selectContainer} ${className}`}
         onKeyDown={handleKeyDown}
         tabIndex={0}
      >
         <div
            className={`${styles.selectTrigger} ${isOpen ? styles.open : ''} ${triggerClassName}`}
            onClick={() => setIsOpen(prev => !prev)}
         >
            <div className={`${styles.selectedValue} ${!selectedOption ? styles.placeholder : ''}`}>
               {selectedOption ? selectedOption.label : placeholder}
            </div>
            <div className={styles.selectArrow}>
               <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                     d="M7 10l5 5 5-5z"
                     fill="currentColor"
                  />
               </svg>
            </div>
         </div>

         {isOpen && (
            <div className={`${styles.selectDropdown} ${dropdownClassName}`}>
               <ul className={styles.optionsList}>
                  {options.map((option, index) => (
                     <li
                        key={option.value}
                        className={`${styles.optionItem} ${
                           option.value === value ? styles.selected : ''
                        } ${
                           index === highlightedIndex ? styles.highlighted : ''
                        }`}
                        onClick={() => handleSelect(option.value)}
                        onMouseEnter={() => setHighlightedIndex(index)}
                     >
                        {option.label}
                     </li>
                  ))}
               </ul>
            </div>
         )}

         {required && (
            <input
               type="text"
               value={value}
               onChange={() => {}}
               className={styles.hiddenInput}
               required
               tabIndex={-1}
            />
         )}
      </div>
   );
};

export default Select;