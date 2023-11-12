import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { bookHostel, getBeds } from '~/servers/hostel';
import { getSession } from '~/session';

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'));
  const studentId = session.get('studentId') || null;
  const gender = session.get('gender') || null;
  if (!studentId && !gender) {
    return redirect('/login');
  }
  const formData = await request.formData();
  const bedNo = formData.get('bedNo');
  if (!bedNo) {
    return redirect(
      `/hostels/${params.hostelId}/${params.floor}/${params.roomId}`
    );
  }
  const book = bookHostel({
    studentId: studentId as string,
    hostelId: params.hostelId as string,
    floorName: params.floor as string,
    roomName: params.roomId as string,
    BedNo: bedNo as string,
  });

  return book;
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const studentId = session.get('studentId') || null;
  const gender = session.get('gender') || null;
  if (!studentId && !gender) {
    return redirect('/login');
  }
  const beds = await getBeds(
    params.hostelId as string,
    params.floor as string,
    params.roomId as string
  );
  return json(beds);
}
export default function Component() {
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center p-10 bg-gray-100 dark:bg-gray-800'>
      <h1 className='text-4xl font-bold mb-10 text-gray-800 dark:text-gray-100'>
        Choose Your Bed
      </h1>
      <div className='grid grid-cols-2 gap-10'>
        {data.data &&
          data.data.map((bed) => (
            <div
              className='w-full h-full border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden shadow-lg p-6 flex flex-col items-center justify-center bg-white dark:bg-gray-900'
              key={bed.BedNo}
            >
              <div className='mb-4 w-full flex justify-center'>
                <svg
                  className=' text-zinc-600 dark:text-zinc-300 h-12 w-12'
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
              <div className='w-[200px] h-[200px]  bg-gray-200 justify-center flex items-center text-5xl '>
                {bed.RoomNo}
              </div>
              <h2 className='text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100'>
                {bed.BedNo}
              </h2>
              <p
                className={`text-xl mb-4 ${
                  bed.Status === 'Reserved'
                    ? 'text-yellow-700'
                    : bed.Status === 'Occupied'
                    ? 'text-gray-700'
                    : bed.Status === 'Available'
                    ? 'text-green-700'
                    : 'text-red-700'
                }`}
              >
                This bed is currently {bed.Status}
              </p>
              <fetcher.Form method='post'>
                <Button
                  className='text-zinc-600 dark:text-zinc-300'
                  size='lg'
                  disabled={bed.Status !== 'Available'}
                  variant='outline'
                  name='bedNo'
                  value={bed.BedNo}
                >
                  Book Now
                </Button>
              </fetcher.Form>
            </div>
          ))}
      </div>
    </div>
  );
}
