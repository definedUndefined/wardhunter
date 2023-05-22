import Button from '@/components/ui/Button'
import { GetServerSideProps } from 'next'
import { getSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)

  // met à jour l'état isDisabled en fonction des valeurs des mots de passe password et confirmPassword
  useEffect(() => {
    if(password !== '' && confirmPassword !== '') {
      setIsDisabled(password !== confirmPassword);

    }
  }, [password, confirmPassword]);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.target as HTMLFormElement)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: form.get('email'),
          password: form.get('password'),
          username: form.get('username'),
        }),
      })

      console.log(await response.json())

      if (!response.ok) {
        const data = await response.json()
        console.log(data)
      }
      signIn('credentials', {
        email: form.get('email'),
        password: form.get('password'),
        username: form.get('username'),
        callbackUrl: '/',
      })
    } catch (error) {
      // Gérer les erreurs de connexion ou autres erreurs
    }
  }

  return (
    <section>
      <div className="h-screen flex items-center justify-center bg-[#03000e] bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(/register.jpg)`}}>
      <div className="absolute inset-0 bg-black/45 sm:bg-transparent sm:bg-gradient-to-l sm:from-black/90 sm:to-black-600/10"></div>

        <div className="relative flex flex-col rounded-xl bg-clip-border text-white shadow-lg border border-transparent p-8 bg-black/50">
          <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            Crée votre compte
          </h4>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-4 flex flex-col gap-6">
            <div className="relative h-11 w-full min-w-[200px]">
                <input
                  className="peer h-full w-full rounded-md border border-blue-gray-200  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-700 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  name="username"
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-700 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-teal-700 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-teal-700 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-teal-700 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Nom d'utilisateur
                </label>
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  className="peer h-full w-full rounded-md border border-blue-gray-200  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-700 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  name="email"
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-teal-700 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-teal-700 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-teal-700 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Email
                </label>
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  type="password"
                  className="peer h-full w-full rounded-md border border-blue-gray-200  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-700 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  name="password"
                  placeholder=" "
                  value={password}
                  onChange={handlePasswordChange}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-teal-700 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-teal-700 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-teal-700 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Password
                </label>
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  type="password"
                  className="peer h-full w-full rounded-md border border-blue-gray-200  bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-teal-700 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-teal-700 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-teal-700 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-teal-700 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Confirm Password
                </label>
              </div>
            </div>
            <div className="inline-flex items-center"></div>
            <Button
              className="bg-teal-700 hover:bg-teal-500"
              type="submit"
              isLoading={isLoading ?? undefined}
              disabled={isDisabled}
            >
              Register
            </Button>
            <Link href="/" className="ml-2 text-sm text-slate-300 hover:underline">Retour à l'accueil</Link>
          </form>
        </div>
      </div>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
