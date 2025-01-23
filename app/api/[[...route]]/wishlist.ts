import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { and, eq, inArray } from "drizzle-orm";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

import { wishlist, insertWishlistSchema } from "@/db/schema";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const data = await db
      .select({
        id: wishlist.id,
        title: wishlist.title,
        amount: wishlist.amount,
        link: wishlist.link
      })
      .from(wishlist)
      .where(eq(wishlist.userId, auth.userId));

    return c.json({ data });
  })
  .get(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const userId = auth.userId;

      const [data] = await db
        .select({
          id: wishlist.id,
          title: wishlist.title,
          link: wishlist.link,
          amount: wishlist.amount,
        })
        .from(wishlist)
        .where(and(eq(wishlist.userId, userId), eq(wishlist.id, id)));

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )
  .post(
      "/",
      clerkMiddleware(),
      zValidator(
        "json",
        insertWishlistSchema.pick({
          title: true,
          amount: true,
          link: true,
        })
      ),
      async (c) => {
        const auth = getAuth(c);
        const values = c.req.valid("json");
  
        if (!auth?.userId) {
          return c.json({ error: "Unauthorized" }, 401);
        }
  
        const [data] = await db
          .insert(wishlist)
          .values({
            id: createId(),
            userId: auth.userId,
            ...values,
          })
          .returning();
  
        return c.json({ data });
      }
    )
  
  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .delete(wishlist)
        .where(
          and(
            eq(wishlist.userId, auth.userId),
            inArray(wishlist.id, values.ids)
          )
        )
        .returning({
          id: wishlist.id,
        });

      return c.json({ data });
    }
  )
  .patch(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    zValidator(
      "json",
      insertWishlistSchema.pick({
        title: true,
        amount: true,
        link: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .update(wishlist)
        .set(values)
        .where(and(eq(wishlist.userId, auth.userId), eq(wishlist.id, id)))
        .returning();

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )
  .delete(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .delete(wishlist)
        .where(and(eq(wishlist.userId, auth.userId), eq(wishlist.id, id)))
        .returning({
          id: wishlist.id,
        });

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  );

export default app;
