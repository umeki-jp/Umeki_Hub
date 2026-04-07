import { createClient } from "../../utils/supabase/server";
import SettingsPageClient from "./SettingsPageClient";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profileName = "";
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("id", user.id)
      .single();
    if (data && data.display_name) {
      profileName = data.display_name;
    } else if (user.user_metadata && user.user_metadata.display_name) {
      profileName = user.user_metadata.display_name;
    }
  }

  return <SettingsPageClient user={user} profileName={profileName} />;
}
