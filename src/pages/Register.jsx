import React from "react";

const Register = () => {
  return (
    <>
  <div className="max-w-screen-2xl mx-auto p-5 px-10">
    <div className="flex flex-col lg:flex-row items-center justify-between">
      {/* Left section */}
      <div className="w-full lg:w-3/5 bg-[#f2f2f2] rounded-lg flex justify-center items-center mb-8 lg:mb-0">
        <div className="w-full overflow-hidden p-4 lg:p-8">
          <img
            src="https://f8n-production.imgix.net/worlds/arcea82yd.jpg?auto=format%2Ccompress&q=70&cs=srgb&w=2000&fit=fill&fnd_key=v1"
            alt="Art Market"
            className="w-full h-64 md:h-96 lg:h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="w-full lg:w-2/5 p-4 lg:p-8 lg:pl-12 flex flex-col justify-center">
        <form className="space-y-6" method="post" action="/signup">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 font-graphik">Sign Up</h2>

          <input
            name="username"
            type="text"
            placeholder="Username"
            required
            className="w-full p-3 lg:p-4 bg-[#f2f2f2] rounded-full"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 lg:p-4 bg-[#f2f2f2] rounded-full"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 lg:p-4 bg-[#f2f2f2] rounded-full"
          />
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-full hover:bg-grey-700"
          >
            Sign up
          </button>
          <p className="text-center text-sm lg:text-base">
            Have an account?{" "}
            <a href="/signin" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  </div>
</>
  );
};

export default Register;
