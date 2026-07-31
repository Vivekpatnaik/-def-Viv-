'use client';

import React from 'react';
import { LoginForm } from '@/features/auth/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-8">
      <LoginForm />
    </div>
  );
}
