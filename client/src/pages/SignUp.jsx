import { Button, Label, TextInput } from "flowbite-react"
import { Link } from "react-router-dom"

function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left */}
        <div className="flex-1">
          <Link
            to='/'
            className='text-4xl font-bold dark:text-white'
          >
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Jeet&apos;s
            </span>
            Blog
          </Link>

          <p className="mt-5 text-sm">This is a demo project you can sign up using email and password or with Google.</p>
        </div>

        {/* Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your Username" />
              <TextInput
               type="text"
               placeholder="Username"
               id="username"
              /> 
            </div>

            <div>
              <Label value="Your Email" />
              <TextInput
               type="email"
               placeholder="abc@gmail.com"
               id="email"
              /> 
            </div>

            <div>
              <Label value="Your Password" />
              <TextInput
               type="password"
               placeholder="Password"
               id="password"
              /> 
            </div>

            <Button gradientDuoTone='purpleToPink' type="submit">Sign Up</Button>
          </form>

          <div className="mt-5 text-sm flex gap-2">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-blue-500">
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SignUp