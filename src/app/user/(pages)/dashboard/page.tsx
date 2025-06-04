'use client';

import {
  BookOpen,
  Video,
  FileText,
  ClipboardList,
  Layers
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    label: "Total Classes",
    value: 12,
    icon: Layers,
    color: "bg-blue-100 text-blue-600"
  },
  {
    label: "Total Subjects",
    value: 34,
    icon: BookOpen,
    color: "bg-green-100 text-green-600"
  },
  {
    label: "Assessments",
    value: 18,
    icon: ClipboardList,
    color: "bg-yellow-100 text-yellow-700"
  },
  {
    label: "Videos",
    value: 56,
    icon: Video,
    color: "bg-purple-100 text-purple-600"
  },
  {
    label: "PDFs",
    value: 23,
    icon: FileText,
    color: "bg-pink-100 text-pink-600"
  }
];

export default function Page() {
  return (
    <div className="p-6 max-w-7xl mx-auto ">
      <h2 className="text-2xl font-bold mb-20">📊 Welcom to Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map(({ label, value, icon: Icon, color }, idx) => (
          <Card
            key={idx}
            className="shadow-md hover:shadow-lg transition-all duration-200 border-2 rounded-xl"
          >
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
        ))}
      </div>
    </div>
  );
}
