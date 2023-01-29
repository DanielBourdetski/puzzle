import { useRef, useEffect } from "react";

const Modal = ({
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
    <div
      className={
        "fixed top-0 left-0 h-full w-full bg-black bg-opacity-75 flex justify-center items-center " +
        bgClassName
      }
    >
      <div
        ref={contentRef}
        className="relative mx-auto bg-white w-1/2 h-1/3 rounded-lg flex justify-center items-center"
      >
        {!closeOnSubmitOnly && (
          <button
            className={"absolute top-0 right-3 p-2 " + contentClassName}
            onClick={handleClose}
          >
            X
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
