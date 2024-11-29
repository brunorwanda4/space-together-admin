import AuthChangeTheme from "@/components/auth/nav/auth-theme";
import MyImage from "@/components/my-components/myImage";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <section className=" flex">
      <AuthChangeTheme />
      <MyImage className=" h-screen w-1/2" src="/images/1.jpg" />
      <div className=" items-center justify-center flex min-h-screen w-1/2">
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
