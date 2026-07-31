'use client';

import React from 'react';
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-8">
      <ForgotPasswordForm />
    </div>
  );
}
