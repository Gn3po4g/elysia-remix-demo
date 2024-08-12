import { redirect, unstable_defineAction as defineAction } from '@remix-run/node';
import { deletePizza } from '~/libs/api';

export const action = defineAction( async ({ params }) => {
	await deletePizza(Number.parseInt(params.id ?? ''));
	return redirect('/pizzas');
});
