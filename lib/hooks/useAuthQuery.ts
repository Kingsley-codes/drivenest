// lib/hooks/useAuthQuery.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const { data } = await axios.get("/api/auth/check", {
        withCredentials: true,
      });
      return data;
    },
    staleTime: 0, // Always fresh
    refetchOnWindowFocus: true, // Refetch when tab gains focus
    refetchOnMount: true, // Refetch when component mounts
    refetchOnReconnect: true, // Refetch when network reconnects
  });
};
