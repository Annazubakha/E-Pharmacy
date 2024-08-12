import ReactDOM from "react-dom";
import { Icon } from "../index";
import { ReactNode, useEffect } from "react";

interface ModalProps {
  children: ReactNode;
  toggleModal: () => void;
}

const modalRoot =
  document.getElementById("modalRoot") || document.createElement("div");

modalRoot.id = "modalRoot";
document.body.appendChild(modalRoot);

export const Modal: React.FC<ModalProps> = ({ children, toggleModal }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        toggleModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [toggleModal]);

  const handleClickOnBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return ReactDOM.createPortal(
    <div
      onClick={handleClickOnBackdrop}
      className="z-[1501] bg-burger-menu-bg flex justify-center items-center fixed w-[100vw] h-[100vh] left-0 top-0"
    >
      <div className="relative bg-my-white rounded-[30px]">
        <button
          className="absolute top-[20px] right-[20px]"
          type="button"
          onClick={toggleModal}
        >
          <Icon id="close-modal" size={24} />
        </button>
        <div className="flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </div>,
    modalRoot
  );
};
