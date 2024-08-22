import { unstable_defineLoader as defineLoader } from '@remix-run/node';
import { Await, Form, useLoaderData } from '@remix-run/react';
import db, { schema } from 'db';
import { eq } from 'drizzle-orm';
import { Suspense } from 'react';

export const loader = defineLoader(async ({ params }) => {
  const post = db
    .select()
    .from(schema.user)
    .where(eq(schema.user.id, Number.parseInt(params.id!)))
    .then(p => p[0]);

  return { post };
});

export default function Page() {
  const { post } = useLoaderData<typeof loader>();
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Await resolve={post}>
        {post =>
          post && (
            <div>
              <p>{post.name}</p>
              <p>{post.email}</p>
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
                <button type='submit' className='btn'>
                  Delete
                </button>
              </Form>
            </div>
          )
        }
      </Await>
    </Suspense>
  );
}

export function ErrorBoundary() {
  return (
    <>
      <div>Error</div>
    </>
  );
}
