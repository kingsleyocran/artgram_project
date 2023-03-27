import React from "react";
import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import imgPath from "../../assets/images/signup_image.png";
import logoPath from "../../assets/images/comma_logo.png";
import Image from "next/image";
import { useRouter } from "next/router";

function signUp({ providers }) {
  const router = useRouter();

  return (
    <div className="absolute h-full w-full">
      <div className="flex h-full">
        {/* Image */}
        <div className="flex-1 relative bg-slate-500 lg:flex hidden">
          <Image
            src={imgPath}
            alt="Picture of the author"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Form */}
        <div className="flex-1 bg-white  h-full ">
          <div className="flex flex-col items-center justify-center h-full">
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <div className="relative h-[50px] mb-10">
                  <Image
                    src={logoPath}
                    alt="Picture of the author"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>

                <p className="text-xl font-semibold mb-10 text-center">
                  Create a new Account
                </p>

                <p className="text-sm font-medium mb-1">Email</p>
                <input
                  placeholder="Enter email address"
                  class="text-md block px-3 py-3 mb-4 rounded-xl w-full 
                bg-gray-100   placeholder-gray-400 text-sm
                focus:placeholder-gray-500
                focus:border-gray-600  
                focus:outline-none "
                />

                <p className="text-sm font-medium mb-1">Password</p>
                <input
                  placeholder="Enter password"
                  class="text-md block px-3 py-3 mb-5 rounded-xl w-full 
                bg-gray-100   placeholder-gray-400 text-sm
                focus:placeholder-gray-500
                focus:border-gray-600  
                focus:outline-none "
                />

                <div>
                  <button className="bg-orange-400 shadow-md rounded-xl text-sm text-white px-20 py-3 w-full mb-5">
                    Sign up
                  </button>
                </div>

                <div className="flex gap-1 text-sm font-medium justify-center mb-10">
                    <p>Already have an account?</p>
                    <button className="text-red-600 hover:underline" onClick={()=> router.push('/auth/log-in')}>Log in</button>
                </div>

                <button
                  className="bg-white shadow-md rounded-xl text-sm  lg:px-28 px-20 py-3 "
                  onClick={() => SignIntoProvider(provider.id)}
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default signUp;
