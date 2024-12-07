const Card = ({ title }: { title: string }) => {
  return (
    <div className="w-full bg-run-50 h-[200px] rounded-lg flex items-center justify-center border-2 border-neutral shadow-[1px_1px_0px_2px_black] rounded-lg hover:shadow-[3px_3px_0px_2px_black]">
      {title}
    </div>
  );
};

export default Card;
