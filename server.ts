import { Elysia } from 'elysia';
import { createRequestHandler, type ServerBuild } from '@remix-run/node';
import * as build from 'build/server/index';

const handler = createRequestHandler(build as unknown as ServerBuild, 'production');

new Elysia()
  .all('*', async context => {
    const url = new URL(context.request.url);

    const file = Bun.file(`build/client${url.pathname}`);

    return (await file.exists()) ? file : handler(context.request);
  })
  .listen(3000);
