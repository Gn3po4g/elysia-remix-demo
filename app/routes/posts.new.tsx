import { unstable_defineAction as defineAction } from '@remix-run/node';
import { Form, redirect } from '@remix-run/react';
import { addPost, type Post } from '~/libs/api';

export const action = defineAction(async ({ request }) => {
  const formData = await request.formData();
  const post = Object.fromEntries(formData) as unknown as Post;

  const res = await addPost(post);

  return redirect(`/posts/${res.id}`);
});

export default function New() {
  return (
    <div className='p-12'>
      <Form className='space-y-4' method='post'>
        <label className='input input-bordered flex items-center gap-2'>
          <text className='w-24'>Title</text>
          <input type='text' className='grow' name='title' />
        </label>
        <label className='input input-bordered flex items-center gap-2'>
          <text className='w-24'>Body</text>
          <input type='text' className='grow' name='body' />
        </label>
        <button className='btn' type='submit'>
          Add
        </button>
      </Form>
    </div>
  );
}
