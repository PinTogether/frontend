"use client";

import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  RefAttributes,
  useRef,
  useState,
  forwardRef,
} from "react";
import styles from "@/styles/components/_inputComponent.module.scss";

export { InputComponent, TextareaComponent };

// Input
interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    RefAttributes<HTMLInputElement> {
  className?: string;
}
const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...restProps }: InputProps, ref) => {
    const [textLength, setTextLength] = useState(0);

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTextLength(event.target.value.length);
      if (restProps.onChange) {
        restProps.onChange(event);
      }
    };

    if (!restProps.maxLength) {
      return (
        <input
          ref={ref}
          className={`${styles.input} ${className}`}
          {...restProps}
          onChange={handleTextChange}
        />
      );
    }
    return (
      <div className={`${styles.inputContainer} ${className}`}>
        <input
          ref={ref}
          className={styles.input}
          {...restProps}
          onChange={handleTextChange}
        />
        <p className={styles.lengthCounter}>
          {`${textLength}/${restProps.maxLength}`}
        </p>
      </div>
    );
  }
);
InputComponent.displayName = "InputComponent";

// Textarea
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  rows?: number;
}
const TextareaComponent = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...restProps }: TextareaProps, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [textLength, setTextLength] = useState(0);

    const handleTextChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setTextLength(event.target.value.length);
      if (restProps.onChange) {
        restProps.onChange(event);
      }
    };

    if (!restProps.maxLength) {
      return (
        <textarea
          ref={ref ? ref : textareaRef}
          className={`${styles.textarea} ${className}`}
          {...restProps}
          onChange={handleTextChange}
        />
      );
    }
    return (
      <div className={`${styles.textareaContainer} ${className}`}>
        <textarea
          ref={ref ? ref : textareaRef}
          className={styles.textarea}
          {...restProps}
          onChange={handleTextChange}
        />
        <p className={styles.lengthCounter}>
          {`${textLength}/${restProps.maxLength}`}
        </p>
      </div>
    );
  }
);
TextareaComponent.displayName = "TextareaComponent";
