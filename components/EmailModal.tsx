import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

interface Props {
  selectedEmail;
  toggleEmailModal: () => void;
}
const EmailModal: React.FC<Props> = ({ selectedEmail, toggleEmailModal }) => {
  const { data: session } = useSession();
  if (!session) {
    return null;
  }
  const getCurrentTimestamp = () => {
    return format(new Date(), "yyyy-MM-dd HH:mm:ss");
  };

  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [errors, setErrors] = useState({
    message: false,
  });

  const handleSubmitReply = async () => {
    try {
      if (!message.trim()) {
        setNotice("Please fill in all required fields.");
        return;
      }

      const timestamp = getCurrentTimestamp();
      const senderName = session?.user?.username; // Use session user's name
      const profilePicture = session?.user?.profilePicture; // Use session user's image
      const senderEmail = session?.user?.email;
      const recipientEmail = selectedEmail?.senderEmail;
      const subject = selectedEmail?.subject;

      console.log("Sender Name:", senderName);
      console.log("Sender Email:", senderEmail);
      console.log("Recipient Email:", recipientEmail);
      console.log("Subject:", subject);
      console.log("Message:", message);
      console.log("Timestamp:", timestamp);
      console.log("Profile Picture:", profilePicture);

      const fullFormData = {
        message,
        senderName,
        senderEmail,
        timeStamp: timestamp,
        recipientEmail,
        subject,
        adminPrivilege: true, // Set adminPrivilege to true for admin replies
        profilePicture, // Include profile picture
      };

      console.log("Full Form Data:", fullFormData);

      await fetch("/api/inquiries/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullFormData),
      });

      setNotice("Submitted Successfully");
      setMessage("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="bg-white px-4 py-4 lg:w-1/2 rounded-lg">
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
            <p className="font-bold">{selectedEmail?.senderName}</p>
            <p className="text-gray-500 text-xs">
              {selectedEmail?.senderEmail}
            </p>
            <p className="text-xs my-6">{selectedEmail?.timeStamp}</p>
            <p className="font-bold text-lg mb-2">{selectedEmail?.subject}</p>
            <p className="text-sm">{selectedEmail?.message}</p>
            <div className="flex items-center py-2 px-4 border rounded-lg w-full justify-between absolute bottom-0">
              <input
                placeholder="Type Message"
                className="text-sm focus:outline-none flex-1"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#2FBFDE"
                viewBox="0 0 24 24"
                className="cursor-pointer"
                onClick={handleSubmitReply}
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
