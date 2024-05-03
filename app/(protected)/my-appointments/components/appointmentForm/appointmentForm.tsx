"use client";

import { mutate } from "swr";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/atoms/button";
import { Input, inputVariants } from "@/components/atoms/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/molecules/form";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/molecules/toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/molecules/popover";
import { Calendar } from "@/components/atoms/calendar";
import { CalendarIcon, ClockIcon } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/molecules/select";
import { FormSchema } from "@/lib/formSchema";
import AppointmentDateTimePicker from "../appointmentDateTimePicker/appointmentDateTimePicker";

/**
 * Extracted async calls into its own functions to manage them separate from rendering logic.
 * We can potentially make them into server actions.
 */
async function patchAppointment(formValues: any) {
  const res = await fetch("/api/my-appointments", {
    method: "PATCH",
    body: JSON.stringify({
      ...formValues,
    }), // TODO: pass time slot ID intead of time
  });

  if (!res.ok) {
    throw new Error();
  }

  return Response.json(res);
}

// async function sendEmail(formValues: z.infer<typeof FormSchema>) {
//   const { timeslotId, address1, address2, city, state, zipCode, comment } =
//     formValues;
//   const location = [address1, address2, city, state, zipCode].join(", ");
//   const res = await fetch("/api/email", {
//     method: "POST",
//     headers: { "Content-type": "application/json" },
//     // This is a mock data. Replace with proper form values later.
//     body: JSON.stringify({
//       date: new Date(date).toDateString(),
//       time,
//       location,
//       comment,
//     }),
//   });

//   return Response.json(res);
// }

// const INITIAL_FORM_VALUES: z.infer<typeof FormSchema> = {
//   date: "",
//   time: "",
//   address1: "",
//   address2: "",
//   city: "",
//   state: "",
//   zipCode: "",
//   comment: "",
// };

interface AppointmentFormProps {
  id?: string;
  mode?: "create" | "edit";
  appointment?: any;
  onClose?: () => void;
}

const AVAILABLE_DATES = ["2024-05-06", "2024-05-02", "2024-05-13"];

/**
 * A client side form component that handles both creating and editing appointments.
 */
export const AppointmentForm = ({
  mode = "create",
  appointment,
  onClose,
}: AppointmentFormProps) => {
  const submitBtnLabel = (mode === "create" ? "Book" : "Edit") + " Appointment";
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    // defaultValues:
    //   mode === "edit" && !!appointment
    //     ? {
    //         date: appointment.timeSlot
    //           ? unixToDateTimeStrings(appointment.timeSlot?.startTime).date
    //           : "",
    //         time: appointment.timeSlot
    //           ? unixToDateTimeStrings(appointment.timeSlot?.startTime).time
    //           : "",
    //         address1: appointment.address1,
    //         address2: appointment.address2,
    //         city: appointment.city,
    //         state: appointment.state,
    //         zipCode: appointment.zipCode,
    //         comment: appointment.comment,
    //       }
    //     : INITIAL_FORM_VALUES,
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      await patchAppointment({
        ...values,
        appointmentId: appointment?.appointmentId ?? undefined,
      });

      // await sendEmail(values);
      // Re-validates the <AppointmentList /> successful submission.
      mutate("/api/my-appointments");
      onClose ? onClose() : null;
      toast({
        title: `Your appointment has been successfully ${mode === "create" ? "booked" : "updated"}!`,
        intent: "success",
      });
      // form.reset(INITIAL_FORM_VALUES);
    } catch (e) {
      toast({
        title: "Oops! Something went wrong! Please try again.",
        intent: "danger",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <fieldset className="grid grid-cols-6 gap-2">
          <legend className="mb-2 text-sm font-bold text-primary-100">
            Appointment date
          </legend>
          <FormField
            control={form.control}
            name="timeslotId"
            render={({ field, fieldState }) => (
              <FormItem className="col-span-6">
                <FormLabel className="sr-only">Select Date</FormLabel>
                <AppointmentDateTimePicker availableDates={AVAILABLE_DATES} />
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <fieldset className="grid grid-cols-6 gap-x-2">
          <legend className="mb-2 text-sm font-bold text-primary-100">
            Address
          </legend>
          <FormField
            control={form.control}
            name="address1"
            render={({ field, fieldState }) => (
              <FormItem className="col-span-6">
                <FormLabel className="sr-only">Address 1</FormLabel>
                <FormControl>
                  <Input
                    className="h-8 md:h-10"
                    error={!!fieldState.error}
                    placeholder="Address 1"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address2"
            render={({ field, fieldState }) => (
              <FormItem className="col-span-6">
                <FormLabel className="sr-only">Address 2</FormLabel>
                <FormControl>
                  <Input
                    className="h-8 md:h-10"
                    error={!!fieldState.error}
                    placeholder="Address 2"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field, fieldState }) => (
              <FormItem className="col-span-3">
                <FormLabel className="sr-only">City</FormLabel>
                <FormControl>
                  <Input
                    className="h-8 md:h-10"
                    error={!!fieldState.error}
                    placeholder="City"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field, fieldState }) => (
              <FormItem className="col-span-3">
                <FormLabel className="sr-only">State</FormLabel>
                <FormControl>
                  <Input
                    className="h-8 md:h-10"
                    error={!!fieldState.error}
                    placeholder="State"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field, fieldState }) => (
              <FormItem className="col-span-6">
                <FormLabel className="sr-only">Zip code</FormLabel>
                <FormControl>
                  <Input
                    className="h-8 md:h-10"
                    type="number"
                    error={!!fieldState.error}
                    placeholder="Zip Code"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <fieldset>
          <legend className="mb-2 text-sm font-bold text-primary-100">
            Note
          </legend>
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Note</FormLabel>
                <FormControl>
                  <textarea
                    className={cn(
                      inputVariants(),
                      "h-16 outline-none focus-visible:ring-2 focus-visible:ring-primary-100 focus-visible:ring-offset-2",
                    )}
                    placeholder="Anything I should know before the visit?"
                    {...field}
                  ></textarea>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="self-end"
        >
          {form.formState.isSubmitting ? "Processing..." : submitBtnLabel}
        </Button>
      </form>
    </Form>
  );
};
