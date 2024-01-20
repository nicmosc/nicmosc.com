import { LoginButton } from '../../components';
import { handleLogin } from '../actions';
import { auth } from '../auth';

export default async function Page() {
  const session = await auth();

  if (session != null) {
    return <div>You are logged in as {session?.user?.email}</div>;
  }

  return (
    <div className="flex p-56">
      <LoginButton onClick={handleLogin} />
    </div>
  );
}
