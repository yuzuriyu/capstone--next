import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

interface EmailData {
  senderName: string;
  senderEmail: string;
  profilePicture?: string;
  timeStamp: string;
  subject: string;
  message: string;
}

interface Props {
  selectedEmail: EmailData | null;
  toggleEmailModal: () => void;
}

const EmailModal: React.FC<Props> = ({ selectedEmail, toggleEmailModal }) => {
  const { data: session } = useSession();

  // Hooks are called unconditionally at the top
  const [message, setMessage] = useState<string>("");
  const [notice, setNotice] = useState<string>("");
  const [errors, setErrors] = useState<{ message: boolean }>({
    message: false,
  });

  const getCurrentTimestamp = () => format(new Date(), "yyyy-MM-dd HH:mm:ss");

  const handleSubmitReply = async () => {
    if (!message.trim()) {
      setNotice("Please fill in all required fields.");
      return;
    }

    try {
      const timestamp = getCurrentTimestamp();
      const senderName = session?.user?.name || ""; // Corrected property from `username` to `name`
      const profilePicture = session?.user?.image || ""; // Corrected property from `profilePicture` to `image`
      const senderEmail = session?.user?.email || "";
      const recipientEmail = selectedEmail?.senderEmail || "";
      const subject = selectedEmail?.subject || "";

      const fullFormData = {
        message,
        senderName,
        senderEmail,
        timeStamp: timestamp,
        recipientEmail,
        subject,
        adminPrivilege: true,
        profilePicture,
      };

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
      setNotice("Error submitting form.");
    }
  };

  // Render null if session doesn't exist
  if (!session) {
    return null;
  }

  return (
    <div
      className="w-full h-full fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center"
      onClick={toggleEmailModal}
    >
      <div
        className="bg-white px-4 py-4 lg:w-1/2 rounded-lg w-11/12 relative"
        onClick={(e) => e.stopPropagation()} // Prevent event propagation to the outer container
      >
        {selectedEmail && (
          <div className="flex">
            <div>
              <Image
                src={
                  selectedEmail.profilePicture || "/images/profile--default.jpg"
                }
                alt="Profile Picture"
                width={40}
                height={40}
                className="rounded-full mr-2"
              />
            </div>
            <div className="flex-1 flex flex-col relative h-[550px]">
              <p className="font-bold">{selectedEmail.senderName}</p>
              <p className="text-gray-500 text-xs">
                {selectedEmail.senderEmail}
              </p>
              <p className="text-xs my-6">{selectedEmail.timeStamp}</p>
              <p className="font-bold text-lg mb-2">{selectedEmail.subject}</p>
              <p className="text-sm">{selectedEmail.message}</p>
              {session?.user?.role === "admin" &&
                selectedEmail.senderEmail !== session.user.email && (
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
                )}
            </div>
          </div>
        )}
        {notice && <p className="text-xs text-red-400">{notice}</p>}
      </div>
    </div>
  );
};

export default EmailModal;
