export const DEPARTMENT_COLORS = {
  'software-engineering': '#1C8AF8',
  'data-science': '#A855F7',
  'accounting': '#10B981',
  'marketing': '#F59E0B',
  'business-admin': '#EF4444',
  'psychology': '#EC4899',
  'nursing': '#06B6D4',
  'education': '#8B5CF6',
} as const;

export const DEPARTMENTS = [
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    color: DEPARTMENT_COLORS['software-engineering'],
    icon: '💻',
    description: 'Build the future with code',
  },
  {
    id: 'data-science',
    name: 'Data Science',
    color: DEPARTMENT_COLORS['data-science'],
    icon: '📊',
    description: 'Unlock insights from data',
  },
  {
    id: 'accounting',
    name: 'Accounting',
    color: DEPARTMENT_COLORS['accounting'],
    icon: '💰',
    description: 'Master financial systems',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    color: DEPARTMENT_COLORS['marketing'],
    icon: '📢',
    description: 'Connect brands with people',
  },
  {
    id: 'business-admin',
    name: 'Business Administration',
    color: DEPARTMENT_COLORS['business-admin'],
    icon: '💼',
    description: 'Lead organizations to success',
  },
  {
    id: 'psychology',
    name: 'Psychology',
    color: DEPARTMENT_COLORS['psychology'],
    icon: '🧠',
    description: 'Understand human behavior',
  },
  {
    id: 'nursing',
    name: 'Nursing',
    color: DEPARTMENT_COLORS['nursing'],
    icon: '🏥',
    description: 'Care for those in need',
  },
  {
    id: 'education',
    name: 'Education',
    color: DEPARTMENT_COLORS['education'],
    icon: '📚',
    description: 'Shape future generations',
  },
] as const;

export type DepartmentId = keyof typeof DEPARTMENT_COLORS;
