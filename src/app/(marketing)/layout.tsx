import type { ReactNode } from "react";
import { PoisonShell } from "@/components/poison/layout/poison-shell";
import { PoisonTopNav } from "@/components/poison/layout/poison-top-nav";

interface Props {
    children: ReactNode
}

const MarketingLayout = ({ children }: Props) => {
    return (
        <PoisonShell>
            <PoisonTopNav />
            <main className="mx-auto w-full">
                {children}
            </main>
        </PoisonShell>
    );
};

export default MarketingLayout
