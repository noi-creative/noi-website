'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { assets } from '@/lib/assets';
import { site } from '@/config/site';
import common from '@/content/locales/es/common.json';
import { Button } from '@/components/ui/Button';
import styles from './Header.module.scss';

const NAV_ITEMS: ReadonlyArray<{ href: string; label: string }> = [
  { href: site.routes.nosotras, label: common.navigation.nosotras },
  { href: site.routes.portafolio, label: common.navigation.portafolio },
  /*{ href: site.routes.servicios, label: common.navigation.servicios }, */
  { href: site.routes.contacto, label: common.navigation.contacto },
];

/**
 * Sticky pill header. Renders the same composition on every public page
 * (the C03 audit confirmed the header is identical across Home, Nosotras
 * and Contacto, with a self-contained cream pill that lifts off any
 * background).
 *
 * On viewports below the `desktop` breakpoint, the nav and CTA are
 * collapsed behind a hamburger. The dropdown:
 *   - opens/closes on hamburger click
 *   - closes on link click (navigation)
 *   - closes on Escape
 *   - is keyboard accessible (aria-expanded, aria-controls, focus moves
 *     into the menu on open, focus returns to the button on close)
 */
export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close the menu on Escape; return focus to the hamburger.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  // Focus the first menu item when the menu opens.
  useEffect(() => {
    if (!isOpen) return;
    const firstLink = menuRef.current?.querySelector<HTMLElement>('a, button');
    firstLink?.focus();
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const isActive = (href: string) =>
    href === site.routes.home ? pathname === href : pathname.startsWith(href);

  return (
    <header className={styles.header}>
      <div className={styles.pill}>
        <Link href={site.routes.home} className={styles.logo} aria-label={common.brand.shortTitle}>
          <Image
            src={assets.shared.logo.noiAzul.src}
            alt={assets.shared.logo.noiAzul.alt ?? 'NOI'}
            width={64}
            height={32}
            priority
          />
        </Link>

        <nav className={styles.desktopNav} aria-label="Principal">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[styles.navLink, isActive(item.href) ? styles.navLinkActive : '']
                    .filter(Boolean)
                    .join(' ')}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.cta}>
          <Button href={site.routes.contacto} variant="primary-burgundy" withArrow size="md">
            {common.cta.hablemos}
          </Button>
        </div>

        <button
          ref={buttonRef}
          type="button"
          className={styles.toggle}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className={styles.toggleBars} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        ref={menuRef}
        id={menuId}
        className={[styles.dropdown, isOpen ? styles.dropdownOpen : ''].filter(Boolean).join(' ')}
        hidden={!isOpen}
      >
        <ul className={styles.dropdownList}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={closeMenu}
                className={[
                  styles.dropdownLink,
                  isActive(item.href) ? styles.dropdownLinkActive : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-current={isActive(item.href) ? 'page' : undefined}
                tabIndex={isOpen ? 0 : -1}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.dropdownCta}>
          <Button
            href={site.routes.contacto}
            variant="primary-burgundy"
            withArrow
            size="md"
            tabIndex={isOpen ? 0 : -1}
          >
            {common.cta.hablemos}
          </Button>
        </div>
      </div>
    </header>
  );
}
