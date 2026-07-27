'use client';

import { useSyncExternalStore } from 'react';

function getWidth() {
  if (typeof window === 'undefined') return null;
  return window.innerWidth;
}

function subscribe(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

export function useScreenWidth() {
  return useSyncExternalStore(subscribe, getWidth, () => null);
}
