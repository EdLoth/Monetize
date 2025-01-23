"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import {useConfirm} from "@/hooks/use-confirm";
import { useDeleteWish } from "@/features/wishlist/api/use-delete-wishlist";
import { useOpenWish } from "@/features/wishlist/hooks/use-open-wish";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm( 
  "Are you sure you want to delete this wish?",
  "You are about to delete this wish"
  );

  const deleteMutation = useDeleteWish(id);
  const { onOpen } = useOpenWish();

  const handleDelete = async () => {
    const ok = await confirm();

    if(ok) {
      deleteMutation.mutate()
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled={deleteMutation.isPending} onClick={() => onOpen(id)}>
            <Edit className="size-5 mr-2"/>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem disabled={deleteMutation.isPending} onClick={handleDelete}>
            <Trash className="size-5 mr-2"/>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};