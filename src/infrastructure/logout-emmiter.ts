import mitt from 'mitt';

const logoutEmitter = mitt();
let hasEmittedLogout = false;
let resetTimeout: NodeJS.Timeout | null = null;

export const emitLogoutEvent = () => {
  if (!hasEmittedLogout) {
    hasEmittedLogout = true;
    logoutEmitter.emit('logout');

    // Set up a timeout to reset `hasEmittedLogout` after 2 seconds
    resetTimeout = setTimeout(() => {
      hasEmittedLogout = false;
      resetTimeout = null;
    }, 2000);
  }
};

export const addLogoutListener = (callback: () => void) => {
  // Add listener only if it hasn't been emitted yet
  if (!hasEmittedLogout) {
    logoutEmitter.on('logout', callback);
  }
};

export const removeLogoutListener = (callback: () => void) => {
  logoutEmitter.off('logout', callback);
};

// Optional: If another event happens before the timeout, clear and restart the timer
export const resetLogoutTimer = () => {
  if (resetTimeout) {
    clearTimeout(resetTimeout);
    resetTimeout = setTimeout(() => {
      hasEmittedLogout = false;
      resetTimeout = null;
    }, 2000);
  }
};
