import Link from 'next/link';
import '../../styles/ui.css';

export function Button({ children, href, variant = 'primary', onClick }) {
  const className = `btn btn--${variant}`;

  if (href) {
    return <Link href={href} className={className}>{children}</Link>;
  }

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
