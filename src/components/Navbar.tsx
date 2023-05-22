import { FC } from 'react'
import Button from './ui/Button'
import { signOut, useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import Link from 'next/link'

interface NavbarProviderProps {
  session: Session
}

const Navbar: FC<NavbarProviderProps> = ({session}) => {
  return (
    
<nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link href="/" className="flex items-center">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">WardHunter</span>
    </Link>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      {session?.user ? (
                <Button
                  className="bg-teal-700 hover:bg-teal-500"
                  onClick={signOut}
                >
                  Deconnexion
                </Button>
              ) : (
                <div className="hidden sm:flex gap-1">
                  <Link
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                    href="/register"
                  >
                    Crée un compte
                  </Link>
                  <Link
                    className="bg-teal-700 hover:bg-teal-500 rounded-md px-5 py-2.5 text-sm font-medium dark:text-white dark:hover:text-white/75"
                    href="/login"
                  >
                    Se conecter
                  </Link>
                </div>
              )}
      </ul>
    </div>
  </div>
</nav>

  )
}

export default Navbar
