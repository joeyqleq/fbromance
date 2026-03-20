import React from 'react';
import { PoisonShell } from '@/components/poison/layout/poison-shell';

interface Props {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
    return (
        <PoisonShell>
            <main className="relative z-10 size-full">
                {children}
            </main>
        </PoisonShell>
    );
};

export default DashboardLayout;
