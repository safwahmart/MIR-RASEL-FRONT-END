import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
const useConfirmationDialog = (title, text, confirmButtonText) => {
    const router = useRouter();
    const ConfirmAction = async () => {
        const language = router.locale
        const result = await Swal.fire({
            title,
            text,
            showCancelButton: true,
            confirmButtonColor: '#9A65D1',
            cancelButtonColor: '#d33',
            cancelButtonText: language === 'en'?"Cancel":"বাতিল করুন",
            confirmButtonText,
        });
        return result.isConfirmed;
    }
    return ConfirmAction;
}
export default useConfirmationDialog;