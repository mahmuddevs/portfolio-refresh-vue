import {
  PhLayout,
  PhHouse,
  PhFolderOpen,
  PhPlus,
} from '@phosphor-icons/vue';
import type { Component } from 'vue';

export interface NavItem {
  label: string;
  path: string;
  icon: Component;
}

export const dashboardNavItems: NavItem[] = [
  {
    label: 'Site Settings',
    path: '/dashboard',
    icon: PhLayout,
  },
  {
    label: 'Add Project',
    path: '/dashboard/projects/add',
    icon: PhPlus,
  },
  {
    label: 'Projects',
    path: '/dashboard/projects',
    icon: PhFolderOpen,
  },
  {
    label: 'Back to Site',
    path: '/',
    icon: PhHouse,
  },
];
