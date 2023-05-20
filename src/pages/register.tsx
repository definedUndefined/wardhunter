import { signIn, signOut } from 'next-auth/react';
import { ChangeEvent, useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, password, username: 'aymane' }),
      });

      console.log(await response.json())

      if (!response.ok) {
        const data = await response.json();
        setError(data.error);
      }
      signIn('credentials', {email: email , password: password, callbackUrl: '/'})
    } catch (error) {
      // Gérer les erreurs de connexion ou autres erreurs
      setError("Une erreur s'est produite lors de la communication avec le serveur.");
    }

    setEmail('');
    setPassword('');
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" value={email} onChange={handleEmailChange} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {error && <p>{error}</p>}
        <button type="submit">Inscription</button>
      </form>
      {/* <button onClick={signOut}>Sing out</button> */}
    </section>
  );
}
