import { createRequestHandler, type ServerBuild } from '@remix-run/node';
import * as build from 'build/server';

const handler = createRequestHandler(build as unknown as ServerBuild);

Bun.serve({
  async fetch(request) {
    const pathname = new URL(request.url).pathname;
    const file = Bun.file(`build/client${pathname}`);
    return (await file.exists()) ? new Response(file) : handler(request);
  },
});
