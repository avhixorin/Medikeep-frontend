
const Pulse= ({size}: {size: string}) => {

  return (
    <div className="flex items-center justify-center">
      <span className={`relative flex h-${size} w-${size}`}>
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
        <span className={`relative inline-flex rounded-full h-${size} w-${size} bg-green-500`}></span>
      </span>
    </div>
  );
};

export default Pulse;
