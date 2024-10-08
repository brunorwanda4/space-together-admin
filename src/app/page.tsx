import { LoginForm } from "@/components/forms/auth/loginForm";
import { AuthNav } from "@/components/nav/auth/authNav";
import { Logo } from "@/components/nav/logo";

export default function Home() {
  return (
    <div className="">
      <section className=" w-full min-h-screen h-screen p-2">
        <AuthNav />
        <div className="  justify-center items-center h-screen w-full flex">
          <div className=" flex items-center flex-col ">
            <Logo />
            <div className=" flex mt-4 flex-col items-center gap-2">
              <h2 className=" font-medium text-2xl">Space Together <span className=" font-bold">Administration!</span></h2>
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
