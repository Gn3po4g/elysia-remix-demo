import { Elysia } from 'elysia';
import * as build from 'build/server';
import { createRequestHandler, type ServerBuild } from '@remix-run/node';

const remixHandle = createRequestHandler(build as unknown as ServerBuild);

new Elysia()
  .all('*', async ({ request }) => {
    const path = new URL(request.url).pathname;
    const file = Bun.file(`build/client${path}`);
    if (await file.exists()) return file;
    return remixHandle(request);
  })
  .listen(3000);
