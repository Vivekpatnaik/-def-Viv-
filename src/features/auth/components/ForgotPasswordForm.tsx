'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordSchema, ForgotPasswordInput } from '../schemas';
import { useToast } from '@/shared/providers/ToastProvider';
import { Mail, Loader2, ArrowLeft } from 'lucide-react';

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true);
    try {
      // Simulate sending forgot password email
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('[ForgotPasswordForm] Sending reset link to email:', data.email);

      setIsSent(true);
      addToast('Password reset link successfully sent to your email!', 'success');
    } catch (error) {
      console.error('[ForgotPasswordForm] Failed request:', error);
      addToast('Reset request encountered an error. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-lg shadow-xl text-left">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Forgot Password</h1>
        <p className="text-slate-400 text-sm">
          {isSent
            ? 'Verify your inbox for recovery instructions'
            : "Enter your email address and we'll send you a recovery link"}
        </p>
      </div>

      {isSent ? (
        <div className="space-y-6 text-center">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-md">
            <p className="text-slate-300 text-sm">
              An interactive reset recovery confirmation link has been dispatched to your email. It will expire in exactly 60 minutes.
            </p>
          </div>
          <a
            href="/login"
            className="flex items-center justify-center gap-2 text-blue-500 hover:text-blue-400 no-underline text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Login</span>
          </a>
        </div>
      ) : (
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
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>
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
                <span>Sending Recovery Link...</span>
              </>
            ) : (
              <span>Send Recovery Link</span>
            )}
          </button>

          <div className="text-center pt-2">
            <a
              href="/login"
              className="flex items-center justify-center gap-2 text-slate-400 hover:text-white no-underline text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
