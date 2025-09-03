import { AiFillCheckCircle, AiOutlineClose, AiFillExclamationCircle  } from "react-icons/ai"
import { useEffect } from "react";
import { useToast } from "../hooks/useToast";

// import { Toast } from "../types";
const toastTypes = {
  success: {
    type: "Success",
    color: "green",
    icon: <AiFillCheckCircle color="green" size="24" />
  },
  error: {
    type: "Error",
    color: "red",
    icon: <AiFillExclamationCircle color="#D32F2F" size="24" />
  },
}

type Props = {
    type: 'success' | 'error';
    message: string;
    id: number;
}

const Toast = ({ type, message, id }: Props) => {
  const { icon, color } = toastTypes[type];
  const toast = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      toast?.remove(id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [id, toast]);
  
  const handleClose = () => toast?.remove(id);
  
  return (
    <div className={`animate-slideInRight w-4/5 my-2 mx-auto p-4 shadow-md rounded-md bg-white border-4 border-${color} flex justify-between items-center`}>
      <div className="flex items-center">
          <div className="p-2">{icon}</div>
        <div className="p-2 font-thin text-lg">{message}</div>
        </div>
      <button className="" onClick={handleClose}>
        <AiOutlineClose
          color="black"
      />
      </button>
    </div>
  )
}

export default Toast;