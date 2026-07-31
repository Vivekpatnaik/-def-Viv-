'use client';

import React from 'react';
import { SignupForm } from '@/features/auth/components/SignupForm';

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-8">
      <SignupForm />
    </div>
  );
}
