import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.wishlist)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.wishlist)[":id"]["$patch"]
>["json"];

export const useEditWish = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.wishlist[":id"]["$patch"]({
        param: { id },
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Wishlist updated");
      queryClient.invalidateQueries({ queryKey: ["wish", { id }] });
      queryClient.invalidateQueries({ queryKey: ["wishlists"] });

      //TODO: Invalidate sumary and transactions
    },
    onError: () => {
      toast.error("Failed to edit wishlist");
    },
  });

  return mutation;
};
