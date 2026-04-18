'use client';

import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'dark';

interface ButtonBaseProps {
  variant?: Variant;
  icon?: string;
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
    'gradient-primary text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:brightness-110',
  secondary:
    'glass text-on-surface hover:bg-white/80 dark:hover:bg-white/10 shadow-md',
  dark:
    'bg-inverse-surface text-inverse-on-surface hover:bg-on-surface-variant shadow-xl hover:shadow-2xl',
};

export default function Button({ variant = 'primary', icon, children, ...props }: ButtonProps) {
  const classes = `
    inline-flex items-center justify-center gap-2.5
    px-8 py-4 rounded-full font-semibold text-sm
    transition-all duration-300 ease-out
    active:scale-95 cursor-pointer
    group
    ${variantStyles[variant]}
  `.trim();

  if ('href' in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
        {icon && (
          <span className="material-symbols-outlined text-lg group-hover:translate-x-0.5 transition-transform duration-300">
            {icon}
          </span>
        )}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
      {icon && (
        <span className="material-symbols-outlined text-lg group-hover:translate-x-0.5 transition-transform duration-300">
          {icon}
        </span>
      )}
    </button>
  );
}
