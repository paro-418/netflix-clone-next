import axios from 'axios';
import React, { useCallback, useState } from 'react';
import Input from '../components/input';
import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Auth = () => {
  // const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        // redirect: false,
        callbackUrl: '/profile',
      });
      // router.push('/');
    } catch (err) {
      console.log(err);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post(`/api/register`, {
        email,
        password,
        name,
      });
      login();
    } catch (err) {
      console.log(err);
    }
  }, [email, name, password]);
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-cover">
      <div className='bg-black w-full h-full lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <img src='/images/logo.png' alt='logo' className='h-12' />
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black bg-opacity-70 px-16  py-16 self-center mt-12 lg:w-2/5 lg:max-w-md rounded-md w-full'>
            <h2 className='text-white text-4xl mb-8 font-semibold'>
              {variant === 'login' ? 'Sign In' : 'Register'}
            </h2>
            <div className='flex flex-col gap-4 '>
              {variant === 'register' && (
                <Input
                  type='name'
                  label='Username'
                  onChange={(e: any) => setName(e.target.value)}
                  id='name'
                  value={name}
                />
              )}
              <Input
                type='email'
                label='Email'
                onChange={(e: any) => setEmail(e.target.value)}
                id='email'
                value={email}
              />
              <Input
                type='password'
                label='Password'
                onChange={(e: any) => setPassword(e.target.value)}
                id='password'
                value={password}
              />
            </div>
            <button
              onClick={variant === 'login' ? login : register}
              className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'
            >
              {variant === 'login' ? 'Login' : 'Sign Up'}
            </button>

            <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
              <div
                className='flex w-10  h-10 bg-white rounded-full items-center justify-center cursor-pointer hover:opacity-80 transition'
                onClick={() => signIn('google', { callbackUrl: '/profile' })}
              >
                <FcGoogle size={30} />
              </div>
              <div
                className='flex w-10  h-10 bg-white rounded-full items-center justify-center cursor-pointer hover:opacity-80 transition'
                onClick={() => signIn('github', { callbackUrl: '/profile' })}
              >
                <FaGithub size={30} />
              </div>
            </div>

            <p className='text-neutral-500 mt-12'>
              {variant === 'login'
                ? 'First time using NetFlix ?'
                : 'Already have an account?'}
              <span
                onClick={toggleVariant}
                className='text-white ml-1 hover:underline cursor-pointer'
              >
                {variant === 'login' ? 'Create account ' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
