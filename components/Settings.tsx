"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const Settings = ({ session }) => {
  // Initial states from session
  const [username, setUsername] = useState(session?.user?.username || "");
  const [email, setEmail] = useState(session?.user?.email || "");
  const [bio, setBio] = useState(session?.user?.bio || "");
  const [profilePicture, setProfilePicture] = useState(
    session?.user?.profilePicture || ""
  );

  const [coverPhoto, setCoverPhoto] = useState(session?.user?.coverPhoto || "");

  useEffect(() => {
    setCoverPhoto(session?.user?.coverPhoto || "");
  }, [session]);
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
    console.log("Session data:", session); // Check session data
    setUsername(session?.user?.username || "");
    setEmail(session?.user?.email || "");
    setBio(session?.user?.bio || "");
    setProfilePicture(session?.user?.profilePicture || "");
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
    newPassword !== "" && newPassword === confirmPassword;

  const handleUpdate = async (field, value) => {
    try {
      const res = await fetch(`/api/settings/update${field}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [field.toLowerCase()]: value }), // Use field directly
      });

      if (res.status === 204) {
        // No Content
        if (field === "Username")
          setUsernameMessage("Username updated successfully");
        if (field === "Email") setEmailMessage("Email updated successfully");
        if (field === "Password")
          setPasswordMessage("Password updated successfully");
        if (field === "Bio") setBioMessage("Bio updated successfully");
        if (field === "profilePicture")
          // Corrected field name
          setPictureMessage("Profile picture updated successfully");
      } else {
        const data = await res.json();
        console.log("Response data:", data);

        if (res.ok) {
          if (field === "Username") setUsernameMessage(data.message);
          if (field === "Email") setEmailMessage(data.message);
          if (field === "Password") setPasswordMessage(data.message);
          if (field === "Bio") setBioMessage(data.message);
          if (field === "profilePicture")
            // Corrected field name
            setPictureMessage(data.message);
        } else {
          if (field === "Username")
            setUsernameMessage(`Error: ${data.message}`);
          if (field === "Email") setEmailMessage(`Error: ${data.message}`);
          if (field === "Password")
            setPasswordMessage(`Error: ${data.message}`);
          if (field === "Bio") setBioMessage(`Error: ${data.message}`);
          if (field === "profilePicture")
            // Corrected field name
            setPictureMessage(`Error: ${data.message}`);
        }
      }
    } catch (error) {
      console.error("Error updating field:", error);
      if (field === "Username") setUsernameMessage("Error updating username");
      if (field === "Email") setEmailMessage("Error updating email");
      if (field === "Password") setPasswordMessage("Error updating password");
      if (field === "Bio") setBioMessage("Error updating bio");
      if (field === "profilePicture")
        // Corrected field name
        setPictureMessage("Error updating profile picture");
    }

    setTimeout(() => {
      if (field === "Username") setUsernameMessage("");
      if (field === "Email") setEmailMessage("");
      if (field === "Password") setPasswordMessage("");
      if (field === "Bio") setBioMessage("");
      if (field === "profilePicture")
        // Corrected field name
        setPictureMessage("");
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

      if (res.ok) {
        const data = await res.json();
        setPictureMessage(data.message);
      } else {
        const data = await res.json();
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

      if (res.ok) {
        const data = await res.json();
        setCoverMessage(data.message);
      } else {
        const data = await res.json();
        setCoverMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setCoverMessage("Error updating profile picture");
      console.error("Error updating profile picture:", error);
    }

    setTimeout(() => setPictureMessage(""), 5000);
  };
  return (
    <div className="w-11/12 lg:w-8/12 m-auto lg:my-24 flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/4 py-8 lg:py-0">
        <p className="text-lg font-bold">Settings</p>
      </div>
      <div className="bg-white flex-1 px-4 py-4 rounded-lg">
        <div className="mb-4">
          <p className="mb-4 text-sm font-bold">Username</p>
          <input
            placeholder=""
            className="bg-bggray px-4 py-2 w-full text-sm rounded-lg"
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
          <p className="mb-4 text-sm font-bold">Email</p>
          <input
            placeholder=""
            className="bg-bggray px-4 py-2 w-full rounded-lg"
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
          <p className="mb-4 text-sm font-bold">Change Password</p>
          <input
            placeholder="New password"
            className="bg-bggray px-4 py-2 w-full text-sm mb-4 rounded-lg"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            placeholder="Confirm new password"
            className="bg-bggray px-4 py-2 text-sm w-full rounded-lg"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {isPasswordChanged && (
            <>
              <button
                className="bg-customgreen text-white rounded-lg px-4 py-2 text-sm mt-4"
                onClick={() => handleUpdate("Password", newPassword)}
              >
                Save Password
              </button>
              <p className="text-sm mt-2">{passwordMessage}</p>
            </>
          )}
        </div>
        <div className="mb-4">
          <p className="mb-4 text-sm font-bold">Bio</p>
          <textarea
            placeholder=""
            className="bg-bggray px-4 py-2 w-full text-sm rounded-lg"
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
          <p className="mb-4 text-sm font-bold">Profile Picture URL</p>
          <input
            placeholder=""
            className="bg-bggray px-4 py-2 w-full text-sm rounded-lg"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
          {isProfilePictureChanged && (
            <>
              <button
                className="bg-customgreen text-white rounded-lg px-4 py-2 text-sm mt-4"
                onClick={handleUpdateProfilePicture}
              >
                Save Profile Picture
              </button>
              <p className="text-sm mt-2">{pictureMessage}</p>
            </>
          )}
        </div>
        <div className="mb-4">
          <p className="mb-4 text-sm font-bold">Cover Photo URL</p>
          <input
            placeholder=""
            className="bg-bggray px-4 py-2 w-full text-sm rounded-lg"
            value={coverPhoto}
            onChange={(e) => setCoverPhoto(e.target.value)}
          />
          {isCoverPhotoChanged && (
            <>
              <button
                className="bg-customgreen text-white rounded-lg px-4 py-2 text-sm mt-4"
                onClick={handleUpdateCoverPhoto}
              >
                Save Profile Picture
              </button>
              <p className="text-sm mt-2">{coverMessage}</p>
            </>
          )}
        </div>

        <div className="mb-4">
          <p className="text-sm font-bold">Avatar</p>
          <p className="text-sm mb-4">
            Allowed Formats: JPEG, PNG. Max size: 3mb. Optimal
          </p>
          <div className="flex flex-col gap-4 lg:flex-row">
            <Image
              src={
                session?.user?.profilePicture || "/images/profile--default.jpg"
              }
              alt=""
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-bold">Banner</p>
          <p className="text-sm mb-4">
            Allowed Formats: JPEG, PNG. Max size: 3mb. Optimal
          </p>
          <div className="flex flex-col lg:flex-row gap-4">
            <div>
              <Image
                src={session?.user?.coverPhoto || "/images/cover--default.jpg"}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                className="rounded-lg h-[200px] w-[200px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
