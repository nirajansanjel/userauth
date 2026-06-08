"use client";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import app from "@/lib/firebase";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { getUserRole } from "@/lib/getRole";
import { useRouter } from "next/navigation";
import { downloadUserPDF } from "@/lib/dwdUser";
import Image from "next/image";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "@/lib/upCl";

const UserDashboard = () => {
  const auth = getAuth(app);
  const [userData, setUserData] = useState(null);
   const [file, setFile] = useState(null);
  const router = useRouter();

  // Listen for active login session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }
      const role = await getUserRole(user.uid);

      if (role === "admin") {
        router.push("/admin-dashboard");
      }
      if (user) {
        const docRef = doc(db, "users", user.uid);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    });

    return () => unsubscribe();
  }, []);

    // Upload image handler
  const handleUpload = async () => {
    if (!file) return toast.error("please upload a file");

    const imageUrl = await uploadToCloudinary(file);

    const res =await updateDoc(doc(db, "users", userData.uid), {
      photoURL: imageUrl
    });
    if(res) {
      toast.success("photo upload sucess")
    }

    setUserData((prev) => ({
      ...prev,
      photoURL: imageUrl
    }));
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-[#f4f3ef] p-6 font-sans">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <div className="bg-[#1a1035] rounded-2xl px-6 py-5 flex items-center justify-between overflow-hidden relative">
          <div className="absolute w-48 h-48 rounded-full bg-purple-600/30 blur-3xl -top-10 -right-10 pointer-events-none" />
          <div className="absolute w-32 h-32 rounded-full bg-sky-400/20 blur-3xl bottom-0 left-4 pointer-events-none" />
          <div className="relative z-10 flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
              <rect
                width="36"
                height="36"
                rx="10"
                fill="white"
                fillOpacity="0.15"
              />
              <circle cx="18" cy="18" r="8" stroke="white" strokeWidth="2" />
              <circle cx="18" cy="18" r="3" fill="white" />
            </svg>
            <span className="text-white font-bold text-lg tracking-tight">
              Orion
            </span>
          </div>
          <h1 className="relative z-10 text-white font-bold text-xl tracking-tight">
            Dashboard
          </h1>
        </div>

        {userData ? (
          <>
            {/* User info card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
                Account details
              </h2>

              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                {/* Avatar */}
                {/* PROFILE IMAGE */}
      <div className="flex flex-col"> 
     <div>
      <div className="flex ">
         {userData.photoURL ? (
          <Image
            src={userData.photoURL}
            width={100}
            height={100}
            alt=""
            className="h-16 w-16 rounded"
          />
        ) : (
         <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center text-base font-bold text-violet-700 select-none shrink-0">
              {userData.email?.[0]?.toUpperCase() ?? "U"}
            </div>
        )}
          <div className="mx-2 px-2">
                  <p className="text-sm font-semibold text-gray-900">
                    {userData.email}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-violet-50 text-violet-700 text-xs font-semibold">
                    {userData.role}
                  </span>
                </div>
              </div>
      </div>

      {/* FILE INPUT */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="bg-gray-200 border rounded flex w-1/5 m-1 p-1"
      />

      <button onClick={handleUpload}
      className="bg-orange-200 p-1 rounded border text-sm w-1/2 ">
        Upload Profile Picture
      </button>
     </div>
         
     </div>
          

              {/* Detail rows */}
              <div className="divide-y divide-gray-100">
                <div className="flex items-center justify-between py-3">
                  <p className="text-xs font-semibold text-gray-500">Email</p>
                  <p className="text-sm text-gray-800">{userData.email}</p>
                </div>
                <div className="flex items-center justify-between py-3">
                  <p className="text-xs font-semibold text-gray-500">Role</p>
                  <span className="px-2 py-0.5 rounded-md bg-violet-50 text-violet-700 text-xs font-semibold">
                    {userData.role}
                  </span>
                </div>
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Account details
                </h2>
                <button
                  className="border-2 border-gray-200 bg-gray-300 rounded-md"
                  onClick={async () => {
    await downloadUserPDF(userData);
  }}
   style={{
                    marginTop: "20px",
                    padding: "10px",
                    cursor: "pointer",
                  }}
                >
                  Download My Info (PDF)
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Loading state */
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-10 flex items-center justify-center gap-3">
            <span className="w-4 h-4 rounded-full border-2 border-violet-300 border-t-violet-700 animate-spin" />
            <p className="text-sm text-gray-500 font-medium">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
