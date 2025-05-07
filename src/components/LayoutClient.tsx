'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isFirstRender = useRef(true);
    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        if (isFirstRender.current) {
            // Skip animation on first load
            isFirstRender.current = false;
            setShouldAnimate(false);
        } else {
            setShouldAnimate(true);
        }
    }, [pathname]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={shouldAnimate ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
