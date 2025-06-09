'use client';

import {
  BookOpen,
  ClipboardList,
  Layers
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const stats = [
  {
    label: "All Classes",
    value: 12,
    icon: Layers,
    color: "bg-blue-100 text-blue-600",
    href: "/user/classes",
  },
  {
    label: "Total Subjects",
    value: 34,
    icon: BookOpen,
    color: "bg-green-100 text-green-600",
    href: "/user/subjects",
  },
  {
    label: "Pending Assessments",
    value: 18,
    icon: ClipboardList,
    color: "bg-yellow-100 text-yellow-700",
    href: "/user/assessments",
  },
];

export default function Page() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-20">📊 Welcome to Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map(({ label, value, icon: Icon, color, href }, idx) => (
          <Link key={idx} href={href}>
            <Card className="shadow-md hover:shadow-lg transition-all duration-200 border-2 rounded-xl cursor-pointer hover:border-primary">
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`p-3 rounded-full ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="text-xl font-bold">{value}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
