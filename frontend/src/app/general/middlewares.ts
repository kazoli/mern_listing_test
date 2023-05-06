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
