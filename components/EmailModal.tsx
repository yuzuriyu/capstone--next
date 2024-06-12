import React from "react";
import Image from "next/image";

interface Props {
  selectedEmail;
  toggleEmailModal: () => void;
}
const EmailModal: React.FC<Props> = ({ selectedEmail, toggleEmailModal }) => {
  return (
    <div className="bg-white px-4 py-8 lg:w-1/2 rounded-lg">
      {selectedEmail && (
        <div className="flex">
          <div>
            <Image
              src={selectedEmail?.profilePicture}
              alt=""
              width={40}
              height={40}
              className="rounded-full mr-2"
            />
          </div>
          <div className="flex-1 flex flex-col relative h-[550px]">
            <p className="font-bold">{selectedEmail?.name}</p>
            <p className="text-gray-500 text-xs">{selectedEmail?.email}</p>
            <p className="text-xs my-6">{selectedEmail?.timeStamp}</p>
            <p className="font-bold text-lg mb-2">{selectedEmail?.subject}</p>
            <p className="text-sm">{selectedEmail?.message}</p>
            <div className="flex items-center py-2 px-4 border rounded-lg w-full justify-between absolute bottom-0">
              <input
                placeholder="Type Message"
                className="text-sm focus:outline-none flex-1"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#2FBFDE"
                viewBox="0 0 24 24"
                className="cursor-pointer"
              >
                <path d="m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81z"></path>
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailModal;
