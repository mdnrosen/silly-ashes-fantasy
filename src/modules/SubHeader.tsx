type Props = {
  title: string;
};

const SubHeader = ({ title }: Props) => {
  return (
    <div className="bg-dark-grey text-off-white p-4 shadow-md">
      <h2 className="text-xl font-bold uppercase text-center">{title}</h2>
    </div>
  );
};

export default SubHeader;
