import { useState } from 'react';

export const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const onSubmitHandler = async (event) => {
    event.preventDefault();
  }
  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </p>
        <p >
          Please {state === 'Sign Up' ? "Create Account" : "Login"} to Book Appointment
        </p>
        {
          state === 'Sign Up' &&
          <div className='w-full'>
            <p>Full Name</p>
            <input className=' text-zinc-600 text-sm shadow-lg ' type='text' onChange={(e) => setName(e.target.value)} value={name}></input>
          </div>
        }
        <div className='w-full'>
          <p>Email</p>
          <input className=' text-zinc-600 text-sm shadow-lg' type='text' onChange={(e) => setEmail(e.target.value)} value={email}></input>
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className=' text-zinc-600 text-sm shadow-lg' type='text' onChange={(e) => setPassword(e.target.value)} value={password}></input>
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? "Create Account" : "Login"}</button>
        {
          state === 'Sign Up' ?
            <p>Already have an account? <span className='text-primary cursor-pointer underline' onClick={() => setState('Login')}>Login</span></p>
            :
            <p>Create a new account? <span className='text-primary cursor-pointer underline' onClick={() => setState('Sign Up')}>Create Account</span></p>
        }
      </div>

    </form>
  )
}
