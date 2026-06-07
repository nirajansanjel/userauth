"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/lib/firebase";
import { getUserRole } from "@/lib/getRole";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getAllUsers } from "@/lib/getAll";

export default function AdminPage() {
  const router = useRouter();
  const auth = getAuth(app);

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      const role = await getUserRole(user.uid);

      if (role !== "admin") {
        router.push("/dashboard");
        return;
      }
      if (user) {
        const docRef = doc(db, "users", user.uid);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
      const fetchUsers = async () => {
        const data = await getAllUsers();
        setUsers(data);
      };

      fetchUsers();

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Checking access...</p>;

  return (
    <div className="min-h-screen bg-[#f4f3ef] p-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-4">
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
            Admin Dashboard
          </h1>
        </div>

        {userData ? (
          <>
            {/* Current user info card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-sm font-bold text-violet-700 select-none shrink-0">
                {userData.email?.[0]?.toUpperCase() ?? "U"}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {userData.email}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Role:{" "}
                  <span className="inline-block px-2 py-0.5 rounded-md bg-violet-50 text-violet-700 font-semibold text-xs">
                    {userData.role}
                  </span>
                </p>
              </div>
            </div>

            {/* Users table card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-900">
                  All Users
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {users.length} total
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                        UID
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                        Email
                      </th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-3 text-xs text-gray-400 font-mono">
                          {user.id}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-800 font-medium">
                          {user.email}
                        </td>
                        <td className="px-6 py-3">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-violet-50 text-violet-700 text-xs font-semibold">
                            {user.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
}
