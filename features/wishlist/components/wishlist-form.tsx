import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { insertWishlistSchema } from "@/db/schema";
import { convertAmountToMiliunits } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { AmountInput } from "@/components/amount-input2";

const formSchema = z.object({
  title: z.string(),
  amount: z.string(),
  link: z.string().nullable().optional(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const apiSchema = insertWishlistSchema.omit({
  id: true,
  userId: true
});


type FormValues = z.input<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>;


type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (data: ApiFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const WishlistForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (data: FormValues) => {
    const amount = parseFloat(data.amount.replace(",", "."));
    console.log(amount);
    const amountInMiliunits = convertAmountToMiliunits(amount);
    onSubmit({
      ...data,
      amount: amountInMiliunits,
    });
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Play, Mouse, Roupa, etc"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <AmountInput
                  {...field}
                  disabled={disabled}
                  placeholder="0.00"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="link"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wish Link</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Insert a wish link"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={disabled}>
          {id ? " Save changes " : " Create wish "}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full"
            variant="outline"
          >
            <Trash className="size-4 mr-2" />
            Delete wish
          </Button>
        )}
      </form>
    </Form>
  );
};
