'use client';

import axios from 'axios';
import { getLogginedUserData } from '@/utlis/checkAdminLogin';

export async function checkUserClassAccess(classId: string): Promise<boolean> {
  try {
    const userData = await getLogginedUserData();
    if (!userData?.email || !userData?.token) return false;

    const baseUrl = window.location.origin;
    const url = `${baseUrl}/${process.env.NEXT_PUBLIC_USER_ACCESS_CLASS}`;

    const res = await axios.post(url, {
      email: userData.email,
      token: userData.token,
      class_id: classId,
    });

    return res.data.hasAccess === true;
  } catch (err) {
    console.error("Error verifying class access", err);
    return false;
  }
}

