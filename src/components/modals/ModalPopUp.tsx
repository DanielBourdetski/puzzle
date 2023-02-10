import { useRef, useEffect } from "react";
import BaseModal from "./BaseModal";

const ModalPopUp = ({
  children,
  handleClose,
  bgClassName = undefined,
  contentClassName = undefined,
  closeOnSubmitOnly = false,
}) => {
  const contentRef = useRef<HTMLDivElement>();

  const handleClickOutside = (e: MouseEvent) => {
    if (closeOnSubmitOnly) return;

    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 h-full w-full bg-black bg-opacity-75 flex justify-center items-center">
      <BaseModal
        handleClose={handleClose}
        contentClassName={contentClassName}
        bgClassName={bgClassName}
      >
        {children}
      </BaseModal>
    </div>
  );
};

export default ModalPopUp;
