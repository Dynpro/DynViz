import toast from 'react-hot-toast'

const toastConfig = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message)
}

export default toastConfig
