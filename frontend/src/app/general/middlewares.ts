import { tObject } from './types';
import jsCookie from 'js-cookie';

// Cookie maganager
export const cookieManager = {
  get: (name: string) => {
    return jsCookie.get(name);
  },
  set: (name: string, value: string, days: number) => {
    jsCookie.set(name, value, { expires: days });
  },
  delete: (name: string) => {
    jsCookie.remove(name);
  },
};

// Build URL
export const buildUrl = <t extends tObject>(queryParts: t) => {
  //query elements array
  let query: string[] = [];
  // build query based on queryParts
  for (const key in queryParts) {
    if (queryParts[key].length && queryParts[key] !== 'default') {
      query = [...query, `${key}=${queryParts[key]}`];
    }
  }
  // join the query elments into a string or get empty
  const queryString = query.length ? encodeURI('?' + query.join('&')) : '';
  // change old URL with the new one in the browser
  window.history.pushState({}, '', window.location.origin + window.location.pathname + queryString);
};

// Scroll to an element
export const scrollToElement = (
  behavior: 'auto' | 'smooth' = 'auto',
  element: Element | (Window & typeof globalThis) = window,
) => {
  element.scrollTo({
    top: 0,
    left: 0,
    behavior: behavior,
  });
};

// Format a date
export const formatDate = (date: string, locale: string = 'en-gb') => {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};
