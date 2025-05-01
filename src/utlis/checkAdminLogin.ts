import axios from "axios";
import { useRouter } from "next/navigation";

type Router = ReturnType<typeof useRouter>;

export const checkAdminHomeLogin = async (router: Router) => {
  try {
    const baseUrl = window.location.origin;
    const Path = process.env.NEXT_PUBLIC_ADMIN_LOGIN_CHECK;
    const Url = `${baseUrl}${Path}`;

    const response = await axios.get(Url, { withCredentials: true });

    if (response.status !== 200) {
      router.push("/admin/login");
    } else {
      router.push("/admin/dashboard");
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    router.push("/admin/login");
  }
};

export const checkAdminLogin = async (router: Router) => {
  try {
    const baseUrl = window.location.origin;
    const Path = process.env.NEXT_PUBLIC_ADMIN_LOGIN_CHECK;
    const Url = `${baseUrl}${Path}`;

    const response = await axios.get(Url, { withCredentials: true });
    // console.log(response);

    if (response.status !== 200) {
      router.push("/admin/login");
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    router.push("/admin/login");
  }
};

export const getLogginedUser = async () => {
  try {
    const baseUrl = window.location.origin;
    const Path = process.env.NEXT_PUBLIC_ADMIN_LOGIN_CHECK;
    const Url = `${baseUrl}${Path}`;

    const response = await axios.get(Url, { withCredentials: true });
    // console.log(response);

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false
  }
};


export const checkAdminLoginStatus = async () => {
  try {
    const baseUrl = window.location.origin;
    const Path = process.env.NEXT_PUBLIC_ADMIN_LOGIN_CHECK;
    const Url = `${baseUrl}${Path}`;

    const response = await axios.get(Url, { withCredentials: true });

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};
