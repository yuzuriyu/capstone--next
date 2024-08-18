"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface User {
  username?: string;
  email?: string;
  bio?: string;
  profilePicture?: string;
  coverPhoto?: string;
}

interface Session {
  user: User;
}

interface SettingsProps {
  session: Session | null;
}

const Settings: React.FC<SettingsProps> = ({ session }) => {
  const [username, setUsername] = useState(session?.user?.username || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [bio, setBio] = useState(session?.user?.bio || "");
  const [profilePicture, setProfilePicture] = useState(
    session?.user?.profilePicture || ""
  );
  const [coverPhoto, setCoverPhoto] = useState(session?.user?.coverPhoto || "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // States for messages
  const [usernameMessage, setUsernameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [bioMessage, setBioMessage] = useState("");
  const [pictureMessage, setPictureMessage] = useState("");
  const [coverMessage, setCoverMessage] = useState("");

  useEffect(() => {
    setUsername(session?.user?.username || "");
    setEmail(session?.user?.email || "");
    setBio(session?.user?.bio || "");
    setProfilePicture(session?.user?.profilePicture || "");
    setCoverPhoto(session?.user?.coverPhoto || "");
  }, [session]);

  if (!session) {
    return null;
  }

  const isUsernameChanged = username !== session?.user?.username;
  const isEmailChanged = email !== session?.user?.email;
  const isBioChanged = bio !== session?.user?.bio;
  const isProfilePictureChanged =
    profilePicture !== session?.user?.profilePicture;
  const isCoverPhotoChanged = coverPhoto !== session?.user?.coverPhoto;
  const isPasswordChanged =
    currentPassword && newPassword && confirmPassword === newPassword;

  const handleUpdate = async (field: string, value: string) => {
    try {
      const res = await fetch(`/api/settings/update${field}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [field.toLowerCase()]: value }),
      });

      const data = await res.json();
      if (res.ok) {
        if (field === "Username") setUsernameMessage(data.message);
        if (field === "Email") setEmailMessage(data.message);
        if (field === "Password") setPasswordMessage(data.message);
        if (field === "Bio") setBioMessage(data.message);
        if (field === "profilePicture") setPictureMessage(data.message);
      } else {
        if (field === "Username") setUsernameMessage(`Error: ${data.message}`);
        if (field === "Email") setEmailMessage(`Error: ${data.message}`);
        if (field === "Password") setPasswordMessage(`Error: ${data.message}`);
        if (field === "Bio") setBioMessage(`Error: ${data.message}`);
        if (field === "profilePicture")
          setPictureMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating field:", error);
      if (field === "Username") setUsernameMessage("Error updating username");
      if (field === "Email") setEmailMessage("Error updating email");
      if (field === "Password") setPasswordMessage("Error updating password");
      if (field === "Bio") setBioMessage("Error updating bio");
      if (field === "profilePicture")
        setPictureMessage("Error updating profile picture");
    }

    setTimeout(() => {
      if (field === "Username") setUsernameMessage("");
      if (field === "Email") setEmailMessage("");
      if (field === "Password") setPasswordMessage("");
      if (field === "Bio") setBioMessage("");
      if (field === "profilePicture") setPictureMessage("");
    }, 5000);
  };

  const handleUpdateProfilePicture = async () => {
    try {
      const res = await fetch("/api/settings/updateProfilePicture", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profilePicture }),
      });

      const data = await res.json();
      if (res.ok) {
        setPictureMessage(data.message);
      } else {
        setPictureMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setPictureMessage("Error updating profile picture");
      console.error("Error updating profile picture:", error);
    }

    setTimeout(() => setPictureMessage(""), 5000);
  };

  const handleUpdateCoverPhoto = async () => {
    try {
      const res = await fetch("/api/settings/updateCoverPhoto", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coverPhoto }),
      });

      const data = await res.json();
      if (res.ok) {
        setCoverMessage(data.message);
      } else {
        setCoverMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setCoverMessage("Error updating cover photo");
      console.error("Error updating cover photo:", error);
    }

    setTimeout(() => setCoverMessage(""), 5000);
  };

  const handleUpdatePassword = async () => {
    try {
      const res = await fetch("/api/settings/updatePassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setPasswordMessage(data.message);
      } else {
        setPasswordMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setPasswordMessage("Error updating password");
      console.error("Error updating password:", error);
    }

    setTimeout(() => setPasswordMessage(""), 5000);
  };

  return (
    <div className="w-11/12 lg:w-8/12 m-auto lg:my-20 bg-white rounded-lg overflow-hidden">
      <div className="relative h-[100px] w-full">
        <Image
          src={session.user.coverPhoto || "/images/cover--default.jpg"}
          alt="Cover Photo"
          className="w-full h-full object-cover"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
      <div className=" w-11/12 flex py-4 m-auto">
        <Image
          src={session.user.profilePicture || "/images/profile--default.jpg"}
          alt="Profile Picture"
          height={100}
          width={100}
          className="align-baseline rounded-full"
        />
        <div className="ml-2 flex flex-col justify-center">
          <p className=" font-bold ">{session.user.username}</p>
          <p className=" text-sm text-gray-500">{session.user.email}</p>
        </div>
      </div>
      <div className=" w-11/12 m-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="mb-4">
          <p className="mb-4 text-sm jpg">Username</p>
          <input
            placeholder=""
            className="bg-bggray px-4 py-2 w-full text-sm rounded-lg  text-gray-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {isUsernameChanged && (
            <>
              <button
                className="bg-customgreen text-white rounded-lg px-4 py-2 text-sm mt-4"
                onClick={() => handleUpdate("Username", username)}
              >
                Save Username
              </button>
              <p className="text-sm mt-2">{usernameMessage}</p>
            </>
          )}
        </div>
        <div className="mb-4">
          <p className="mb-4 text-sm jpg">Email</p>
          <input
            placeholder=""
            className="bg-bggray px-4 py-2 w-full rounded-lg  text-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isEmailChanged && (
            <>
              <button
                className="bg-customgreen text-white rounded-lg px-4 py-2 text-sm mt-4"
                onClick={() => handleUpdate("Email", email)}
              >
                Save Email
              </button>
              <p className="text-sm mt-2">{emailMessage}</p>
            </>
          )}
        </div>

        <div className="mb-4">
          <p className="mb-4 text-sm jpg">Bio</p>
          <textarea
            placeholder=""
            className="bg-bggray px-4 py-2 w-full text-sm rounded-lg  text-gray-500"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          {isBioChanged && (
            <>
              <button
                className="bg-customgreen text-white rounded-lg px-4 py-2 text-sm mt-4"
                onClick={() => handleUpdate("Bio", bio)}
              >
                Save Bio
              </button>
              <p className="text-sm mt-2">{bioMessage}</p>
            </>
          )}
        </div>
        <div className="mb-4">
          <p className="mb-4 text-sm jpg">Profile Picture URL</p>
          <input
            placeholder=""
            className="bg-bggray px-4 py-2 w-full text-sm rounded-lg  text-gray-500"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
          {isProfilePictureChanged && (
            <>
              <button
                className="bg-customgreen text-white rounded-lg px-4 py-2 text-sm mt-4"
                onClick={handleUpdateProfilePicture}
              >
                Save Picture
              </button>
              <p className="text-sm mt-2">{pictureMessage}</p>
            </>
          )}
        </div>
        <div className="mb-4">
          <p className="mb-4 text-sm jpg">Cover Photo URL</p>
          <input
            placeholder=""
            className="bg-bggray px-4 py-2 w-full text-sm rounded-lg  text-gray-500"
            value={coverPhoto}
            onChange={(e) => setCoverPhoto(e.target.value)}
          />
          {isCoverPhotoChanged && (
            <>
              <button
                className="bg-customgreen text-white rounded-lg px-4 py-2 text-sm mt-4"
                onClick={handleUpdateCoverPhoto}
              >
                Save Cover Photo
              </button>
              <p className="text-sm mt-2">{coverMessage}</p>
            </>
          )}
        </div>
        <div className="mb-4">
          <p className="mb-4 text-sm jpg">Change Password</p>
          <input
            placeholder="Current Password"
            type="password"
            className="bg-bggray px-4 py-2 w-full rounded-lg  text-gray-500 mb-2"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            placeholder="New Password"
            type="password"
            className="bg-bggray px-4 py-2 w-full rounded-lg  text-gray-500 mb-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            placeholder="Confirm Password"
            type="password"
            className="bg-bggray px-4 py-2 w-full rounded-lg  text-gray-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {isPasswordChanged && (
            <>
              <button
                className="bg-customgreen text-white rounded-lg px-4 py-2 text-sm mt-4"
                onClick={handleUpdatePassword}
              >
                Save Password
              </button>
              <p className="text-sm mt-2">{passwordMessage}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
