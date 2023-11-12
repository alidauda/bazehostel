import { json, redirect } from '@remix-run/node';
import { Link, useActionData } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { login } from '~/servers/login';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { commitSession, getSession } from '~/session';
export async function action({ request }: ActionFunctionArgs) {
  const body: FormData = await request.formData();
  const email = body.get('email') as string;
  const session = await getSession(request.headers.get('Cookie'));
  const errors: { email?: string; error?: string } = {};
  if (!email || !email.includes('@')) {
    errors.email = 'Invalid email address';
  }

  const { error, user } = await login(email);
  if (error || !user) {
    errors.error = error;
  }
  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }
  session.set('studentId', user!.StudentID);
  session.set('gender', user!.Gender);
  return redirect(`/`, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}
export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const studentId = session.get('studentId') || null;
  if (studentId) {
    return redirect('/');
  }
  return json(
    { studentId },
    {
      headers: {
        // only necessary with cookieSessionStorage
        'Set-Cookie': await commitSession(session),
      },
    }
  );
}
export default function Login() {
  const actionData = useActionData<typeof action>();

  return (
    <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
      <div className='max-w-sm rounded-lg shadow-lg bg-white p-6 space-y-6 border border-gray-200 dark:border-gray-700'>
        <div className='space-y-2 text-center'>
          <h1 className='text-3xl font-bold'>Login</h1>
          <p className='text-zinc-500 dark:text-zinc-400'>
            By logging in, you accept our
            <Link className='text-blue-500 hover:text-blue-700' to='#'>
              terms
            </Link>
            and
            <Link className='text-blue-500 hover:text-blue-700' to='#'>
              privacy policy
            </Link>
            .{'\n                            '}
          </p>
        </div>
        <div className='space-y-4'>
          <form className='space-y-4' method='post'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                placeholder='m@example.com'
                required
                type='email'
                name='email'
              />
              {actionData?.errors?.email ? (
                <em>{actionData?.errors.email}</em>
              ) : null}
            </div>

            <Button
              className='w-full bg-black text-white'
              variant='outline'
              type='submit'
            >
              <div className='flex items-center justify-center'>Login</div>
            </Button>
            {actionData?.errors?.error ? (
              <em>{actionData?.errors.error}</em>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
