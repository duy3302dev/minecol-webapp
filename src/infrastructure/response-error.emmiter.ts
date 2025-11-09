import mitt from 'mitt';

const ResponseErrorEmitter = mitt();

export const emitResponseErrorMessageEvent = (payload?: Record<string, string> | null) => {
  ResponseErrorEmitter.emit('response-error-message', { data: payload });
};

export const addResponseErrorMessageListener = (callback: (data?: any) => void) => {
  // Add listener only if it hasn't been emitted yet
  ResponseErrorEmitter.on('response-error-message', callback);
};

export const removeResponseErrorMessageListener = (callback: (data?: any) => void) => {
  ResponseErrorEmitter.off('response-error-message', callback);
};
