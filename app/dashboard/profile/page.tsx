import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { ProfileForm } from "@/components/dashboard/profile-form";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?redirectTo=/dashboard/profile");

  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-text">Profile</h2>
      <p className="mt-1 text-sm text-text-muted">Update your account details.</p>

      <ProfileForm
        initialName={user.name}
        initialEmail={user.email}
        initialPhone={user.phone ?? ""}
      />
    </div>
  );
}
