import { Flame } from "lucide-react";

interface NewsTickerProps {
    items: string[];
}

export default function NewsTicker({ items }: NewsTickerProps) {
    return (
        <div className="bg-news-lightGray border-y border-news-border py-2 px-4 flex items-center gap-3 overflow-hidden text-sm my-4 rounded-sm">
            <div className="bg-news-red text-white text-xs font-black uppercase tracking-wider px-2 py-1 rounded flex items-center gap-1 shrink-0">
                <Flame size={14} className="animate-bounce" />
                Breaking
            </div>
            <div className="overflow-hidden whitespace-nowrap w-full">
                <div className="inline-block animate-marquee font-semibold text-news-black">
                    {items.map((item, index) => (
                        <span key={index} className="mx-6 hover:text-news-red cursor-pointer">
                            • {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}