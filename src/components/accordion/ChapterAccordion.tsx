'use client'

import { useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface chapterDataType {
    _id?: string;
    subject_id: string;
    class_id: string;
    chapter_name: string;
    introduction?: string;
    summary?: string;
    moral?: string;
    video_url?: string;
    video_access?: 'free' | 'paid';
    assignment_access?: 'free' | 'paid';
    pdf?: File | string;
}

interface ChapterAccordionProps {
    chapterData: chapterDataType;
    chapterIndex: number;
}

export default function ChapterAccordion({ chapterData, chapterIndex }: ChapterAccordionProps) {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [videoLoaded, setVideoLoaded] = useState(false);

    const runVideo = (url: string) => {
        const videoId = url.split('/').pop();
        if (videoId) {
            setVideoUrl(`https://player.vimeo.com/video/${videoId}`);
        }
    };

    const closeModal = () => {
        setVideoUrl(null);
    };


    const runAssessment = (chapter_id: string) => {
        console.log(chapter_id);
    };

    const sections = [
        { type: "document", label: "Introduction", value: chapterData.introduction },
        { type: "document", label: "Summary", value: chapterData.summary },
        { type: "document", label: "Moral", value: chapterData.moral },
        { type: "document", label: "Q&A", value: chapterData.moral },
        {
            type: "video",
            label: "Video",
            value: chapterData.video_url,
            status: chapterData.video_access === "free" ? "Free" : "Paid",
            length: "20 Min",
        },
        {
            type: "document",
            label: "PDF",
            value: chapterData.pdf && typeof chapterData.pdf === "string",
            length: "15 pages"
        },
        {
            type: "MCQ",
            label: "Assessment",
            value: chapterData.assignment_access,
            status: chapterData.assignment_access === "free" ? "Free" : "Paid",
            link: "/validate-user?chapter_id=" + chapterData?._id + "&type=assessment"
        }
    ];

    return (
        <>
            <Accordion type="single" collapsible className="w-full mb-1">
                <AccordionItem value={chapterData._id || chapterData.chapter_name}>
                    <AccordionTrigger
                        style={{ fontSize: "17px", marginBottom: "0px" }}
                        className="flex align-items-center text-gray-500 font-medium bg-blue-50 py-2 px-3 mb-0"
                    >
                        <div>
                            <span className='font-semibold'>Chapter {chapterIndex}: </span> {chapterData.chapter_name}
                        </div>
                    </AccordionTrigger>

                    <AccordionContent className="space-y-2">
                        {sections.map((section, idx) => {
                            if (!section.value) return null;

                            return (
                                <div key={idx} className="flex justify-between py-1 border-1 items-center gap-2">
                                    <div className="flex items-center">
                                        <span className="px-3">{getIcon(section.type)}</span>
                                        <h6 style={{ fontSize: "14px" }} className="font-medium pt-2 items-center">
                                            {section.label}
                                            {section.status && (
                                                <span className="font-semibold text-green-600"> ({section.status})</span>
                                            )}
                                        </h6>
                                    </div>
                                    {section.type === 'video' ? (
                                        <div className="mx-3 flex items-center gap-2">
                                            <span className="text-sm text-gray-600">
                                                <i className="fa fa-clock text-secondary mr-1" />
                                                {section.length}
                                            </span>
                                            <div
                                                onClick={() => runVideo(section?.value as string)}
                                                className="text-blue-600 underline cursor-pointer text-sm hover:text-blue-800"
                                            >
                                                Play
                                            </div>
                                        </div>
                                    ) : section.length ? (
                                        <span className="px-3 text-sm text-gray-600">
                                            <i className="fa fa-clock text-secondary mr-1" /> {section.length}
                                        </span>
                                    ) : null}

                                    {section.type === 'MCQ' && chapterData.assignment_access === 'free' ? (
                                        <div className="mx-3 flex items-center gap-2">
                                            <div
                                                onClick={() => runAssessment(chapterData._id as string)}
                                                className="text-blue-600 underline cursor-pointer text-sm hover:text-blue-800"
                                            > Attemp MCQ
                                            </div>
                                        </div>
                                    ) : section.length ? (
                                        <span className="px-3 text-sm text-gray-600">
                                            <i className="fa fa-clock text-secondary mr-1" /> {section.length}
                                        </span>
                                    ) : null}


                                </div>
                            );
                        })}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* Video Modal */}
            {videoUrl && (
                <div
                    className="fixed inset-0 z-[1000] flex items-center justify-center bg-white bg-opacity-75"
                    onClick={closeModal}
                >
                    <div
                        className="relative w-full max-w-6xl aspect-video"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Spinner while loading */}
                        {!videoLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10">
                                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white" />
                            </div>
                        )}

                        <iframe
                            src={videoUrl}
                            title="Vimeo Video"
                            className="w-full h-full rounded-lg"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                            onLoad={() => setVideoLoaded(true)}
                        ></iframe>

                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 p-1 px-2 rounded"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

function getIcon(type: string) {
    switch (type) {
        case "document":
            return (
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="currentColor" />
                    <path d="M14 2v6h6" stroke="currentColor" />
                </svg>
            );
        case "video":
            return (
                <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="none">
                    <polygon points="23,7 16,12 23,17" fill="currentColor" />
                    <rect x="1" y="5" width="13" height="14" rx="2" ry="2" stroke="currentColor" />
                </svg>
            );
        case "audio":
            return (
                <svg className="w-5 h-5 text-green-600" viewBox="0 0 16 16" fill="none">
                    <path d="M2 12V8c0-3.3 2.9-6 6.4-6s6.4 2.7 6.4 6v4" stroke="currentColor" />
                    <path d="M14.8 12.7c0 .7-.6 1.3-1.4 1.3h-.7c-.8 0-1.4-.6-1.4-1.3v-2c0-.7.6-1.3 1.4-1.3h2.1v2.3zM2 12.7C2 13.4 2.6 14 3.3 14H4c.7 0 1.3-.6 1.3-1.3v-2c0-.7-.6-1.3-1.3-1.3H2v2.3z" stroke="currentColor" />
                </svg>
            );
        case "MCQ":
            return (
                <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            );
        default:
            return null;
    }
}
