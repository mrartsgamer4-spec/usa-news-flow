import Link from "next/link";

interface LogoProps {
    compact?: boolean;
    isDarkBg?: boolean;
}

export default function Logo({ compact = false, isDarkBg = false }: LogoProps) {
    return (
        <Link href="/" className="inline-flex items-center gap-1.5 focus:outline-none">
            <div className={`font-black tracking-tighter uppercase select-none ${compact ? "text-xl" : "text-2xl md:text-3xl"}`}>
                <span className="bg-news-red text-white px-1.5 py-0.5 rounded-sm mr-1 shadow-sm">
                    USA
                </span>
                <span className={isDarkBg ? "text-white" : "text-news-black"}>
                    NEWS
                </span>
                <span className="text-news-red ml-1 font-extrabold tracking-widest text-xs md:text-sm uppercase border-b-2 border-news-red">
                    FLOW
                </span>
            </div>
        </Link>
    );
}