import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable(
  'user',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name'),
    email: text('email').unique(),
  },
  t => ({
    nameX: index('nameX').on(t.name),
  }),
);
