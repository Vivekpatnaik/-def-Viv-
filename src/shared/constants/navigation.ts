import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Compass,
  Calendar,
  Briefcase,
  Settings,
  Shield,
  MessageSquare,
  Users,
  CreditCard,
  Target,
  GraduationCap,
  Hammer,
  Code,
  LineChart,
  User,
} from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'core' | 'community' | 'account' | 'admin';
}

export const NAVIGATION_MAP: NavItem[] = [
  // Core Platform Journey Items
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, category: 'core' },
  { name: 'Career Digital Twin', href: '/twin', icon: User, category: 'core' },
  { name: 'Resume Intelligence', href: '/resume', icon: FileText, category: 'core' },
  { name: 'Career Assessment', href: '/career', icon: Target, category: 'core' },
  { name: 'Career Roadmap', href: '/roadmap', icon: Compass, category: 'core' },
  { name: 'Learning Modules', href: '/learning', icon: GraduationCap, category: 'core' },
  { name: 'Verified Projects', href: '/projects', icon: Hammer, category: 'core' },
  { name: 'Coding Sandbox', href: '/coding', icon: Code, category: 'core' },
  { name: 'Mock Interviews', href: '/interview', icon: Calendar, category: 'core' },
  { name: 'Applications Tracker', href: '/applications', icon: Briefcase, category: 'core' },
  { name: 'AI Career Coach', href: '/coach', icon: MessageSquare, category: 'core' },
  { name: 'Analytics', href: '/analytics', icon: LineChart, category: 'core' },

  // Collaboration / Community
  { name: 'Community Hub', href: '/community', icon: MessageSquare, category: 'community' },
  { name: 'Skill Exchange', href: '/skill-exchange', icon: Users, category: 'community' },

  // Profile & Settings
  { name: 'Profile', href: '/profile', icon: User, category: 'account' },
  { name: 'Settings', href: '/settings', icon: Settings, category: 'account' },
  { name: 'Subscription', href: '/subscription', icon: CreditCard, category: 'account' },

  // Admin & Security
  { name: 'Admin Dashboard', href: '/admin', icon: Shield, category: 'admin' },
];
