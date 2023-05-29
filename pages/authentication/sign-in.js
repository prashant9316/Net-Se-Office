import SignInForm from '@/components/Authentication/SignInForm';
import PublicRoute from 'api/unLogged';

export default function SignIn() {
  return (
    <>
    <PublicRoute>
      <SignInForm />
      </PublicRoute>
    </>
  );
}
