import { signIn, signOut } from 'next-auth/react';
import { ChangeEvent, useState } from 'react';

export default function LoginPage() {
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email: form.get('email'), password: form.get('password'), username: form.get('username') }),
      });

      console.log(await response.json())

      if (!response.ok) {
        const data = await response.json();
        console.log(data)
        setError(data.error);
      }
      signIn('credentials', {email: form.get('email'), password: form.get('password'), username: form.get('username'), callbackUrl: '/'})
    } catch (error) {
      // Gérer les erreurs de connexion ou autres erreurs
      setError("Une erreur s'est produite lors de la communication avec le serveur.");
    }

  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input 
        type="email" 
        name="email"
         />
        <label htmlFor="username">Username</label>
        <input 
        type="username" 
        name="username"
         />
        <label htmlFor="password">Password</label>
        <input
          type="password"
         name="password"
        />
        {error && <p>{error}</p>}
        <button type="submit">Inscription</button>
      </form>
      {/* <button onClick={signOut}>Sing out</button> */}
    </section>
  );
}
