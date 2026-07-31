'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginInput } from '../schemas';
import { useToast } from '@/shared/providers/ToastProvider';
import { AuthService } from '@/shared/services/authService';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      // Coordinate secure authentication login through our centralized AuthService
      await AuthService.login(data);

      addToast('Successfully authenticated! Redirecting to Dashboard...', 'success');

      // Perform redirect via non-reactive safe window timeout
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.replace('/dashboard');
        }
      }, 500);
    } catch (error) {
      console.error('[LoginForm] Failed authentication:', error);
      addToast('Invalid credentials or authentication timeout.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-lg shadow-xl text-left">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-slate-400 text-sm">Sign in to resume your job-readiness journey</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="email">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              id="email"
              type="email"
              {...register('email')}
              placeholder="alex.rivera@example.com"
              className={`w-full bg-slate-950 border rounded-md py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 ${
                errors.email ? 'border-rose-600' : 'border-slate-800'
              }`}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-300" htmlFor="password">
              Password
            </label>
            <a href="#" className="text-xs text-blue-500 hover:text-blue-400 no-underline">
              Forgot Password?
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="••••••••"
              className={`w-full bg-slate-950 border rounded-md py-2.5 pl-10 pr-12 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 ${
                errors.password ? 'border-rose-600' : 'border-slate-800'
              }`}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-300 bg-transparent border-0 cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-rose-500">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me Toggle */}
        <div className="flex items-center">
          <input
            id="rememberMe"
            type="checkbox"
            {...register('rememberMe')}
            className="h-4 w-4 rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-slate-900"
          />
          <label htmlFor="rememberMe" className="ml-2 block text-sm text-slate-400 select-none">
            Remember my workspace session
          </label>
        </div>

        {/* Primary Action Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer border-0 text-sm disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </button>
      </form>
    </div>
  );
}
