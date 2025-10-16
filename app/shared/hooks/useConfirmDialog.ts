// useConfirmDialog.ts
import Swal from 'sweetalert2'

export const useConfirmDialog = () => {
  const confirm = async (message: string): Promise<boolean> => {
    const result = await Swal.fire({
      title: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    })
    return result.isConfirmed
  }

  return { confirm }
}
