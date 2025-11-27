"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate range around current page
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the start
      if (currentPage <= 3) {
        endPage = 4;
      }
      
      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }
      
      // Add ellipsis if needed
      if (startPage > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center gap-6 mt-16 mb-8">
      {/* Pagination Controls */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`group relative h-11 w-11 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 
                     backdrop-blur-sm border border-purple-200/50 dark:border-purple-500/30
                     hover:from-purple-500/20 hover:to-pink-500/20 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none
                     transition-all duration-300 ease-out flex items-center justify-center`}
        >
          <ChevronLeft className="h-5 w-5 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors" />
        </button>

        {/* Page Numbers */}
        <div className="flex gap-2">
          {pageNumbers.map((page, idx) => 
            page === '...' ? (
              <span
                key={`ellipsis-${idx}`}
                className="h-11 w-11 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold animate-pulse"
              >
                •••
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative h-11 min-w-[44px] px-4 rounded-xl font-semibold text-sm
                           transition-all duration-300 ease-out overflow-hidden
                           ${currentPage === page
                             ? `bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 text-white 
                                shadow-lg shadow-purple-500/50 dark:shadow-purple-400/40 scale-110 z-10
                                hover:shadow-xl hover:shadow-purple-500/60 hover:scale-115`
                             : `bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm 
                                border border-gray-200 dark:border-gray-700
                                text-gray-700 dark:text-gray-300
                                hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50
                                dark:hover:from-purple-900/30 dark:hover:to-pink-900/30
                                hover:border-purple-300 dark:hover:border-purple-600
                                hover:text-purple-700 dark:hover:text-purple-300
                                hover:scale-105 hover:shadow-md`
                           }`}
              >
                {/* Animated background for active page */}
                {currentPage === page && (
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                )}
                <span className="relative z-10">{page}</span>
              </button>
            )
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`group relative h-11 w-11 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 
                     backdrop-blur-sm border border-purple-200/50 dark:border-purple-500/30
                     hover:from-purple-500/20 hover:to-pink-500/20 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none
                     transition-all duration-300 ease-out flex items-center justify-center`}
        >
          <ChevronRight className="h-5 w-5 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors" />
        </button>
      </div>

      {/* Enhanced Page Info with Progress Bar */}
      <div className="flex flex-col items-center gap-3 w-full max-w-md">
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full transition-all duration-500 ease-out shadow-lg shadow-purple-500/50"
            style={{ width: `${(currentPage / totalPages) * 100}%` }}
          />
        </div>
        
        {/* Page Counter */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600 dark:text-gray-400">Page</span>
          <span className="px-3 py-1 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold shadow-md">
            {currentPage}
          </span>
          <span className="text-gray-600 dark:text-gray-400">of</span>
          <span className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold border border-gray-200 dark:border-gray-700">
            {totalPages}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
