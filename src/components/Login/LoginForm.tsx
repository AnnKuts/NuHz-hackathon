import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginForm() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading session...</div>;
  }

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user?.email || session.user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <p>Please sign in:</p>
      <button onClick={() => signIn("google", { callbackUrl: "/" })}>
        Continue with Google
      </button>
    </div>
  );
}
