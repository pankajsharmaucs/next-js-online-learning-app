'use client';

import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { getLogginedUserData } from '@/utlis/checkAdminLogin';
import { showErrorToast } from '@/components/alert/AlertToast';
import { Skeleton } from '@/components/ui/skeleton';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

type SoldClass = {
  _id: string;
  class_id: string;
  user_id: number;
  purchase_date: string;
  validity: string;
  update_date: string;
  activeStatus: string;
};

interface MasterClass {
  _id: string;
  class_name: string;
  board_id: { _id: string; board_name: string; } | string;
}

interface MasterBoard {
  _id: string;
  board_name: string;
  image?: string;
  linkTo?: string;
  is_visible?: boolean;
}

export default function Page() {
  const [purchasedClasses, setPurchasedClasses] = useState<SoldClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [masterClasses, setMasterClasses] = useState<MasterClass[]>([]);
  const [boards, setBoards] = useState<MasterBoard[]>([]);

  const fetchMasterClasses = async () => {
    try {
      const baseUrl = window.location.origin;
      const url = `${baseUrl}${process.env.NEXT_PUBLIC_ADMIN_GET_ALL_CLASS}`;

      const response = await axios.get(url);
      if (response.data) {
        setMasterClasses(response?.data);
      }
    } catch (error) {
      console.error('Error fetching master classes:', error);
      showErrorToast('Failed to fetch class details');
    }
  };

  const fetchBoards = async () => {
    try {
      const baseUrl = window.location.origin;
      const url = `${baseUrl}${process.env.NEXT_PUBLIC_ADMIN_GET_ALL_BOARD}`;
      const response = await axios.get(url);
      if (response.data) {
        setBoards(response.data);
      }
    } catch (error) {
      console.error('Error fetching boards:', error);
      showErrorToast('Failed to fetch boards');
    }
  };


  const fetchPurchasedClasses = async () => {
    try {
      const user_data = await getLogginedUserData();
      if (!user_data?.email || !user_data?.token) {
        showErrorToast('User not authenticated');
        return;
      }

      const baseUrl = window.location.origin;
      const url = `${baseUrl}${process.env.NEXT_PUBLIC_USER_FETCH_ALL_CLASSES}`;

      const response = await axios.post(url, {
        email: user_data.email,
        token: user_data.token,
      });

      if (response.data?.data && Array.isArray(response.data.data)) {
        setPurchasedClasses(response.data.data);
      } else {
        setPurchasedClasses([]);
      }
    } catch (error) {
      console.error('Error fetching purchased classes:', error);
      showErrorToast('Failed to fetch purchased classes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMasterClasses();
    fetchBoards();
    fetchPurchasedClasses();
  }, []);


  const filteredClasses = useMemo(() => {
    let filtered = [...purchasedClasses];

    if (search) {
      filtered = filtered.filter((cls) =>
        cls.class_id.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (cls) => cls.activeStatus.toLowerCase() === statusFilter
      );
    }

    return filtered.sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.purchase_date).getTime() - new Date(b.purchase_date).getTime()
        : new Date(b.purchase_date).getTime() - new Date(a.purchase_date).getTime()
    );
  }, [purchasedClasses, search, statusFilter, sortOrder]);


  useEffect(() => {
    fetchPurchasedClasses();
  }, []);



  const getClassName = (classId: string) => {
    const found = masterClasses.find((cls) => cls._id === classId);
    return found?.class_name || "Unknown Class";
  };


  const getBoardName = (classId: string) => {
    const foundClass = masterClasses.find((cls) => cls._id === classId);
    const boardId = typeof foundClass?.board_id === 'string' ? foundClass.board_id : foundClass?.board_id?._id;
    const board = boards.find((b) => b._id === boardId);
    return board?.board_name || "Unknown Board";
  };



  return (
    <div className="max-w-10xl mx-auto " >
      <Card className="p-6 shadow-xl border-2 border-muted rounded-2xl" style={{ padding: "20px" }} >
        <div className="mb-0">
          <h2 className="text-2xl font-bold mb-6">🎓 All Purchased Classes</h2>
          <p className="text-muted-foreground text-sm">
            Explore and filter the Classes.
          </p>
        </div>

        <div className="w-100 mx-auto">
          <Card className="backdrop-blur-md bg-white/5 border-0 shadow-none  p-4 rounded-2xl" style={{ padding: "10px" }} >
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-40 rounded-xl" />
                ))}
              </div>
            ) : purchasedClasses.length === 0 ? (
              <p className="text-muted-foreground">No purchased classes found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredClasses.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between bg-white/10 backdrop-blur-md border border-white/20 rounded-xl   duration-300 p-4"
                  >
                    {/* Class Info */}
                    <div className="mb-4">
                      <h1 className="text-5xl font-bold  text-center mb-2">{getClassName(item.class_id)}</h1>
                      <p className="text-sm text-muted-foreground text-center">
                        Board: {getBoardName(item.class_id)}
                      </p>
                      <p className="text-sm text-muted-foreground text-center">
                        Purchased on: {new Date(item.purchase_date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground text-center">
                        Validity: {item.validity}
                      </p>
                      <p
                        className={`text-sm text-center font-medium ${item.activeStatus ? 'text-green-500' : 'text-red-500'
                          }`}
                      >
                        {item.activeStatus ? 'Active' : 'Inactive'}
                      </p>
                    </div>

                    {/* Action Button */}
                    <Link
                      href={`/user/subjects?class_id=${item.class_id}&class_name=${encodeURIComponent(
                        getClassName(item.class_id)
                      )}`}
                    >
                      <Button
                        variant="outline"
                        className="py-3 w-full rounded-xl flex justify-center"
                      >
                        Explore Subjects
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>



      </Card>
    </div>
  );
}
