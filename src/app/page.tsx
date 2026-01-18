"use client"

import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription, DrawerThumb } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <h1 className="font-heading text-3xl">Deenify Dashboard</h1>
        <p className="text-base text-emerald-500">
          Welcome to your daily Islamic companion.
        </p>
        <p className="font-mono text-2xl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Drawer Test</h2>

        <Drawer>
          <DrawerTrigger asChild>
            <Button>Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent shouldShowOverlay className="bg-white ease-in duration-[4000ms]">
            <DrawerThumb />

            <div className="space-y-4 bg-red-200 md:p-6 p-4">
              <DrawerTitle>Drawer Title</DrawerTitle>
              <DrawerDescription>
                This is a test drawer using vaul library. You can drag it down to close.
              </DrawerDescription>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  This drawer component uses vaul for smooth drag-to-close functionality.
                </p>
                <p className="text-sm text-gray-600">
                  Try dragging the drawer down to close it, or click outside the drawer.
                </p>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default HomePage;