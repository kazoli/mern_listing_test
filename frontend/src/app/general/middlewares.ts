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

// Scroll to an element
export const scrollToElement = (
  element: Element | (Window & typeof globalThis) = window,
  behavior: 'auto' | 'smooth' = 'auto',
) => {
  element.scrollTo({
    top: 0,
    left: 0,
    behavior: behavior,
  });
};
