import { Link } from '@remix-run/react';

export default function NavBar() {
  return (
    <header className='flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow'>
      <Link className='flex items-center' to='/'>
        <img
          alt='Logo'
          className='rounded-full'
          height='50'
          src='/Logo_of_Baze_University_Abuja,_Nigeri.png'
          style={{
            aspectRatio: '50/50',
            objectFit: 'cover',
          }}
          width='50'
        />
        <span className='ml-2 text-lg font-semibold text-gray-700 dark:text-white'>
          Logo
        </span>
      </Link>
      <nav className='space-x-4'>
        <Link
          className='text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100'
          to='/'
        >
          Home
        </Link>
        <Link
          className='text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100'
          to='/application'
        >
          Applications
        </Link>

        <Link
          className='text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100'
          to='#'
        >
          Logout
        </Link>
      </nav>
    </header>
  );
}
