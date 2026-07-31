'use client';

import React from 'react';
import { VerifyEmailForm } from '@/features/auth/components/VerifyEmailForm';

export default function VerifyEmailPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-8">
      <VerifyEmailForm />
    </div>
  );
}
