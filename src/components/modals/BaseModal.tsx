import { useRef, useEffect } from "react";

const BaseModal = ({
  children,
  handleClose = undefined,
  bgClassName = undefined,
  contentClassName = undefined,
  closeOnSubmitOnly = false,
}) => {
  const contentRef = useRef<HTMLDivElement>();

  const handleClickOutside = (e: MouseEvent) => {
    if (closeOnSubmitOnly || !handleClose) return;

    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (!handleClose) return;

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={contentRef}
      className={`fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center ${bgClassName}`}
    >
      {!closeOnSubmitOnly && (
        <button className="absolute top-0 right-3 p-2 " onClick={handleClose}>
          X
        </button>
      )}
      <div
        className={`bg-gradient-to-tr from-cyan-400 to-sky-500 rounded-xl min-w-[30%] min-h-[30%] max-w-[60%] max-h-[80%] flex items-center justify-center z-50 ${contentClassName}`}
      >
        {children}
      </div>
    </div>
  );
};

export default BaseModal;
