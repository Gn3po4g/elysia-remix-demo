const url = 'https://jsonplaceholder.typicode.com';

export const getAllPosts = (search: string | null) =>
	fetch(`${url}/posts${search ? `?q=${search}` : ''}`).then(
		r => r.json() as Promise<Post[]>,
	);

export const getPost = (id: number) =>
	fetch(`${url}/posts/${id}`).then(r => r.json() as Promise<Post>);