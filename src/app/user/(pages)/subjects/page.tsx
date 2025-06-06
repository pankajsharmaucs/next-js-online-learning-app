'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { checkUserClassAccess } from '@/utlis/checkClassAccess';
import { showErrorToast } from '@/components/alert/AlertToast';
import Link from 'next/link';
import Breadcrumbs from '@/components/user/breadcrum/Breadcrumbs';

interface Subject {
    _id: string;
    subject_name: string;
    image: string;
    class_id: string;
    createdAt: string;
}

export default function Page() {
    const searchParams = useSearchParams();
    const classId = searchParams.get('class_id');
    const class_name = searchParams.get('class_name');
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

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

            setAuthorized(true); // ✅ Allow page rendering
        };

        verifyAccess();
    }, [classId]);



    useEffect(() => {
        if (!classId) return;

        const fetchSubjects = async () => {
            try {
                const baseUrl = window.location.origin;
                const url = `${baseUrl}${process.env.NEXT_PUBLIC_ADMIN_GET_ALL_SUBJECT}?class_id=${classId}`;

                const res = await axios.get(url);
                // console.log(res.data);
                const allSubjects: Subject[] = res.data || [];
                setSubjects(allSubjects); // Already filtered by class_id on server
            } catch (err) {
                console.error("Error fetching subjects:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, [classId]);

    if (!classId) {
        return <div className="p-6 text-red-600">Missing class ID in URL.</div>;
    }

    if (!authorized) {
        return <div className="p-4 text-center">Verifying access...</div>;
    }


    return (
        <div className="max-w-10xl mx-auto " >
            <Card className="backdrop-blur-md bg-white/5 shadow-xl border border-white/10 p-4 rounded-2xl" style={{ padding: "10px" }} >

                <div className='col-12 '>
                    <Breadcrumbs
                        titles={['All Classes', class_name || 'All Subjects']}
                        links={[
                            '/user/classes',
                        ]}
                    />
                </div>

                <h2 className="text-2xl font-bold mb-4">📚 All Subjects of Class : {class_name}</h2>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-40 rounded-xl" />
                        ))}
                    </div>
                ) : subjects.length === 0 ? (
                    <p className="text-muted-foreground">No subjects found for this class.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {subjects.map((subject) => (
                            <div
                                key={subject._id}
                                className="flex flex-col justify-between bg-white/10 backdrop-blur-md border
                                 border-white/20 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300"
                                style={{ padding: "3px" }}
                            >
                                {/* Subject Image */}
                                <div className="mb-4 w-100 h-40 rounded-lg   ">
                                    <img
                                        src={subject.image}
                                        alt={subject.subject_name}
                                        className="object-cover w-full h-full"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Subject Name */}
                                <h5 style={{ padding: "10px" }} className="text-lg text-center font-bold mb-2 text-dark">{subject.subject_name}</h5>

                                {/* Open Chapter Button */}
                                <Link
                                    href={`/user/chapters?class_id=${subject.class_id}&subject_id=${subject._id}&subject_name=${encodeURIComponent(subject.subject_name)}&class_name=${encodeURIComponent(class_name || '')}`}
                                    className="mb-20 mt-0 cp p-20 px-3" >
                                    <Button variant="outline" className="py-4 w-full rounded-xl  flex justify-center" >
                                        Open Chapter(s)
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>


                )}


            </Card>
        </div>
    );
}
