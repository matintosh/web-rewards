'use client';
import { EmbeeLogo } from '@/shared/components/embee-logo';
import Link from 'next/link';
import { useState } from 'react';
import styles from './embee-link.module.css';

export function EmbeeLink() {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link
      href="https://links.embeejayz.com"
      target="_blank"
      className={styles['embee-link']}
      aria-label="Embeejayz's social networks"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={`${styles['icon-container']} ${isHover && styles['icon-container-hover']}`}
      >
        <EmbeeLogo size={50} />
      </div>
      Embeejayz
    </Link>
  );
}
