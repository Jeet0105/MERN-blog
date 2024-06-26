import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [formdata, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value.trim() });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formdata.email || !formdata.password) {
      return setErrorMessage("Please fill out all fields")
    }
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata)
      });
      const data = await res.json();
      setLoading(false);
      if (data.sucess === false) {
        return setErrorMessage(data.message);
      }else{
        navigate('/')
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] mt-20">
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

          <p className="mt-5 text-sm">This is a demo project you can sign in using email and password or with Google.</p>
        </div>

        {/* Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="abc@gmail.com"
                id="email"
                value={formdata.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                value={formdata.password}
                onChange={handleChange}
              />
            </div>

            <Button gradientDuoTone='purpleToPink' type="submit" disabled={loading}>{loading ?
              <>
                <Spinner size='sm' />
                <span className="pl-3">Loading...</span>
              </>
              : 'Sign In'}
            </Button>
          </form>

          <div className="mt-5 text-sm flex gap-2">
            <span>Don&apos;t have an account?</span>
            <Link to='/sign-up' className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className="mt-5" color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
)}

export default SignIn