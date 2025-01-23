import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

// Tabela de contas
export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});

export const accountsRelations = relations(accounts, ({ many }) => ({
  transactions: many(transactions),
}));

export const insertAccountSchema = createInsertSchema(accounts);

// Tabela de categorias
export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  transactions: many(transactions),
}));

export const insertCategorySchema = createInsertSchema(categories);

// Tabela de transações
export const transactions = pgTable("transactions", {
  id: text("id").primaryKey(),
  amount: integer("amount").notNull(),
  payee: text("payee").notNull(),
  notes: text("notes"),
  date: timestamp("date", { mode: "date" }).notNull(),
  accountId: text("account_id")
    .references(() => accounts.id, {
      onDelete: "cascade",
    })
    .notNull(),
  categoryId: text("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
  type: text("type").notNull(),
  installments: text("installments"), // Número de parcelas, pode ser null para transações únicas ou fixas.
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  account: one(accounts, {
    fields: [transactions.accountId],
    references: [accounts.id],
  }),
  categories: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));

export const insertTransactionSchema = createInsertSchema(transactions, {
  date: z.coerce.date(),
});

// Tabela de achievements
export const achievements = pgTable("achievements", {
  id: text("id").primaryKey(),
  amountTotal: integer("amountTotal").notNull(),
  amountReceived: integer("amountReceived").notNull(),
  title: text("title").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  monthlyPayment: integer("monthlyPayment").notNull(), // Pagamento mensal
  paymentHistory: text("paymentHistory").notNull().default("[]"), // Histórico de pagamentos
  userId: text("user_id").notNull(),
});

// Schema de inserção para achievements
export const insertAchievementSchema = createInsertSchema(achievements, {
  createdAt: z.coerce.date(),
});

// Tabela de wishlists
export const wishlist = pgTable("wishlist", {
  id: text("id").primaryKey(),
  amount: integer("amount").notNull(),
  title: text("title").notNull(),
  link: text("link"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  userId: text("user_id").notNull(),
});

// Schema de inserção para wishlists
export const insertWishlistSchema = createInsertSchema(wishlist, {
  createdAt: z.coerce.date(),
});
