import { Elysia } from 'elysia';
import { remix } from 'elysia-remix';

new Elysia().use(await remix()).listen(3000, console.log);
