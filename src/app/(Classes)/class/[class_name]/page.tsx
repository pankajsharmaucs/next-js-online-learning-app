import { generateDynamicMetadata } from "@/lib/seo";
import ClassPage from "./ClassPage";

// // This is for metadata generation based on dynamic segment (like /class/math)
// export async function generateMetadata({
//   params,
// }: {
//   params: { class_name: string };
// }) {
//   return generateDynamicMetadata({
//     type: "class",
//     slug: params.class_name,
//   });
// }

// This is the actual page component
export default function Page() {
  return <ClassPage />;
}