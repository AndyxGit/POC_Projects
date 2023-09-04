export const subscribe = (eventName, listener) => {
  window.document.addEventListener(eventName, listener);
};

export const unsubscribe = (eventName, listener) => {
  window.document.removeEventListener(eventName, listener);
};

export const publish = (eventName, data) => {
  const event = new CustomEvent(eventName, { detail: data });
  window.document.dispatchEvent(event);
};
