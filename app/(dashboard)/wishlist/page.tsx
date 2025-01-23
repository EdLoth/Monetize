"use client";
import { useEffect } from "react";
import { Loader2, Plus } from "lucide-react";


import { columns } from "./columns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";

import { useNewWish } from "@/features/wishlist/hooks/use-new-wish";
import { useGetWishlist } from "@/features/wishlist/api/use-get-wishlists";
import { useBulkDeleteWish } from "@/features/wishlist/api/use-bulk-delete-wishlists";

const WishlistPage = () => {
  useEffect(() => {
    document.title = "Monetize - Categories Page";
  }, []);

  const newWish = useNewWish();
  const deleteWishlist = useBulkDeleteWish();
  const wishlistQuery = useGetWishlist();
  const wishlist = wishlistQuery.data || [];

  const isDisabled = wishlistQuery.isLoading || deleteWishlist.isPending;

  if (wishlistQuery.isLoading) {
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full flex items-center justify-center">
            <Loader2 className="size-6 text-slate-300 animate-spin" />
          </div>
        </CardContent>
      </Card>
    </div>;
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Wishlist page</CardTitle>
          <Button onClick={newWish.onOpen} size="sm" className="w-full lg:w-auto">
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={wishlist}
            filterKey="title"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteWishlist.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default WishlistPage;
