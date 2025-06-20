// utils/loadRazorpay.ts
export const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
        if (typeof window === 'undefined') return resolve(false);

        const existingScript = document.querySelector('#razorpay-script');
        if (existingScript) return resolve(true);

        const script = document.createElement('script');
        script.id = 'razorpay-script';
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);

        document.body.appendChild(script);
    });
};
