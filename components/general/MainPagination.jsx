'use client';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

export default function MainPagination({ currentpage, totalpages }) {

    const searchParams = useSearchParams();
    const router = useRouter();
    function handlePageChange(Page) {

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", Page.toString());
        router.push(`?${params.toString()}`);

    }

    function generatePaginationItems() {
        const items = [];

        if (totalpages <= 5) {
            for (let i = 1; i <= totalpages; i++) {
                items.push(i)
            }
        } else {
            if (currentpage <= 3) {
                for (let i = 1; i <= 3; i++) {
                    items.push(i)
                }
                items.push(null)
                items.push(totalpages)
            } else if (currentpage >= totalpages - 2) {
                items.push(1)
                items.push(null)
                for (let i = totalpages - 2; i <= totalpages; i++) {
                    items.push(i)
                }
            } else {
                items.push(1)
                items.push(null)
                items.push(currentpage - 1)
                items.push(currentpage)
                items.push(currentpage + 1)
                items.push(null)
                items.push(totalpages)
            }
        }
        return items;
    }
        return (
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={(e) => {
                            e.preventDefault();
                            if (currentpage > 1) handlePageChange(currentpage - 1);
                        }}
    
                            className={currentpage === 1 ? 'pointer-events-none opacity-50' : ""}
                        />
                    </PaginationItem>
                    {
                        generatePaginationItems().map((page, index) => (
                            page === null ? (
    
                                <PaginationItem key={index}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            ) : (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(page)
                                        }}
                                        isActive={page === currentpage}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        ))
                    }
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentpage < totalpages) handlePageChange(currentpage + 1);
                            }}
                            className={currentpage === totalpages ? 'pointer-events-none opacity-50' : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
    
        )
    }