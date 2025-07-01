
interface MetaOptions {
  type: "class" | "subject" | "chapter" | "default";
  slug: string;
}

export function generateDynamicMetadata({ type, slug }: MetaOptions) {
  const cleanedSlug = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  switch (type) {
    case "class":
      return {
        title: `Class ${cleanedSlug} NCERT Notes, Videos, PDFs `,
        description: `Access free Class ${cleanedSlug} NCERT study material: notes, CBSE 2025 syllabus, downloadable PDFs, and subject-wise video lectures.`,
        keywords: [
          `Class ${cleanedSlug} NCERT notes`,
          `free Class ${cleanedSlug} CBSE syllabus`,
          `download Class ${cleanedSlug} PDFs`,
          `NCERT video lectures Class ${cleanedSlug}`,
          `Class ${cleanedSlug} study material 2025`,
        ],
      };

    case "subject":
      return {
        title: `${cleanedSlug} subject NCERT Study Material - Notes, Syllabus & PDFs `,
        description: `Download free NCERT ${cleanedSlug} notes, videos, and PDFs for Classes 5 to 12. CBSE syllabus 2025-aligned material for better exam preparation.`,
        keywords: [
          `NCERT ${cleanedSlug} notes`,
          `${cleanedSlug} CBSE syllabus 2025`,
          `${cleanedSlug} NCERT PDFs`,
          `free ${cleanedSlug} study resources`,
          `chapter-wise ${cleanedSlug} videos`,
        ],
      };

    case "chapter":
      return {
        title: `${cleanedSlug} - NCERT Chapter Summary, Notes & PDFs `,
        description: `Detailed NCERT chapter: ${cleanedSlug}. Includes summary, notes, moral, assignments, and PDF download.`,
        keywords: [
          `${cleanedSlug} chapter NCERT`,
          `NCERT ${cleanedSlug} summary`,
          `${cleanedSlug} notes PDF download`,
          `${cleanedSlug} CBSE class chapter`,
        ],
      };

    default:
      return {
        title: "CourseWorld - Free NCERT Study Material for Class 5 to 12",
        description: "Explore free NCERT notes, CBSE syllabus, videos, and PDFs from Classes 5 to 12 for Maths, Science, and all major subjects.",
        keywords: [
          "NCERT study material",
          "Class 5 to 12 notes",
          "CBSE 2025 syllabus",
          "free study resources",
          "NCERT videos and PDFs",
        ],
      };
  }
}
