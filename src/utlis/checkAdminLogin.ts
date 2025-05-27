import axios from "axios";
import { useRouter } from "next/navigation";

type Router = ReturnType<typeof useRouter>;

const getLoginCheckUrl = (): string => {
  const baseUrl = window.location.origin;
  const path = process.env.NEXT_PUBLIC_ADMIN_LOGIN_CHECK || '/api/admin/check'; // fallback path
  return `${baseUrl}${path}`;
};

// ✅ 1. Check login and redirect accordingly (home page)
export const checkAdminHomeLogin = async (router: Router) => {
  try {
    const response = await axios.get(getLoginCheckUrl(), { withCredentials: true });

    router.push(response.status === 200 ? "/admin/dashboard" : "/admin/login");
  } catch (error) {
    console.error("Error checking authentication:", error);
    router.push("/admin/login");
  }
};

// ✅ 2. Check login for protected admin pages (no dashboard redirect)
export const checkAdminLogin = async (router: Router) => {
  try {
    const response = await axios.get(getLoginCheckUrl(), { withCredentials: true });

    if (response.status !== 200) {
      router.push("/admin/login");
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    router.push("/admin/login");
  }
};

// ✅ 3. Get logged-in user data (JWT decoded payload)
export const getLogginedUser = async () => {
  try {
    const response = await axios.get(getLoginCheckUrl(), { withCredentials: true });

    if (response.status === 200) {
      return response.data.user_data; // return decoded token data
    }

    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// ✅ 4. Return boolean auth status
export const checkAdminLoginStatus = async (): Promise<boolean> => {
  try {
    const response = await axios.get(getLoginCheckUrl(), { withCredentials: true });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};


// =================User==========

const getUserLoginCheckUrl = (): string => {
  const baseUrl = window.location.origin;
  const path = process.env.NEXT_PUBLIC_USER_LOGIN_CHECK || '/api/user/check'; // fallback path
  return `${baseUrl}${path}`;
};

export const checkUserHomeLogin = async (router: Router) => {
  try {
    const response = await axios.get(getUserLoginCheckUrl(), { withCredentials: true });

    router.push(response.status === 200 ? "/user/dashboard" : "/login");
  } catch (error) {
    console.error("Error checking authentication:", error);
    router.push("/login");
  }
};
