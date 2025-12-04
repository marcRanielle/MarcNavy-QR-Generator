import { LinkIcon, ZapIcon, MailIcon } from '../components/Icons';
import { Type } from "lucide-react";

export const TEXT_TYPES = [
    { name: 'URL', placeholder: 'marcnavy.vercel.app', icon: LinkIcon, key: 'url' },
    { name: 'Text', placeholder: 'Enter any message or data', icon: Type, key: 'text' },
    { name: 'Email', placeholder: 'marcnavy.web@gmail.com', icon: MailIcon, key: 'email' },
];

export const COLORS = [
    { name: 'Black', hex: '#000000' },
    { name: 'Navy', hex: '#1D4ED8' },
    { name: 'Red', hex: '#DC2626' },
    { name: 'Green', hex: '#10B981' },
];