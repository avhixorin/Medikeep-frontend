import React from "react";

interface Props {
  Name: string;
  timeSlots: string;
  imgSrc: string;
  selectedDate: Date | undefined;
}

const AppointmentCard: React.FC<Props> = ({
  Name,
  timeSlots,
  imgSrc,
  selectedDate,
}) => {
  return (
    <div
      className="w-full rounded-md shadow-sm text-black py-3 flex justify-around items-center font-poppins"
      style={{ border: "1px solid #E8E7E7" }}
    >
      <img src={imgSrc} alt="" className="w-10 h-10 rounded-full" />
      <p className="font-semibold text-center flex-1 max-w-[8rem] overflow-hidden text-ellipsis">
        {Name}
      </p>
      <p className="bg-[#b0b0f6] rounded-md py-2 px-4 text-sm text-white">
        {selectedDate?.toDateString()}
      </p>

      <p className="flex-1 max-w-[12rem] overflow-hidden text-ellipsis text-center">
        {timeSlots}
      </p>

      <button className="bg-[#b0b0f6] rounded-md py-2 px-4 text-sm text-white hover:bg-[#8d8df7]">
        Reschedule
      </button>
      <button className="bg-[#fe9696] hover:bg-[#fb5a5a] rounded-md py-2 px-4 text-sm text-white">
        Cancel
      </button>
    </div>
  );
};

export default AppointmentCard;
