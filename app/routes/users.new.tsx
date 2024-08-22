import { type ActionFunction, redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import db, { schema } from 'db';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const user = Object.fromEntries(formData) as typeof schema.user.$inferInsert;

  const res = await db.insert(schema.user).values(user).returning({ insertedId: schema.user.id });

  return redirect(`/users/${res[0].insertedId}`);
};

export default function New() {
  return (
    <div className='p-12'>
      <Form className='space-y-4' method='post'>
        <label className='input input-bordered flex items-center gap-2'>
          <text className='w-24'>Name</text>
          <input type='text' className='grow' name='name' />
        </label>
        <label className='input input-bordered flex items-center gap-2'>
          <text className='w-24'>Email</text>
          <input type='text' className='grow' name='email' />
        </label>
        <button className='btn' type='submit'>
          Add
        </button>
      </Form>
    </div>
  );
}
