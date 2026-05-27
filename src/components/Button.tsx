"use client";

import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "dark";

interface ButtonBaseProps {
  variant?: Variant;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<Variant, string> = {
  primary:
    "gradient-accent text-white border border-transparent hover:brightness-110",
  secondary:
    "glass text-on-surface hover:bg-surface-elevated/80 dark:hover:bg-surface-elevated/10 ",
  dark: "bg-inverse-surface text-inverse-on-surface hover:bg-on-surface-variant border border-transparent",
};

export default function Button({
  variant = "primary",
  icon,
  children,
  ...props
}: ButtonProps) {
  const classes = `
 inline-flex items-center justify-center gap-2.5
 px-6 py-3.5 rounded-xl font-semibold text-sm min-h-[44px] min-w-[44px]
 transition-all duration-300 ease-out
 active:scale-95 cursor-pointer
 group
 ${variantStyles[variant]}
 `.trim();

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
        {icon}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
      {icon}
    </button>
  );
}
