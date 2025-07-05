import { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size: string;
  children: ReactNode;
}
const ModalUI: React.FC<ModalProps> = ({ isOpen, onClose, size, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/20 flex items-center justify-center z-50">
      <div
        className={`relative rounded-lg border-2 border-red-500 bg-white/95 shadow-lg overflow-scroll ${size}`}
      >
        <button onClick={onClose} className="absolute top-4 right-4">
          <XMarkIcon className="size-4 text-slate-600 hover:text-red-500 hover:scale-125 transition duration-150" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalUI;
