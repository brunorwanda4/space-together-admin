import AuthLogo from '@/components/auth/auth-logo';
import { LoginForm } from '@/components/auth/forms/login-form';
import MyImage from '@/components/my-components/myImage';

const Page = () => {
  return (
    <div className="w-full justify-center flex">
      <div className="card bg-base-300 p-4 gap-4 shadow-xl">
        <AuthLogo />
        <LoginForm />
        <span className="justify-center flex items-center text-sm font-semibold text-wrap">
          Other providers
        </span>
        <div>
          <button className="btn btn-ghost w-full justify-start">
            <MyImage
              src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
              className="size-6"
            />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
