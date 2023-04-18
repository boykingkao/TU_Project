import { toast } from 'react-toastify';

function ToastEmitter(text) {
    toast(`🦄 ${text}! `, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })
}

export default ToastEmitter