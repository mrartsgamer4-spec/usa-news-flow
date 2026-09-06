import Logo from "./Logo";
import TimeDisplay from "./TimeDisplay";
import Navigation from "./Navigation";
import { Search } from "lucide-react";
import Link from "next/link";

// সকল ক্যাটাগরি লিংক /category/ রুটের সাথে কানেক্ট করা হয়েছে
const navLinks = [
    { name: "Home", href: "/" },
    { name: "U.S. News", href: "/category/us-news" },
    { name: "Politics", href: "/category/politics" },
    { name: "World", href: "/category/world" },
    { name: "Business", href: "/category/business" },
    { name: "Technology", href: "/category/tech" },
    { name: "Health", href: "/category/health" },
    { name: "Sports", href: "/category/sports" },
    { name: "Entertainment", href: "/category/entertainment" },
    { name: "Opinion", href: "/category/opinion" },
];

export default function Header() {
    return (
        <header className="border-b border-news-border bg-white sticky top-0 z-40 shadow-sm">
            {/* Top Header Layout */}
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                <Logo />

                <div className="hidden md:flex items-center gap-6">
                    <TimeDisplay />
                    <Link
                        href="/search"
                        className="p-2 text-news-gray hover:text-news-red hover:bg-news-lightRed rounded-full transition"
                        aria-label="Search"
                    >
                        <Search size={20} />
                    </Link>
                </div>
            </div>

            {/* Red Navigation Bar */}
            <Navigation />
        </header>
    );
}