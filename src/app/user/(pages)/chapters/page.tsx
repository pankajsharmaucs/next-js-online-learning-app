'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { checkUserClassAccess } from '@/utlis/checkClassAccess';
import { showErrorToast } from '@/components/alert/AlertToast';
import Breadcrumbs from '@/components/user/breadcrum/Breadcrumbs';
import { Poppins } from 'next/font/google';

interface Chapter {
    _id: string;
    chapter_name: string;
    introduction?: string;
    summary?: string;
    moral?: string;
    pdf?: string;
    video_url?: string;
    video_access?: 'free' | 'paid';
    assignment_access?: 'free' | 'paid';
    createdAt: string;
}

const poppins = Poppins({
  weight: ['600', '700'],
  subsets: ['latin'],
});

export default function Page() {
    const searchParams = useSearchParams();
    const classId = searchParams.get('class_id');
    const subjectId = searchParams.get('subject_id');
    const subjectName = searchParams.get('subject_name');
    const class_name = searchParams.get('class_name');

    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyAccess = async () => {
            if (!classId) {
                showErrorToast("Missing class ID in URL");
                router.push("/user/dashboard");
                return;
            }

            const hasAccess = await checkUserClassAccess(classId);
            if (!hasAccess) {
                showErrorToast("You do not have access to this class");
                router.push("/user");
                return;
            }

            setAuthorized(true);
        };

        verifyAccess();
    }, [classId]);

    useEffect(() => {
        const fetchChapters = async () => {
            if (!classId || !subjectId) return;

            try {
                const baseUrl = window.location.origin;
                const url = `${baseUrl}${process.env.NEXT_PUBLIC_ADMIN_GET_ALL_CHAPTER}?class_id=${classId}&subject_id=${subjectId}`;

                const res = await axios.get(url);
                setChapters(res.data || []);
                // console.log(res.data);

            } catch (err) {
                console.error('Error fetching chapters:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchChapters();
    }, [classId, subjectId]);

    if (!authorized) {
        return <div className="p-4 text-center">Verifying access...</div>;
    }

    return (
        <div className="max-w-10xl mx-auto px-4 py-8">
            <Card className="backdrop-blur-md bg-white/5 shadow-xl border border-white/10 p-4 rounded-2xl">

                <div className='col-12 '>
                    <Breadcrumbs
                        titles={['All Classes', class_name || 'All Subjects', subjectName || 'All Chapters']}
                        links={[
                            '/user/classes',
                            `/user/subjects?class_id=${classId}&class_name=${class_name}&class_name=${classId}`,
                        ]}
                    />
                </div>

                <h2 className="text-2xl font-bold mb-6">📘 All Chapters of {subjectName}</h2>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-40 rounded-xl" />
                        ))}
                    </div>
                ) : chapters.length === 0 ? (
                    <p className="text-muted-foreground">No chapters available.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                        {chapters.map((chapter) => (
                            <div key={chapter._id} className="bg-white/10 border border-white/20 backdrop-blur-lg 
                            rounded-xl p-4 shadow-md flex flex-col justify-between">

                                <div style={{ padding: "10px" }} className={`text-2xl text-center text-capitalize 
                                font-bold mb-2 text-gray-700 ${poppins.className} `} >{chapter.chapter_name}</div>

                                <div className="mt-auto space-y-2">
                                    <Link href={'/user/start-learning?chapter_id=' + chapter._id + '&class_id=' + classId + '&subject_id=' + subjectId + '&subject_name=' + subjectName + '&class_name=' + class_name} >
                                        <Button variant="outline" className="w-full py-4">
                                            Start Learning
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
}
