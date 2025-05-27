import { toast } from "react-toastify";

// Common configuration for all toasts
const commonConfig = {
  position: "top-right" as const,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light" as const,
};

// Success toast configuration
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    ...commonConfig,
    autoClose: 2000,
  });
};

// Error toast configuration
export const showErrorToast = (message: string) => {
  toast.error(message, {
    ...commonConfig,
    autoClose: 3000,
  });
};

// Info toast configuration (optional)
export const showInfoToast = (message: string) => {
  toast.info(message, {
    ...commonConfig,
    autoClose: 3000,
  });
};

// Warning toast configuration (optional)
export const showWarningToast = (message: string) => {
  toast.warning(message, {
    ...commonConfig,
    autoClose: 4000,
  });
};
