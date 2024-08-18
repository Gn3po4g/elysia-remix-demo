import { unstable_defineLoader as defineLoader } from '@remix-run/node';
import { Await, Form, Link, NavLink, Outlet, useLoaderData, useSubmit } from '@remix-run/react';
import { Suspense } from 'react';
import { getAllPosts } from '~/libs/api';

export const loader = defineLoader(async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const posts = await getAllPosts(q);

  return { posts, q };
});

export default function Index() {
  const { posts, q } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  return (
    <>
      <div className='flex min-h-screen'>
        <div className='max-w-120 shadow-sm bg-gray-100 rounded-lg b'>
          <h1>Remix Contacts</h1>
          <div className='flex space-x-4 px-2'>
            <Form
              id='search-form'
              onChange={event => {
                const isFirstSearch = q === null;
                submit(event.currentTarget, {
                  replace: !isFirstSearch,
                });
              }}
              role='search'
            >
              <input
                className='input input-bordered'
                aria-label='Search contacts'
                defaultValue={q || ''}
                id='q'
                name='q'
                placeholder='Search'
                type='search'
              />
              <div aria-hidden hidden={true} id='search-spinner' />
            </Form>
            <Link to={{ pathname: 'new', search: `?q=${q || ''}` }} className='btn btn-secondary'>
              New
            </Link>
          </div>
          <ul className='menu'>
            <Suspense fallback={<span className='loading loading-dots loading-sm mx-auto' />}>
              <Await resolve={posts}>
                {posts =>
                  posts.map(post => (
                    <li key={post.id}>
                      <NavLink
                        to={{
                          pathname: `${post.id}`,
                          search: `?q=${q || ''}`,
                        }}
                      >
                        {post.title}
                      </NavLink>
                    </li>
                  ))
                }
              </Await>
            </Suspense>
          </ul>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
