import { unstable_defineAction as defineAction } from '@remix-run/node';
import { Form, redirect } from '@remix-run/react';
import * as api from '~/libs/api';

export const action = defineAction(async ({ request }) => {
  const formData = await request.formData();
  const pizza = Object.fromEntries(formData) as unknown as Post;

  const res = await api.addPizza(pizza);

  return redirect(`/pizzas/${res.id}`);
});

export default function New() {
  return (
    <div className='p-12'>
      <Form className='space-y-4' method='post'>
        <label className='input input-bordered flex items-center gap-2'>
          <text className='w-24'>Name</text>
          <input type='text' className='grow' name='name' />
        </label>
        <label className='input input-bordered flex items-center gap-2'>
          <text className='w-24'>Description</text>
          <input type='text' className='grow' name='description' />
        </label>
        <button className='btn' type='submit'>
          Add
        </button>
      </Form>
    </div>
  );
}
