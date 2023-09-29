import toast from 'react-hot-toast';

export const validateString = (
  value: unknown,
  maxLength: number
): value is string => {
  if (!value || typeof value !== 'string' || value.length > maxLength) {
    return false;
  }

  return true;
};

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message);
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = 'Something went wrong';
  }

  return message;
};

export const formatUsername = (username: string) => {
  // Remove all characters that are not alphanumeric, underscore or dot
  let formatted = username.replace(/[^a-zA-Z0-9._]/g, '');

  // Remove leading and trailing underscores and dots
  formatted = formatted.replace(/^[_.]|[_.]$/g, '');

  // Replace multiple consecutive underscores or dots with a single one
  formatted = formatted.replace(/[_.]{2,}/g, '_');

  // Truncate or pad to fit the length requirement
  if (formatted.length > 20) {
    formatted = formatted.substring(0, 20);
  } else if (formatted.length < 8) {
    formatted = formatted.padEnd(8, '1');
  }

  return formatted;
};

export const throwErrorAndToast = (message: string) => {
  toast.error(message);
  throw new Error(message);
};

export const deleteFile = async (url: string | null): Promise<void> => {
  try {
    if (!url) return;
    const deletePreviousFile = await fetch(`/api/upload/`, {
      method: 'DELETE',
      body: JSON.stringify({ url }),
    });
    await deletePreviousFile;
  } catch (error) {
    console.log('deletePreviousFile error: ', error);
    throw new Error(error as string);
  }
};

let timeout: NodeJS.Timeout;

export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  delay: number
): ((...args: Parameters<F>) => void) => {
  return (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export const getId = (): string => {
  const timestamp = Date.now(); // Get current time in milliseconds since 1970
  const randomNum = Math.floor(Math.random() * 100000); // Generate a random number between 0 and 99999
  const uniqueId = `${timestamp}${randomNum}`; // Concatenate the two numbers
  return uniqueId;
};
