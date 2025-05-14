'use client';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const showSuccessToast = (message: string) => {
  MySwal.fire({
    toast: true,
    position: 'bottom-end',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: '#ffffff',
    color: '#333',
  });
};

export const showErrorToast = (message: string) => {
  MySwal.fire({
    toast: true,
    position: 'bottom-end',
    icon: 'error',
    title: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: '#ffffff',
    color: '#333',
  });
};

export const showWarningToast = (message: string) => {
  MySwal.fire({
    toast: true,
    position: 'bottom-end',
    icon: 'warning',
    title: message,
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    background: '#ffffff',
    color: '#333',
  });
};


export const showConfirmationDialog = async (
  title = 'Are you sure?',
  text = 'This action cannot be undone.'
): Promise<boolean> => {
  const result = await MySwal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    background: '#ffffff',
    color: '#333',
  });

  return result.isConfirmed;
};
