import { createClient } from "@/utils/supabaseClient";
import { currentUser } from "@clerk/nextjs/server";

export async function PATCH(req: Request) {
  const body = await req.json();

  try {
    const supabase = createClient();
    const user = await currentUser();

    if (!user) {
      return new Response("Unauthorized!", { status: 401 });
    }
    const data = await supabase
      .from("Event")
      .update({
        event: body.event,
        description: body.description,
        date: body.date,
      })
      .eq("id", body.id);

    if (data.error) {
      return new Response("Error occured on database", { status: 500 });
    }

    return new Response("Event updated!", { status: 200 });
  } catch (error: any) {
    return new Response(error, {
      status: 500,
    });
  }
}
