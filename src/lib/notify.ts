import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = () => {
    const showNotif = (status: string, message: string) => {
        if(status === "success") {
            toast.success(`${message}`, {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                closeButton: false,
                style: {
                    backgroundColor: '#263E52',
                    color: '#ffffff',
                },
                progressStyle: {
                    backgroundColor: '#22c55e',
                },
            });
        } else if(status === "error") {
            toast.error(`${message}`, {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                closeButton: false,
                style: {
                    backgroundColor: '#263E52',
                    color: '#ffffff',
                },
                progressStyle: {
                    backgroundColor: '#ef4444',
                },
            });
        }
    }

    return { showNotif, ToastContainer }
};

export default notify;