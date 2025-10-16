import { toast as hotToast, type ToastOptions } from 'react-hot-toast'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastConfig extends ToastOptions {
  position?: ToastOptions['position']
  duration?: number
}

export const useToast = () => {
  const defaultOptions: ToastConfig = {
    position: 'top-right',
    duration: 4000,
    style: {
      background: '#fff',
      color: '#333',
      padding: '16px 20px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      maxWidth: '400px'
    }
  }

  const showToast = (type: ToastType, message: string, options?: ToastConfig) => {
    const config = { ...defaultOptions, ...options }

    const typeStyles = {
      success: {
        style: {
          ...config.style,
          background: '#10b981',
          color: '#fff'
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#10b981'
        }
      },
      error: {
        style: {
          ...config.style,
          background: '#ef4444',
          color: '#fff'
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#ef4444'
        }
      },
      warning: {
        style: {
          ...config.style,
          background: '#f59e0b',
          color: '#fff'
        },
        icon: '⚠️'
      },
      info: {
        style: {
          ...config.style,
          background: '#3b82f6',
          color: '#fff'
        },
        icon: 'ℹ️'
      }
    }

    const typeConfig = typeStyles[type]

    switch (type) {
      case 'success':
        return hotToast.success(message, { ...config, ...typeConfig })
      case 'error':
        return hotToast.error(message, { ...config, ...typeConfig })
      case 'warning':
      case 'info':
        return hotToast(message, { ...config, ...typeConfig })
      default:
        return hotToast(message, config)
    }
  }

  // Shortcuts tiện dụng với options tùy chỉnh
  const toast = {
    success: (msg: string, options?: ToastConfig) => showToast('success', msg, options),
    error: (msg: string, options?: ToastConfig) => showToast('error', msg, options),
    warning: (msg: string, options?: ToastConfig) => showToast('warning', msg, options),
    info: (msg: string, options?: ToastConfig) => showToast('info', msg, options),

    // Toast với promise (loading state)
    promise: <T>(
      promise: Promise<T>,
      msgs: {
        loading: string
        success: string
        error: string
      }
    ) => {
      return hotToast.promise(
        promise,
        {
          loading: msgs.loading,
          success: msgs.success,
          error: msgs.error
        },
        {
          ...defaultOptions,
          style: {
            ...defaultOptions.style,
            minWidth: '250px'
          }
        }
      )
    }
  }

  return { toast }
}

// Component Toaster để đặt trong root của app
// import { Toaster } from 'react-hot-toast'
//
// <Toaster
//   position="top-right"
//   reverseOrder={false}
//   gutter={8}
//   toastOptions={{
//     duration: 4000,
//   }}
// />
