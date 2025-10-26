"use client"
import { sendAdhanNotification } from "@/lib/notification/notify";
import { requestNotificationPermission } from "@/lib/notification/permissions";

const HomePage = () => {
  return (
    <div className="container-lg">
      <p className="mt-8">fonts testing</p>

      <div className="mt-2 space-y-4">
        <h1 className="font-heading text-3xl">Deenify Dashboard</h1>
        <p className="font-body text-base">
          Welcome to your daily Islamic companion.
        </p>
        <p className="font-arabic text-2xl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      </div>
    </div>
  );
};

export default HomePage;