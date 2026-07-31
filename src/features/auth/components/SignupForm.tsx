'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema, SignupInput } from '../schemas';
import { useToast } from '@/shared/providers/ToastProvider';
import { AuthService } from '@/shared/services/authService';
import { User, Mail, Lock, Globe, Loader2, Award } from 'lucide-react';

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      country: '',
      acceptTerms: true,
    },
  });

  const onSubmit = async (data: SignupInput) => {
    setIsLoading(true);
    try {
      // Coordinate register signup logic inside our AuthService
      await AuthService.signup(data);

      addToast('Account created successfully! Please verify your email.', 'success');

      // Perform local navigation securely using non-reactive window timeouts
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.replace('#');
        }
      }, 500);
    } catch (error) {
      console.error('[SignupForm] Failed registration:', error);
      addToast('Registration encountered an error. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-lg shadow-xl text-left">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-slate-400 text-sm">Join CareerOS AI and accelerate your hiring probability</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="fullName">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              id="fullName"
              type="text"
              {...register('fullName')}
              placeholder="Alex Rivera"
              className={`w-full bg-slate-950 border rounded-md py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 ${
                errors.fullName ? 'border-rose-600' : 'border-slate-800'
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-xs text-rose-500">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="email">
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

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="password">
            Password
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

        {/* Country Selector */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="country">
            Country of Residence
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <select
              id="country"
              {...register('country')}
              className={`w-full bg-slate-950 border rounded-md py-2.5 pl-10 pr-4 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 ${
                errors.country ? 'border-rose-600' : 'border-slate-800'
              }`}
            >
              <option value="">Select country...</option>
              <option value="US">United States</option>
              <option value="IN">India</option>
              <option value="GB">United Kingdom</option>
              <option value="CA">Canada</option>
            </select>
          </div>
          {errors.country && (
            <p className="mt-1 text-xs text-rose-500">{errors.country.message}</p>
          )}
        </div>

        {/* Role Type Selector */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="roleType">
            Profile Category
          </label>
          <div className="relative">
            <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <select
              id="roleType"
              {...register('roleType')}
              className={`w-full bg-slate-950 border rounded-md py-2.5 pl-10 pr-4 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 ${
                errors.roleType ? 'border-rose-600' : 'border-slate-800'
              }`}
            >
              <option value="">Select category...</option>
              <option value="student">Student / Fresher</option>
              <option value="professional">Working Professional</option>
              <option value="college_admin">College Placement Cell</option>
              <option value="recruiter">Recruiter / Enterprise</option>
            </select>
          </div>
          {errors.roleType && (
            <p className="mt-1 text-xs text-rose-500">{errors.roleType.message}</p>
          )}
        </div>

        {/* Terms Box */}
        <div className="flex items-start">
          <input
            id="acceptTerms"
            type="checkbox"
            {...register('acceptTerms')}
            className="h-4 w-4 rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-slate-900 mt-1"
          />
          <label htmlFor="acceptTerms" className="ml-2 block text-xs text-slate-400 select-none">
            I accept the standard CareerOS AI{' '}
            <a href="#" className="text-blue-500 hover:text-blue-400 no-underline">
              Terms of Use
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-500 hover:text-blue-400 no-underline">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="mt-1 text-xs text-rose-500">{errors.acceptTerms.message}</p>
        )}

        {/* Primary Action Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer border-0 text-sm disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            <span>Sign Up</span>
          )}
        </button>
      </form>
    </div>
  );
}
