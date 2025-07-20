import Link from 'next/link';
import { ReactNode } from 'react';

type CustomLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function CustomLink({ href, children, className = '', ...props }: CustomLinkProps) {
  return (
    <Link 
      href={href}
      {...props}
      className={`inline-block px-4 py-2 rounded hover:opacity-90 transition-opacity ${className}`}
    >
      {children}
    </Link>
  );
}
