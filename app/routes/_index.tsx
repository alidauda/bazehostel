import type { LoaderFunctionArgs } from '@remix-run/node';
import { commitSession, getSession } from '~/session';
import { json, redirect } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getHostels } from '~/servers/hostel';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const studentId = session.get('studentId') || null;
  const gender = session.get('gender') || null;
  if (!studentId && !gender) {
    return redirect('/login');
  }
  const hostel = await getHostels(gender as string);

  return json(
    { hostel },
    {
      headers: {
        // only necessary with cookieSessionStorage
        'Set-Cookie': await commitSession(session),
      },
    }
  );
}

export default function Index() {
  const { hostel } = useLoaderData<typeof loader>();

  return (
    <div className='h-screen '>
      <Card className='grid gap-4 xl:px-56  p-6'>
        <CardHeader>
          <CardTitle>Hostel Listings</CardTitle>
          <CardDescription>
            Choose from our wide range of hostels
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-6'>
          {hostel.data?.map((data) => (
            <div
              className='border border-gray-200 rounded-lg p-4 dark:border-gray-800 shadow-lg bg-white dark:bg-gray-900'
              key={data.hostel.EntryID}
            >
              <h2 className='text-xl font-bold'>{data.hostel.HostelName}</h2>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Located in the heart of the city, Hostel A offers comfortable
                rooms and free Wi-Fi.
              </p>
              <ul className='mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400 grid grid-cols-2 gap-2 p-4 border border-gray-200 rounded-lg shadow-lg bg-white dark:bg-gray-900'>
                <li className='bg-green-100 dark:bg-green-700 p-2'>
                  <span className='font-semibold text-green-500 dark:text-green-300'>
                    Available Rooms:
                  </span>
                  {data.availableRooms}
                  {'\n            '}
                </li>
                <li className='bg-blue-100 dark:bg-blue-700 p-2'>
                  <span className='font-semibold text-blue-500 dark:text-blue-300'>
                    Available Beds:
                  </span>
                  {data.availableBed}
                  {'\n            '}
                </li>
                <li className='bg-gray-100 dark:bg-gray-700 p-2'>
                  <span className='font-semibold text-gray-700 dark:text-gray-500'>
                    Total Rooms:
                  </span>
                  {data.totalrooms}
                  {'\n            '}
                </li>
                <li className='bg-gray-100 dark:bg-gray-700 p-2'>
                  <span className='font-semibold text-gray-700 dark:text-gray-500'>
                    Total Beds:
                  </span>
                  {data.totalBed}
                  {'\n            '}
                </li>
                <li className='bg-yellow-100 dark:bg-yellow-700 p-2'>
                  <span className='font-semibold text-yellow-500 dark:text-yellow-300'>
                    Under Maintenance:
                  </span>
                  2{'\n            '}
                </li>
                <li className='bg-red-100 dark:bg-red-700 p-2'>
                  <span className='font-semibold text-red-500 dark:text-red-300'>
                    Occupied:
                  </span>
                  {data.occupied}
                  {'\n            '}
                </li>
                <li className='bg-purple-100 dark:bg-purple-700 p-2'>
                  <span className='font-semibold text-purple-500 dark:text-purple-300'>
                    Reserved:
                  </span>
                  {data.reserved}
                  {'\n            '}
                </li>
              </ul>
              <Link
                to={`/hostels/${data.hostel.HostelName}/${data.hostel.EntryID}`}
              >
                <div className='m-2'> View Details</div>
              </Link>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
