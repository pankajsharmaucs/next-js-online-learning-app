'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        // Start a timer: if route change takes longer than 120ms, set animation state
        timer = setTimeout(() => {
            setIsAnimating(true);
        }, 120);

        return () => {
            clearTimeout(timer);
            if (isAnimating) {
                setIsAnimating(false);
            }
        };
    }, [pathname]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
