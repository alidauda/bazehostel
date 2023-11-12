import { json, redirect } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { getHostelAllocation } from '~/servers/hostel';
import { getSession } from '~/session';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const studentId = session.get('studentId') || null;
  const gender = session.get('gender') || null;
  if (!studentId && !gender) {
    return redirect('/login');
  }

  const allocation = await getHostelAllocation(studentId as string);
  console.log(allocation);
  return json(allocation);
}

export default function Applicatins() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className='xl:px-56  p-6'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Id</TableHead>
            <TableHead>School Semeter</TableHead>
            <TableHead>Room No</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((data) => (
              <TableRow key={data.EntryID}>
                <TableCell className='font-medium'>{data.StudentID}</TableCell>
                <TableCell className='font-medium'>
                  {data.SchoolSemester}
                </TableCell>
                <TableCell className='font-medium'>{data.RoomNo}</TableCell>

                <TableCell
                  className={` ${
                    data.Status === 'Reserved'
                      ? 'text-yellow-700'
                      : data.Status === 'Occupied'
                      ? 'text-gray-700'
                      : data.Status === 'Available'
                      ? 'text-green-700'
                      : 'text-red-700'
                  }`}
                >
                  {data.Status}
                </TableCell>
                <TableCell>
                  <Button variant='destructive'>
                    <svg
                      className=' w-4 h-4'
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
                      <path d='M3 6h18' />
                      <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                      <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                    </svg>
                    <span className='sr-only'>Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
