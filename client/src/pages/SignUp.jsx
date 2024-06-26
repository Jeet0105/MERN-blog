import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {

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
    if (!formdata.email || !formdata.username || !formdata.password) {
      return setErrorMessage("Please fill out all fields")
    }
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata)
      });
      const data = await res.json();
      setLoading(false);
      if (data.sucess === false) {
        return setErrorMessage(data.message);
      }else{
        navigate('/sign-in')
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                value={formdata.username}
                onChange={handleChange}
              />
            </div>

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
              : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-5 text-sm flex gap-2">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-blue-500">
              Sign In
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
  );
}

export default SignUp;