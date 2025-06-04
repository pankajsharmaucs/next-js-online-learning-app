'use client';

import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { getLogginedUserData } from '@/utlis/checkAdminLogin';
import { showErrorToast } from '@/components/alert/AlertToast';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import clsx from "clsx";

interface PurchasedClass {
  _id: string;
  class_id: string;
  user_id: string;
  createdAt: string;
}

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
};

const dummyProducts: Product[] = [
  { id: "1", name: "MacBook Pro", price: 199999, category: "Laptops" },
  { id: "2", name: "iPhone 15", price: 89999, category: "Phones" },
  { id: "3", name: "AirPods Pro", price: 24999, category: "Accessories" },
  { id: "4", name: "Dell XPS 13", price: 139999, category: "Laptops" },
  { id: "5", name: "Samsung Galaxy S24", price: 79999, category: "Phones" },
  { id: "6", name: "Logitech Mouse", price: 2999, category: "Accessories" }
];

const categoryBadge = {
  Laptops: "bg-blue-100 text-blue-700",
  Phones: "bg-green-100 text-green-700",
  Accessories: "bg-yellow-100 text-yellow-700"
};

export default function Page() {
  const [purchasedClasses, setPurchasedClasses] = useState<PurchasedClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredProducts = useMemo(() => {
    let filtered = dummyProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    if (category !== "all") {
      filtered = filtered.filter((product) => product.category === category);
    }

    return filtered.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [search, category, sortOrder]);

  const fetchPurchasedClasses = async () => {
    try {
      const user_data = await getLogginedUserData();
      if (!user_data?.email) {
        showErrorToast('User not authenticated');
        return;
      }

      const baseUrl = window.location.origin;
      const url = `${baseUrl}${process.env.NEXT_PUBLIC_USER_FETCH_CLASS}`;

      const response = await axios.post(url, {
        email: user_data.email,
        token: user_data.token,
      });

      if (response.data?.data) {
        setPurchasedClasses([response.data.data]);
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
    fetchPurchasedClasses();
  }, []);

  return (
    <div className="max-w-10xl mx-auto " >
      <Card className="p-6 shadow-xl border-2 border-muted rounded-2xl" style={{padding:"10px"}} >
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
            🏛️ Classes
          </h2>
          <p className="text-muted-foreground text-sm">
            Explore and filter the Classes.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <Input
            placeholder="🔎 Search by class..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:w-1/3"
          />
          <div className="flex gap-4">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Laptops">Laptops</SelectItem>
                <SelectItem value="Phones">Phones</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as "asc" | "desc")}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">⬇️ Price: Low to High</SelectItem>
                <SelectItem value="desc">⬆️ Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border">
          <Table>
            <TableHeader className="bg-muted/60">
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price (₹)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product, idx) => (
                <TableRow
                  key={product.id}
                  className={clsx(
                    idx % 2 === 0 && "bg-muted/30",
                    "hover:bg-accent/40 transition"
                  )}
                >
                  <TableCell className="font-semibold">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <span
                      className={clsx(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        categoryBadge[product.category as keyof typeof categoryBadge]
                      )}
                    >
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ₹{product.price.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
