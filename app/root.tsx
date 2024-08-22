import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import '~/tailwind.css';

export default function App() {
  return (
    <html lang='zh'>
      <head>
        <Meta />
        <Links />
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
