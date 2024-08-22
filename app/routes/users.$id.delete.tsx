import { type ActionFunction, redirect } from '@remix-run/node';
import db, { schema } from 'db';
import { eq } from 'drizzle-orm';

export const action: ActionFunction = async ({ params }) => {
  await db.delete(schema.user).where(eq(schema.user.id, Number.parseInt(params.id!)));
  return redirect('/users');
};
