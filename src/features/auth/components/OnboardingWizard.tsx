'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/shared/providers/ToastProvider';
import { User, Briefcase, DollarSign, Check, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';

const OnboardingSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters long'),
  country: z.string().min(1, 'Please select your country of residence'),
  targetJobTitle: z.string().min(2, 'Job title must be at least 2 characters long'),
  targetSalary: z.string().min(1, 'Please specify your target salary expectations'),
  primarySkill: z.string().min(1, 'Please select your primary technical skill'),
});

type OnboardingInput = z.infer<typeof OnboardingSchema>;

export function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingInput>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      fullName: 'Alex Rivera',
      country: 'US',
      targetJobTitle: '',
      targetSalary: '',
      primarySkill: '',
    },
  });

  const onSubmit = async (data: OnboardingInput) => {
    setIsLoading(true);
    try {
      // Simulate onboarding completion
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('[OnboardingWizard] Finalizing onboarding parameters:', data);

      addToast('Profile successfully initialized! Welcome to CareerOS AI.', 'success');

      // Navigate to dashboard
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.replace('/dashboard');
        }
      }, 500);
    } catch (error) {
      console.error('[OnboardingWizard] Failed onboarding:', error);
      addToast('Onboarding encountered an error. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg bg-slate-900 border border-slate-800 p-8 rounded-lg shadow-xl text-left">
      {/* Dynamic Progress Stepper header */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  step === s
                    ? 'bg-blue-600 text-white'
                    : step > s
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              <span className={`text-xs font-semibold ${step === s ? 'text-white' : 'text-slate-500'}`}>
                {s === 1 ? 'Profile' : s === 2 ? 'Goals' : 'Assessment'}
              </span>
            </div>
            {s < 3 && <div className="flex-1 h-[2px] bg-slate-800 mx-4" />}
          </React.Fragment>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Personal Details */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Personal Details</h2>
              <p className="text-slate-400 text-sm">Tell us about yourself to tailor your study modules</p>
            </div>

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
                  className={`w-full bg-slate-950 border rounded-md py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 ${
                    errors.fullName ? 'border-rose-600' : 'border-slate-800'
                  }`}
                />
              </div>
              {errors.fullName && <p className="mt-1 text-xs text-rose-500">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="country">
                Country of Residence
              </label>
              <select
                id="country"
                {...register('country')}
                className={`w-full bg-slate-950 border rounded-md py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 ${
                  errors.country ? 'border-rose-600' : 'border-slate-800'
                }`}
              >
                <option value="US">United States</option>
                <option value="IN">India</option>
                <option value="GB">United Kingdom</option>
                <option value="CA">Canada</option>
              </select>
              {errors.country && <p className="mt-1 text-xs text-rose-500">{errors.country.message}</p>}
            </div>
          </div>
        )}

        {/* Step 2: Target Goals */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Target Goals</h2>
              <p className="text-slate-400 text-sm">Specify your professional career objectives</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="targetJobTitle">
                Target Job Title
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  id="targetJobTitle"
                  type="text"
                  {...register('targetJobTitle')}
                  placeholder="Senior Frontend Engineer"
                  className={`w-full bg-slate-950 border rounded-md py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 ${
                    errors.targetJobTitle ? 'border-rose-600' : 'border-slate-800'
                  }`}
                />
              </div>
              {errors.targetJobTitle && <p className="mt-1 text-xs text-rose-500">{errors.targetJobTitle.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="targetSalary">
                Target Salary Expectation
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  id="targetSalary"
                  type="text"
                  {...register('targetSalary')}
                  placeholder="$120,000 / year"
                  className={`w-full bg-slate-950 border rounded-md py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 ${
                    errors.targetSalary ? 'border-rose-600' : 'border-slate-800'
                  }`}
                />
              </div>
              {errors.targetSalary && <p className="mt-1 text-xs text-rose-500">{errors.targetSalary.message}</p>}
            </div>
          </div>
        )}

        {/* Step 3: Core Skills */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Skill Assessment</h2>
              <p className="text-slate-400 text-sm">Select your primary technical skill to benchmark</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5" htmlFor="primarySkill">
                Primary Technical Skill
              </label>
              <select
                id="primarySkill"
                {...register('primarySkill')}
                className={`w-full bg-slate-950 border rounded-md py-2.5 px-4 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 ${
                  errors.primarySkill ? 'border-rose-600' : 'border-slate-800'
                }`}
              >
                <option value="">Select skill...</option>
                <option value="react">React / Next.js</option>
                <option value="node">Node.js / Express</option>
                <option value="python">Python / Django</option>
                <option value="go">Go / Microservices</option>
              </select>
              {errors.primarySkill && <p className="mt-1 text-xs text-rose-500">{errors.primarySkill.message}</p>}
            </div>
          </div>
        )}

        {/* Form Controls */}
        <div className="flex justify-between items-center border-t border-slate-800 pt-6 mt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white bg-transparent border-0 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => {
                // Perform quick validation on current step attributes
                if (step === 1) setStep(2);
                else if (step === 2) setStep(3);
              }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-md transition-colors cursor-pointer border-0 text-sm"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 px-5 rounded-md transition-colors cursor-pointer border-0 text-sm disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Complete Profile</span>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
