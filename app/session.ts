// app/sessions.ts
import { createCookieSessionStorage } from '@remix-run/node'; // or cloudflare/deno

type SessionData = {
  studentId: string;
  studentName: string;
  gender: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: '__session',

      // all of these are optional

      // Expires can also be set (although maxAge overrides it when used in combination).
      // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
      //
      // expires: new Date(Date.now() + 60_000),
      httpOnly: false,
      maxAge: 1000 * 60 * 60,
      path: '/',

      secrets: ['s3cret1'],
      secure: false,
    },
  });

export { getSession, commitSession, destroySession };
