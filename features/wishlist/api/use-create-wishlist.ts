import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.wishlist.$post>
type RequestType = InferRequestType<typeof client.api.wishlist.$post>["json"];

export const useCreateWish = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.wishlist.$post({ json })
            return await response.json()
        },
        onSuccess: () => {
            toast.success("Wishlist created")
            queryClient.invalidateQueries({ queryKey:  ["wishlists"] })
        },
        onError: () => {
            toast.error("Failed to create wishlist")
        },
    })

    return mutation
}