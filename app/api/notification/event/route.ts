import { createClient } from "@/utils/supabaseClient";
import { createEventNotificaiton } from "@/utils/validations/create-notification";
import { currentUser } from "@clerk/nextjs";
import { LogSnag } from "@logsnag/next/server";
import { ZodError } from "zod";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const supabase = createClient();
    const user = await currentUser();

    if (!user) {
      return new Response("Unauthorized!", { status: 401 });
    }

    const { name, event, description, date, phoneNumber } =
      createEventNotificaiton.parse(body);

    const data = await supabase.from("Event").insert({
      name,
      event,
      description,
      date,
      phoneNumber,
      status: "Upcoming",
    });
    console.log(data);
    if (data.error) {
      return new Response("Error occured on database.", { status: 500 });
    }
    const logsnag = new LogSnag({
      token: "946e34bf729d8a2be2f1553bf3eb9ced",
      project: "notification-system",
    });

    await logsnag.track({
      channel: "notifications",
      event: "Created new notification",
      user_id: user.phoneNumbers[0].phoneNumber,
      description: name,
      icon: "🔥",
      tags: {
        type: type,
      },
    });
    return new Response("OK");
  } catch (error: any) {
    if (error instanceof ZodError) {
      return new Response("Please provid valid data!", { status: 400 });
    }
    return new Response(error, {
      status: 500,
    });
  }
}
