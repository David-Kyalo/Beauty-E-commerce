'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/lib/api';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

import { Suspense } from 'react';

function LoginForm() {
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post('/auth/login', data);
      setAuth(res.data.data.user, res.data.data.token);
      toast.success('Welcome back!');
      router.push(redirect);
    } catch (error) {
      // Error handled by interceptor
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-beauty-bg px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass w-full max-w-md p-10 rounded-[3rem]"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-heading font-bold mb-2">Welcome Back</h1>
          <p className="text-charcoal/50 text-sm">Sign in to continue your beauty journey</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 ml-4">Email Address</label>
            <input
              {...register('email')}
              className="w-full px-6 py-4 rounded-full bg-white border border-charcoal/5 focus:border-gold outline-none transition-all"
              placeholder="name@example.com"
            />
            {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-4">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold mb-2 ml-4">Password</label>
            <input
              type="password"
              {...register('password')}
              className="w-full px-6 py-4 rounded-full bg-white border border-charcoal/5 focus:border-gold outline-none transition-all"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-[10px] mt-1 ml-4">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-premium w-full mt-4 disabled:opacity-50"
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-charcoal/50">
            Don't have an account?{' '}
            <Link href="/register" className="text-gold font-bold hover:underline">Register</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-beauty-bg px-6">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
