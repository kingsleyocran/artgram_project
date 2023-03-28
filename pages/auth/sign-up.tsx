import React from "react";
import Image from "next/image";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import CustomHead from "../../components/CustomHead";
import { useAuth } from "../../context/AuthContext";
import { fetchUserFunction } from "../../redux/features/users/actions";
import { useAppSelector, useAppDispatch } from "../../redux/app/hooks";
import * as userRedux from "../../redux/features/users";

import GoogleIcon from "../../public/assets/icons/social_google.svg";

interface SignupType {
  name: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const userState = useAppSelector(userRedux.reducer.selectUser);
  const loadingState = useAppSelector(userRedux.reducer.selectUserLoadingState);

  const { signUpWithEmail, signInWithGoogle } = useAuth();

  const methods = useForm<SignupType>({ mode: "onBlur" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: SignupType) => {

    //todo: handle loading state here
    try {
      const user = await signUpWithEmail(data.email, data.password);
      if (user) {
        const userExits = await fetchUserFunction(user?.uid);

        if (userExits) {
          await dispatch(userRedux.actions.fetchUserAsync(user.uid));
        } else {
          dispatch(
            userRedux.actions.addNewUserAndFetch(
              {
                name: data.name,
                userID: user.uid,
                email: user.email,
                imageUrl: "",
                likedPosts: [],
                followers: [],
                following: [],
              },
              user.uid
            )
          );
        }
        //todo: handle loading state here

        router.push("/");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  async function signInWithGoogleHandler() {
    const user = await signInWithGoogle();

    //todo: handle loading state here
    if (user) {
      const userExits = await fetchUserFunction(user?.uid);

      if (userExits) {
        await dispatch(userRedux.actions.fetchUserAsync(user.uid));
      } else {
        dispatch(
          userRedux.actions.addNewUserAndFetch(
            {
              name: user.displayName,
              userID: user.uid,
              email: user.email,
              imageUrl: user.photoURL,
              likedPosts: [],
              followers: [],
              following: [],
            },
            user.uid
          )
        );
      }

      //todo: handle loading state here

      router.push("/");
    }
  }

  return (
    <div className="absolute h-full w-full">
      <CustomHead title="Artgram - Sign Up" />

      <div className="flex h-full">
        {/* Image */}
        <div className="md:flex-1 relative bg-slate-500 lg:flex hidden">
          <Image
            src="/assets/images/signup.jpg"
            alt="signup picture"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Form */}
        <div className="flex-1 bg-[#0E0E0E]   h-full ">
          <div className=" h-full flex flex-col justify-center lg:px-24 px-8 ">
            <div className="flex flex-row justify-center">
              <div className="relative h-[60px] w-[60px] mb-4">
                <Image
                  src="/assets/brand/artgram-logo.png"
                  alt="Picture of the author"
                  fill
                />
              </div>
            </div>

            {/* Title */}
            <p className="text-2xl md:text-xl text-neutral-300 font-semibold mb-6 text-center">
              Create a new account
            </p>

            {/* Sign up Email and Password Form  */}
            <FormProvider {...methods}>
              <form
                action=""
                className="flex flex-col gap-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* Name */}
                <div>
                  <p className="text-lg md:text-sm text-neutral-500 font-medium mb-2">
                    Name*
                  </p>
                  <input
                    type="name"
                    {...register("name", {
                      required: "Name is required",
                    })}
                    placeholder="Enter your name"
                    className="text-lg md:text-sm text-white block px-3 py-3 mb-2 rounded-xl w-full border-transparent focus:border-transparent  focus:ring-0 bg-neutral-800   placeholder-neutral-500 outline-none ring-0 focus:placeholder-neutral-600 border-0"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm  font-medium mb-4">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <p className="text-lg md:text-sm text-neutral-500 font-medium mb-2">
                    Email*
                  </p>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                    placeholder="Enter email address"
                    className="text-lg md:text-sm text-white block px-3 py-3 mb-2 rounded-xl w-full border-transparent focus:border-transparent  focus:ring-0 bg-neutral-800   placeholder-neutral-500 outline-none ring-0 focus:placeholder-neutral-600 border-0"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm  font-medium mb-4">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <p className="text-lg md:text-sm text-neutral-500  font-medium mb-2">
                    Password(6 or more characters)*
                  </p>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: 8,
                    })}
                    placeholder="Enter password"
                    className="text-lg md:text-sm text-white block px-3 py-3 mb-2 rounded-xl w-full border-transparent focus:border-transparent  focus:ring-0 bg-neutral-800   placeholder-neutral-500 outline-none ring-0 focus:placeholder-neutral-600 border-0"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm  font-medium mb-4">
                      {errors.password.message}
                    </p>
                  )}
                  {errors.password?.type === 'minLength' && (
                    <p className="text-red-500 text-sm  font-medium mb-4">
                      Password needs to be 8 characters or more
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="bg-blue-600 rounded-xl text-lg md:text-sm text-white mt-6 px-20 py-3 w-full mb-7"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </FormProvider>

            {/* Already have an account?t  */}
            <div className="flex gap-1 text-white text-lg md:text-sm font-medium justify-center mb-10">
              <p>Already have an account?</p>
              <button
                className="text-blue-600 hover:underline"
                onClick={() => router.push("/auth/log-in")}
              >
                Log in
              </button>
            </div>

            <button
              className="bg-transparent gap-4 ring-1 w-full flex justify-center items-center text-white rounded-xl text-lg md:text-sm   py-3 "
              onClick={async () => {
                await signInWithGoogleHandler();
              }}
            >
              <GoogleIcon
                width="16"
                height="16"
                viewBox="0 0 22.376 22.376"
                color="white"
              />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
