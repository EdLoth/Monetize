import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/hono"

export const useGetWishlist = () => {
    const query = useQuery({
        queryKey: ["wishlists"],
        queryFn: async () => {
            const response = await client.api.wishlist.$get()

            if(!response.ok){
                throw new Error("Failed to fetch wishlist")
            }

            const { data } = await response.json()
            return data
        },
    })

    return query
}