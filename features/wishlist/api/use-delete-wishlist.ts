import { toast } from "sonner";
import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.wishlist)[":id"]["$delete"]
>;

export const useDeleteWish = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      const response = await client.api.wishlist[":id"]["$delete"]({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Wishlist deleted");
      queryClient.invalidateQueries({ queryKey: ["wish", { id }] });
      queryClient.invalidateQueries({ queryKey: ["wishlists"] });

      //TODO: Invalidate sumary and transactions
    },
    onError: () => {
      toast.error("Failed to delete wishlist");
    },
  });

  return mutation;
};
