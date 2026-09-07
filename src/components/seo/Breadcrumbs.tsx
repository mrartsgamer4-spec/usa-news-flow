import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    if (!items || items.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className="py-2 mb-4">
            <ol className="flex items-center flex-wrap space-x-2 text-xs sm:text-sm text-gray-500">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={item.url || index} className="flex items-center">
                            {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                            {isLast ? (
                                <span className="font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-md" aria-current="page">
                                    {item.name}
                                </span>
                            ) : (
                                <Link href={item.url} className="hover:text-red-600 transition-colors">
                                    {item.name}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}