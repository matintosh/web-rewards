import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { v4 as uuidv4 } from 'uuid';

export const userSchema = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .default(sql.raw(`'${uuidv4()}'`)),
  twitchRef: text('twitch_ref').unique().notNull(),
  login: text('login').notNull(),
  displayName: text('display_name').notNull(),
  profileImageUrl: text('profile_image_url').notNull(),
  isStaff: integer('is_staff', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql.raw('CURRENT_TIMESTAMP')
  ),
});

export const bordersSchema = sqliteTable('borders', {
  id: text('id')
    .primaryKey()
    .default(sql.raw(`'${uuidv4()}'`)),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql.raw('CURRENT_TIMESTAMP')
  ),
  url: text('url').notNull(),
  name: text('name').notNull(),
  special: integer('special', { mode: 'boolean' }).default(false),
});

export const userBordersSchema = sqliteTable('user_borders', {
  id: text('id')
    .primaryKey()
    .default(sql.raw(`'${uuidv4()}'`)),
  userId: text('user_id')
    .notNull()
    .references(() => userSchema.id, { onDelete: 'cascade' }),
  borderId: text('border_id')
    .notNull()
    .references(() => bordersSchema.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql.raw('CURRENT_TIMESTAMP')
  ),
});
