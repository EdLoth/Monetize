"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Undo2, X } from "lucide-react";
import Link from "next/link"; // Importando Link do Next.js
import { useEffect } from "react";

const SettingsPage = () => {
  useEffect(() => {
    document.title = "Monetize - Settings (Under Development)";
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Settings Page (Under Development)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[150px] w-full pb-6 flex flex-col items-center justify-center text-center">
            <X className="size-14 text-slate-300 mb-4" />
            <p className="text-slate-600">
              We are working hard to make this feature available soon!
            </p>
            <Link href="/">
              <Button className="mt-4" variant="outline" size="sm">
                <Undo2 className="size-4 mr-2" />
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
