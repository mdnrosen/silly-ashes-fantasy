type Props = {
  successCallback?: () => void;
  cancelCallback: () => void;
  title: string;
  message: string;
  successText?: string;
  cancelText?: string;
};

const ConfirmModal = ({
  title,
  message,
  successText,
  cancelText,
  cancelCallback,
  successCallback,
}: Props) => {
  return (
    <div className="z-20 fixed inset-0 bg-dark-blue opacity-95 flex items-center justify-center animate-fade-in">
      <div className="mx-4 p-4 rounded-lg bg-off-white w-full flex-col">
        <header className="p-2 font-light uppercase border-b-2">{title}</header>
        <main className="p-2 font-extralight">{message}</main>
        <footer className="p-2 flex justify-between">
          <button
            onClick={cancelCallback}
            className="bg-red-500 p-2 rounded-md text-off-white"
          >
            {cancelText || "Cancel"}
          </button>
          <button
            onClick={successCallback}
            className="bg-aus-green p-2 rounded-md text-off-white"
          >
            {successText || "Confirm"}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ConfirmModal;
