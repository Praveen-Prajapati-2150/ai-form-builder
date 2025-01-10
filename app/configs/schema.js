// import { varchar } from "drizzle-orm/mysql-core";
import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  references,
  boolean,
} from 'drizzle-orm/pg-core';

export const JsonForms = pgTable('jsonForms', {
  id: serial('id').primaryKey(),
  uniqueId: varchar('uniqueId').notNull(),
  // uniqueId: varchar('uniqueId', { length: 6 }).notNull(),
  jsonform: text('jsonform').notNull(),

  theme: varchar('theme'),
  background: varchar('background'),
  style: varchar('style'),

  createdBy: varchar('createdBy').notNull(),
  createdAt: varchar('createdAt').notNull(),
  enableSignIn: boolean('enableSignIn').default(false),
  // added later
  // deleted: boolean('deleted').default(false), // Add deleted flag
});

export const userResponses = pgTable('userResponses', {
  id: serial('id').primaryKey(),
  // formId: varchar('formId'),
  // response: text('response'),
  jsonResponse: text('jsonResponse').notNull(),
  createdBy: varchar('createdBy').default('anonymous'),
  createdAt: varchar('createdAt').notNull(),
  formRef: integer('formRef').references(() => JsonForms.id),
  // formRef: integer('formRef').references(() => JsonForms.id, {
    // onDelete: 'cascade',
  // }), // Add onDelete: 'cascade'
});

// export const userResponses = pgTable('userResponses', {
//   id: serial('id').primaryKey(),
//   jsonResponse: text('jsonResponse').notNull(),
//   createdBy: varchar('createdBy').default('anonymous'),
//   createdAt: varchar('createdAt').notNull(),
//   formRef: integer('formRef').references(() => JsonForms.id, { onDelete: 'cascade' }), // Add onDelete: 'cascade'
// });
