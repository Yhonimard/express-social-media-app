import api from "@/api";
import { GET_USER_PROFILE_NAME } from "@/fixtures/api-query";
import { useQuery } from "@tanstack/react-query";

const useGetCurrentUserProfile = (uid) => {
  return useQuery([GET_USER_PROFILE_NAME, uid], async () => {
    const res = await api.request.getCurrentUserProfile();
    return res;
  });
};

export default useGetCurrentUserProfile;
