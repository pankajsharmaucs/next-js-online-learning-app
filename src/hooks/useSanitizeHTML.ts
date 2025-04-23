// hooks/useSanitizeHTML.ts

import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

/**
 * Custom hook to sanitize raw HTML content
 * @param rawHTML The raw HTML content that needs to be sanitized
 * @returns sanitizedHTML The sanitized HTML content
 */
const useSanitizeHTML = (rawHTML: string | null): string => {
  const [sanitizedHTML, setSanitizedHTML] = useState<string>(''); // Initialize state with empty string

  useEffect(() => {
    if (rawHTML) {
      const cleanHTML = DOMPurify.sanitize(rawHTML);  // Sanitize the raw HTML content
      setSanitizedHTML(cleanHTML);  // Set sanitized HTML into state
    }
  }, [rawHTML]);  // Run whenever rawHTML changes

  return sanitizedHTML;  // Return sanitized HTML
};

export default useSanitizeHTML;
