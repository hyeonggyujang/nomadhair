import { Button } from "@/components/atoms/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/molecules/drawer";
import { Container } from "@/components/templates/container";
import { PlusIcon } from "lucide-react";
import { AppointmentForm, AppointmentList, NewAppointment } from "./components";

function MyAppointments() {
  return (
    <div className="relative flex flex-col gap-8 py-8 md:min-h-0">
      <Container className="flex justify-between">
        <h1 className="text-lg font-medium text-primary-100 lg:text-xl">
          My Appointments
        </h1>
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              icon={<PlusIcon />}
              size="lg"
              className="fixed bottom-12 right-8 bg-primary-90 md:hidden"
            >
              New Appointment
            </Button>
          </DrawerTrigger>
          <DrawerContent className="p-6">
            <DrawerHeader>
              <DrawerTitle>New Appointment</DrawerTitle>
            </DrawerHeader>
            <AppointmentForm />
          </DrawerContent>
        </Drawer>
      </Container>
      <div className="mx-auto grid w-full max-w-screen-xl grid-cols-6 gap-10 p-4 md:grid-cols-12 md:px-32">
        <div className="col-span-6 md:max-h-[40rem] md:overflow-auto md:pb-4">
          <AppointmentList />
        </div>
        <div className="hidden md:sticky md:top-32 md:col-span-6 md:block">
          <NewAppointment />
        </div>
      </div>
    </div>
  );
}

export default MyAppointments;