import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackToHome: React.FC = () => {
    return (
        <Link
            to="/"
            className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-8 group w-fit"
        >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Назад к обзору</span>
        </Link>
    );
};

export default BackToHome;
