'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordSchema, ResetPasswordInput } from '../schemas';
import { useToast } from '@/shared/providers/ToastProvider';
import { Lock, Loader2, ArrowLeft } from 'lucide-react';

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    setIsLoading(true);
    try {
      // Simulate password resets
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('[ResetPasswordForm] Resetting user password payload:', data);

      setIsCompleted(true);
      addToast('Password successfully reset! Please login with your new credentials.', 'success');
    } catch (error) {
      console.error('[ResetPasswordForm] Reset failed:', error);
      addToast('Password reset encountered an error. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-lg shadow-xl text-left">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
        <p className="text-slate-400 text-sm">
          {isCompleted ? 'Password securely updated' : 'Enter your brand new password credentials'}
        </p>
      </div>

      {isCompleted ? (
        <div className="space-y-6 text-center">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-md">
            <p className="text-slate-300 text-sm">
              Your password has been securely updated in our records. Please sign in to resume your active work modules.
            </p>
          </div>
          <a
            href="/login"
            className="flex items-center justify-center gap-2 text-blue-500 hover:text-blue-400 no-underline text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Proceed to Login</span>
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* New Password Input */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="password">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                id="password"
                type="password"
                {...register('password')}
                placeholder="••••••••"
                className={`w-full bg-slate-950 border rounded-md py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 ${
                  errors.password ? 'border-rose-600' : 'border-slate-800'
                }`}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-rose-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                placeholder="••••••••"
                className={`w-full bg-slate-950 border rounded-md py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 ${
                  errors.confirmPassword ? 'border-rose-600' : 'border-slate-800'
                }`}
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-rose-500">{errors.confirmPassword.message}</p>
            )}
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
                <span>Updating Password...</span>
              </>
            ) : (
              <span>Update Password</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
