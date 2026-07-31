'use client';

import React from 'react';
import { ResetPasswordForm } from '@/features/auth/components/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-8">
      <ResetPasswordForm />
    </div>
  );
}
