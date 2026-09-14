'use client';

import { useEffect, useRef } from 'react';

export default function AdsterraBanner() {
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!bannerRef.current) return;

        // Container Div
        const container = document.createElement('div');
        container.id = 'container-c3c4a23ccdd3aba522d7528999e859b5';

        // Adsterra Script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://pl31333594.profitableratecpmnetwork.com/c3c4a23ccdd3aba522d7528999e859b5/invoke.js';
        script.async = true;
        script.setAttribute('data-cfasync', 'false');

        bannerRef.current.innerHTML = '';
        bannerRef.current.appendChild(container);
        bannerRef.current.appendChild(script);
    }, []);

    return (
        <div className="w-full flex justify-center items-center py-4 bg-gray-50 border-t border-gray-200">
            <div ref={bannerRef} className="min-h-[90px] w-full flex justify-center items-center" />
        </div>
    );
}