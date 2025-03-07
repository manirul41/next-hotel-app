"use client"
import { useState } from "react";
import { getSession, signOut, useSession } from "next-auth/react";
import { auth } from "@/auth";

const useAuthFetch = (url: string) => {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  
  
  const fetchWithAuth = async () => {
    setLoading(true);
    const session_ck = await getSession();
    try {
      const res = await fetch(url, {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${session_ck?.user.accessToken}`,
        },
      });
      
      if (res.status === 403) {
        const refreshRes = await fetch("/api/refresh-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken: session_ck?.user.refreshToken }),
        });

        if (refreshRes.ok) {
          const { accessToken } = await refreshRes.json();
          await update({ accessToken });

          // Retry original request
          const retryRes = await fetch(url, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          return await retryRes.json();
        } else {
          signOut();
        }
      }
      
      return await res.json();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchWithAuth, loading };
};

export default useAuthFetch;
