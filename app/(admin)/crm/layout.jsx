<<<<<<< HEAD
// app/(admin)/settings/layout.jsx

import Sidebar from './_components/Sidebar';


export default async function SettingsLayout({ children }) {

  return (
    <div className="flex h-screen">
      {/* Sidebar with links */}
      <Sidebar />
i
      {/* Main Content Area */}
      <main className="flex-1 p-8">
        {children}
=======
import Sidebar from './_components/Sidebar';
import { UserPermissionsProvider } from "@/context/UserPermissionsContext";


export default async function CRMLayout({ children }) {

  return (
    <div className="flex h-screen">
     
      <Sidebar />

      <main className="flex-1 p-8">
      <UserPermissionsProvider>
        {children}
      </UserPermissionsProvider>
>>>>>>> guru/main
      </main>
    </div>
  );
}
