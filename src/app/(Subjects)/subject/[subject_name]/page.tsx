import { generateDynamicMetadata } from "@/lib/seo";
import SubjectPage from "./SubjectPage";

export async function generateMetadata(context: { params: any }) {
    const params = await Promise.resolve(context.params);
    const subjectSlug = params?.subject_name || "";

    return generateDynamicMetadata({
        type: "subject",
        slug: subjectSlug,
    });
}

export default function Page() {
    return <SubjectPage />;
}