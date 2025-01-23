import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { WishlistForm } from "./wishlist-form";
import { insertWishlistSchema } from "@/db/schema";
import { z } from "zod";
import { useOpenWish } from "../hooks/use-open-wish";
import { useGetWish } from "../api/use-get-wishlist";
import { Loader2 } from "lucide-react";
import { useEditWish } from "../api/use-edit-wishlist";
import { useDeleteWish } from "../api/use-delete-wishlist";
import { useConfirm } from "@/hooks/use-confirm";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertWishlistSchema.pick({
  title: true,
  amount: true,
  link: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditWishSheet = () => {
  const { isOpen, onClose, id } = useOpenWish();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you want to delete this wish?",
    "You are about to delete this wish."
  );

  const wishQuery = useGetWish(id);
  const editMutation = useEditWish(id);
  const deleteMutation = useDeleteWish(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;

  const isLoading = wishQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = wishQuery.data
    ? {
        title: wishQuery.data.title,
        amount: wishQuery.data.amount.toString(),
        link: wishQuery.data.link,
        status: wishQuery.data.status,
        date: wishQuery.data.date
          ? new Date(wishQuery.data.date)
          : new Date(),
      }
    : {
        title: "",
        amount: "",
        link: "",
        date: new Date(),
        status: ""
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Wish</SheetTitle>
            <SheetDescription>Edit an existing wish.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div
              className="absolute inset-0 flex items-center 
          justify-center"
            >
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <WishlistForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
