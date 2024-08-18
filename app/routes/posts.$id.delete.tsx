import { redirect, type ActionFunctionArgs } from '@remix-run/node';
import { deletePost } from '~/libs/api';

export const action = async ({ params }: ActionFunctionArgs) => {
  await deletePost(Number.parseInt(params.id ?? ''));
  return redirect('/posts');
};
