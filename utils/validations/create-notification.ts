import { z } from "zod";

export const createEventNotificaiton = z.object({
  name: z.string().min(1, { message: "Owner name cannot be empty." }),
  event: z.string().min(1, { message: "Event name cannot be empty." }),
  description: z.string().optional(),
  date: z.string().min(1),
  phoneNumber: z.string(),
});

export type createEventNotificaitonType = z.infer<
  typeof createEventNotificaiton
>;

// export const createRandomNotification = z.object({
//   name: z.string().min(1),
//   description: z.string().optional(),
//   time: z.string().min(1),
//   text: z.string(),
//   userid: z.string().min(1),
// });

// export type createRandomNotificationType = z.infer<
//   typeof createRandomNotification
// >;
