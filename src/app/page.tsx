"use client"
import { sendAdhanNotification } from "@/lib/notification/notify";
import { requestNotificationPermission } from "@/lib/notification/permissions";

const HomePage = () => {
  return (
    <div>
      <h1>islam app</h1>
      <p>comming soon...</p>

      <button onClick={()=> requestNotificationPermission()}>netify request</button>
      <button onClick={ ()=> sendAdhanNotification("fajr")}>notify now</button>
    </div>
  );
};

export default HomePage;