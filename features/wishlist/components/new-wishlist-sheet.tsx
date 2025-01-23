import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewWish } from "../hooks/use-new-wish";
import { WishlistForm } from "./wishlist-form";
import { insertWishlistSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateWish } from "../api/use-create-wishlist";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertWishlistSchema.omit({
  id: true,
  userId: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewWishSheet = () => {
  const { isOpen, onClose } = useNewWish();

  const mutation = useCreateWish();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
        onSuccess: () => {
            onClose()
        }
    })
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Wish</SheetTitle>
          <SheetDescription>
            Create a new wish to organize your transactions.
          </SheetDescription>
        </SheetHeader>
        <WishlistForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
        />
      </SheetContent>
    </Sheet>
  );
};
