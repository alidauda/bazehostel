import { json, redirect } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

import { commitSession, getSession } from '~/session';
import { getRooms } from '~/servers/hostel';
import { Link, useLoaderData } from '@remix-run/react';
export async function loader({ params, request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const studentId = session.get('studentId') || null;
  const gender = session.get('gender') || null;
  if (!studentId && !gender) {
    return redirect('/login');
  }

  const beds = await getRooms(params.hostelId!, gender as string);

  return json(
    { beds },
    {
      headers: {
        // only necessary with cookieSessionStorage
        'Set-Cookie': await commitSession(session),
      },
    }
  );
}
export default function Hostels() {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  return (
    <Tabs defaultValue='account' className='xl:px-56  p-6'>
      <TabsList>
        <TabsTrigger value='account'>Account</TabsTrigger>
        <TabsTrigger value='password'>Password</TabsTrigger>
      </TabsList>
      <TabsContent value='account'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 p-2'>
          {data.beds.data &&
            data.beds.data.map((bed) => (
              <Link
                to={`/beds/${bed.HostelID}/${bed.FloorName}/${bed.RoomNo}`}
                className='rounded-lg overflow-hidden shadow-md'
                key={bed.EntryID}
              >
                <div className='px-4 py-2'>
                  <div className='font-bold text-lg mb-1'>{bed.RoomNo}</div>
                  <p className='text-gray-700 text-sm'>Wing :{bed.Wing}</p>
                </div>
                <div className='flex flex-wrap px-4 pt-2 pb-1'>
                  {bed.rooms.map((room) => (
                    <div
                      className={`rounded-lg overflow-hidden shadow-sm ${
                        room.Status === 'Reserved'
                          ? 'bg-yellow-200'
                          : room.Status === 'Occupied'
                          ? 'bg-gray-200'
                          : room.Status === 'Available'
                          ? 'bg-green-200'
                          : 'bg-red-200'
                      } m-1 p-1`}
                      key={room.EntryID}
                    >
                      <svg
                        className={` h-4 w-4 ${
                          room.Status === 'Reserved'
                            ? 'text-yellow-700'
                            : room.Status === 'Occupied'
                            ? 'text-gray-700'
                            : room.Status === 'Available'
                            ? 'text-green-700'
                            : 'text-red-700'
                        }`}
                        fill='none'
                        height='24'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        viewBox='0 0 24 24'
                        width='24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M2 4v16' />
                        <path d='M2 8h18a2 2 0 0 1 2 2v10' />
                        <path d='M2 17h20' />
                        <path d='M6 8v9' />
                      </svg>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
        </div>
      </TabsContent>
      <TabsContent value='password'>Change your password here.</TabsContent>
    </Tabs>
  );
}
