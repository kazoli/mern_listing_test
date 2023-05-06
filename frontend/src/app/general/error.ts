import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

// Error handler function for axios errors
export const errorHandler = (err: unknown): string => {
  const error = err as Error | AxiosError;
  let message = '';
  if (axios.isAxiosError(error)) {
    // axios error
    if (error.response) {
      // customizable messages according to response status of error
      switch (error.response.status) {
        case 500:
          console.error(error.response.data.message);
          message = 'Internal Server Error';
          break;
        default:
          message = error.response.data.message;
      }
    } else {
      message = error.message;
    }
  } else {
    // stock error
    message = error.message || error.toString();
  }
  toast.error(message);
  return message;
};
