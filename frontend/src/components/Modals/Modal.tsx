import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

import { XMarkIcon } from "@heroicons/react/20/solid";

type ModalProps = {
  show: boolean;
  title?: string;
  onCloseButtonClick: () => void;
  children?: ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  show,
  onCloseButtonClick,
  title = "",
  children,
}) => {
  const modalRoot = document.getElementById("modal-root");

  if (!show || !modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-96">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onCloseButtonClick}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
