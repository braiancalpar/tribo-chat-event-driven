export const isEnter = (callback) => (event) => event.code === 'Enter' && callback();
export const isEsc = (callback) => (event) => event.key === 'Escape' && callback();