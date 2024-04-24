import { createClient } from "@/utils/supabaseClient";
import { currentUser } from "@clerk/nextjs/server";

export async function DELETE(req: Request) {
  const body = await req.json();
  try {
    const supabase = createClient();
    const user = await currentUser();

    if (!user) {
      return new Response("Unauthorized!", { status: 401 });
    }
    const data = await supabase.from("Event").delete().eq("id", body);
    if (data.error) {
      return new Response("Error occured on database", { status: 500 });
    }

    return new Response("Event deleted!", { status: 200 });
  } catch (error: any) {
    return new Response(error, {
      status: 500,
    });
  }
}
