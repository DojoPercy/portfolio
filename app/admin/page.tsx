import { redirect } from "next/navigation"
import AdminDashboard from "@/components/admin/dashboard"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  return <AdminDashboard />
}
