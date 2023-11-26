import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useSigninMutation } from "../../redux/api/authApi";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "universal-cookie";
import { setCredentials } from "../../redux/authSlice";
import RHFProvider from "../../components/hook-form/RHFProvider";

const SigninSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
};

const cookies = new Cookies();

export default function SignInPage() {
  const [signinMutation] = useSigninMutation();
  const [buttonLoading, setButtonLoading] = useState(false);

  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(SigninSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    setButtonLoading(true);
    signinMutation({ data })
      .unwrap()
      .then((res) => {
        dispatch(
          setCredentials({
            ACCESS_TOKEN: res.access_token,
            REFRESH_TOKEN: res.refresh_token,
          })
        );
        cookies.set("access_token", res.access_token, {
          path: "/",
        });
        cookies.set("refresh_token", res.refresh_token, {
          path: "/",
        });
        window.location.href = "/";
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="container py-8 px-4 mx-auto max-w-screen lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex flex-col justify-center">
            <div className="flex flex-row gap-5 items-center xl:justify-start lg:justify-start md:justify-center sm:justify-center max-[640px]:justify-center">
              <img src="/logo.png" alt="Logo" width={40} height={40} />
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-textColor md:text-5xl lg:text-6xl">Welcome Back!</h1>
            </div>
            <p className="mb-4 mt-2 text-lg font-normal text-gray-500 lg:text-xl xl:text-start lg:text-start md:text-center sm:text-center max-[640px]:text-center">Let us sign you in</p>
            <Link to={"/"} className="text-textColor hover:underline font-medium text-lg inline-flex items-center xl:justify-start lg:justify-start md:justify-center sm:justify-center max-[640px]:justify-center">
              Back to Home
              <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </Link>
          </div>
          <div>
            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl">
              <h2 className="text-2xl font-bold text-textColor">Sign In to Your Account</h2>
              <RHFProvider>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-textColor">
                    Your email
                  </label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-textColor text-sm rounded-lg-blue-500 block w-full p-2.5" placeholder="name@gmail.com" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-textColor">
                    Your password
                  </label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-textColor text-sm rounded-lg block w-full p-2.5" required />
                </div>
                {/* <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3" required />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="font-medium text-gray-500">
                      Remember this device
                    </label>
                  </div>
                  <a href="#" className="ml-auto text-sm font-medium text-primary hover:underline">
                    Forgot Password?
                  </a>
                </div> */}
                <button type="submit" className="w-full px-5 py-3 text-base font-medium text-center bg-primary hover:bg-text-green-700 text-white bg-backgroundAbout rounded-lg focus:ring-4 focus:ring-blue-300 sm:w-auto">
                  Sign in your account
                </button>
                <div className="text-sm font-medium text-gray-900">
                  {`Don't have account? `}
                  <a className="text-primary hover:underline" href="/signup">
                    Sign up your account
                  </a>
                </div>
              </RHFProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
