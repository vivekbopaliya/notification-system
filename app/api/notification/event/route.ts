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
    if (data.error) {
      return new Response("Error occured on database.", { status: 500 });
    }

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
