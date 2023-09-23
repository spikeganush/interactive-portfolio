import { useEditContext } from '@/context/edit-context';
import toast from 'react-hot-toast';
import { Key } from 'readline';

export function formatUsername(username: string) {
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
}

export function throwErrorAndToast(message: string) {
  toast.error(message);
  throw new Error(message);
}

export async function deleteFile(url: string | null): Promise<void> {
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
}
