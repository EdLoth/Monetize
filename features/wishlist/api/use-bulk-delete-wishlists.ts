import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.wishlist)["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.wishlist)["bulk-delete"]["$post"]
>["json"];

export const useBulkDeleteWish = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.wishlist["bulk-delete"]["$post"]({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Wishlist deleted");
      queryClient.invalidateQueries({ queryKey: ["wishlists"] });
      // TODO: Also invalidate summary 
    },
    onError: () => {
      toast.error("Failed to delete wishlists");
    },
  });

  return mutation;
};