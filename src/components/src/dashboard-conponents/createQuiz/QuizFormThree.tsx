import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  startDate: z.string().min(4, {
    message: "Start Date is required.",
  }),
  startTime: z.string().min(2, {
    message: "Start Time is required.",
  }),
  endTime: z.string().min(2, {
    message: "End Time is required.",
  }),
});

export type FormData3 = z.infer<typeof formSchema>;

const QuizFormThree = ({
  onSubmit,
}: {
  onSubmit: (data: FormData3) => void;
}) => {
  const form = useForm<FormData3>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: "",
      startTime: "",
      endTime: "",
    },
  });

  return (
    <div className="rounded-xl shadow-white p-8 flex flex-col space-y-6 w-[50%] bg-SECONDARY text-SECONDARY_TEXT">
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-semibold">Creating a New Quiz</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    placeholder="Enter start date here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-center ">
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem className="w-[45%]">
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      placeholder="Enter start time here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem className="w-[45%]">
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      placeholder="Enter end time here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="bg-GREEN hover:bg-SECONDARY_GREEN text-white w-[100%]"
          >
            Create Quiz
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default QuizFormThree;
