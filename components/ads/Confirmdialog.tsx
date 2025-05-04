// components/ConfirmDialog.tsx
interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmDialog = ({ open, onClose, onConfirm }: ConfirmDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-80">
        <p className="text-lg font-semibold mb-4">정말 진행하시겠습니까?</p>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={onClose}>
            취소
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
