import Toast from './Toast';

type Props = {
    toasts: Array<{
        id: number;
        type: 'success' | 'error';
        message: string;
    }>; 
}

const ToastsContainer = ({ toasts }: Props) => (
  <div className="z-10 w-full md:w-2/3 lg:w-1/3 m-auto fixed bottom-6 md:right-1">
    {toasts.map((toast) => (
      <Toast key={toast.id} {...toast} />
    ))}
  </div>
);


export default ToastsContainer;