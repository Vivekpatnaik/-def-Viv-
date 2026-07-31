'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VerifyEmailSchema, VerifyEmailInput } from '../schemas';
import { useToast } from '@/shared/providers/ToastProvider';
import { ShieldCheck, Loader2 } from 'lucide-react';

export function VerifyEmailForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailInput>({
    resolver: zodResolver(VerifyEmailSchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = async (data: VerifyEmailInput) => {
    setIsLoading(true);
    try {
      // Simulate verifying OTP verification code
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('[VerifyEmailForm] Validating OTP code:', data.code);

      addToast('Email verified successfully! Redirecting you to onboarding...', 'success');

      // Perform navigation safely using non-reactive window timeouts
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.replace('/dashboard');
        }
      }, 500);
    } catch (error) {
      console.error('[VerifyEmailForm] Verification error:', error);
      addToast('Verification code is invalid or has expired. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-lg shadow-xl text-left">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Verify Email</h1>
        <p className="text-slate-400 text-sm">Enter the 6-digit confirmation code dispatched to your inbox</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Verification Code Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="code">
            Verification Code
          </label>
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              id="code"
              type="text"
              maxLength={6}
              {...register('code')}
              placeholder="123456"
              className={`w-full bg-slate-950 border rounded-md py-2.5 pl-10 pr-4 text-sm text-center text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 tracking-[0.5em] font-mono ${
                errors.code ? 'border-rose-600' : 'border-slate-800'
              }`}
            />
          </div>
          {errors.code && (
            <p className="mt-1 text-xs text-rose-500">{errors.code.message}</p>
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
              <span>Verifying Code...</span>
            </>
          ) : (
            <span>Verify & Authenticate</span>
          )}
        </button>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => {
              addToast('Dispatched a new confirmation code to your inbox.', 'info');
            }}
            className="text-xs text-slate-400 hover:text-white bg-transparent border-0 cursor-pointer"
          >
            Resend Code
          </button>
        </div>
      </form>
    </div>
  );
}
