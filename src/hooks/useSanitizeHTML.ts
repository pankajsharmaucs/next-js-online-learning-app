'use client';

import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

const useSanitizeHTML = (rawHTML: string): string => {
  const [sanitizedHTML, setSanitizedHTML] = useState<string>('');

  useEffect(() => {
    if (rawHTML) {
      const cleanHTML = DOMPurify.sanitize(rawHTML);
      setSanitizedHTML(cleanHTML);
    } else {
      setSanitizedHTML('');
    }
  }, [rawHTML]);

  return sanitizedHTML;
};

export default useSanitizeHTML;
