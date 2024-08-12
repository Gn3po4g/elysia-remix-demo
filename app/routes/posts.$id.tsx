import { unstable_defineLoader as defineLoader } from '@remix-run/node';
import { Await, Form, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';
import * as api from '~/libs/api';

export const loader = defineLoader(async ({ params }) => {
  const post = api.getPost(Number.parseInt(params.id ?? ''));

  return { post };
});

export default function Pizza() {
  const { post } = useLoaderData<typeof loader>();
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Await resolve={post}>
        {post => (
          <div>
            <p>{post.title}</p>
            <p>{post.body}</p>
            <Form
              action='delete'
              method='post'
              onSubmit={event => {
                const response = confirm('Please confirm you want to delete this record.');
                if (!response) {
                  event.preventDefault();
                }
              }}
            >
              {/* <button type='submit' className='btn'>
                Delete
              </button> */}
            </Form>
          </div>
        )}
      </Await>
    </Suspense>
  );
}
