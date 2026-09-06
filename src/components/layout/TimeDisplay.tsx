"use client";

import { useEffect, useState } from "react";

export default function TimeDisplay() {
    const [timeString, setTimeString] = useState<string>("");
    const [dateString, setDateString] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();

            // America/New_York টাইমজোন অনুযায়ী ফরম্যাটিং
            const dateOptions: Intl.DateTimeFormatOptions = {
                timeZone: "America/New_York",
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
            };

            const timeOptions: Intl.DateTimeFormatOptions = {
                timeZone: "America/New_York",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
                timeZoneName: "short",
            };

            setDateString(now.toLocaleDateString("en-US", dateOptions));
            setTimeString(now.toLocaleTimeString("en-US", timeOptions));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!timeString) {
        return <div className="text-xs text-gray-400 h-4 w-32 animate-pulse bg-gray-200 rounded" />;
    }

    return (
        <div className="text-xs font-semibold text-news-gray flex items-center gap-2">
            <span className="hidden sm:inline">{dateString}</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-news-black font-mono bg-news-lightGray px-2 py-0.5 rounded border border-news-border">
                {timeString}
            </span>
        </div>
    );
}