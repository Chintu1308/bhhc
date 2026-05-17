import { User, Award, Laptop, BookOpen, Contact2 } from 'lucide-react';

export const navItems = [
  { id: 'about', icon: User, label: 'About' },
  { id: 'projects', icon: Laptop, label: 'Projects' },
  { id: 'experience', icon: Award, label: 'Experience' },
  { id: 'blogs', icon: BookOpen, label: 'Blogs', isExternal: true },
  { id: 'contact', icon: Contact2, label: 'Contact' }
];