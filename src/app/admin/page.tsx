import AdminSidebar from "@/components/AdminSidebar";

export default function AdminPage() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div>
        <h1>Admin Page</h1>
        <p>This is the admin page.</p>
      </div>
    </div>
  );
}
