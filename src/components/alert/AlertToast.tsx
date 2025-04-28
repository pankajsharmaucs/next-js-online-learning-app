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
    timer: 3000,
    timerProgressBar: true,
    background: '#ffffff',
    color: '#333',
  });
};
