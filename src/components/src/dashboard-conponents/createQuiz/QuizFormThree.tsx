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
    <div className="max-w-3xl mx-auto">
      {/* Form Header */}
      <div className="mb-8 text-center">
        <div className="inline-block p-3 bg-YELLOW/10 rounded-full mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-YELLOW"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-PRIMARY_TEXT">Quiz Schedule</h1>
        <p className="text-TERTIARY mt-2">
          Set when your quiz will be available to students
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-SECONDARY rounded-xl shadow-lg border border-white/5 overflow-hidden">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Form Fields Container */}
            <div className="p-6 space-y-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium flex items-center gap-2 text-PRIMARY_TEXT">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-YELLOW"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Start Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Enter start date here"
                        className="bg-white/5 border-white/10 focus:border-YELLOW focus:ring-YELLOW/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-RED text-xs" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium flex items-center gap-2 text-PRIMARY_TEXT">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-YELLOW"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Start Time
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          placeholder="Enter start time here"
                          className="bg-white/5 border-white/10 focus:border-YELLOW focus:ring-YELLOW/30"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-RED text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium flex items-center gap-2 text-PRIMARY_TEXT">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-YELLOW"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        End Time
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          placeholder="Enter end time here"
                          className="bg-white/5 border-white/10 focus:border-YELLOW focus:ring-YELLOW/30"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-RED text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-4">
                <div className="p-4 bg-YELLOW/5 border border-YELLOW/10 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-YELLOW"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-PRIMARY_TEXT">
                        Important Note
                      </h3>
                      <div className="mt-1 text-xs text-TERTIARY">
                        <p>
                          Once created, students will be able to join the quiz
                          using the code during the scheduled time window.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Button Section */}
            <div className="px-6 py-4 bg-SECONDARY/80 border-t border-white/5 flex justify-between">
              <Button
                type="submit"
                className="bg-gradient-to-r from-YELLOW to-YELLOW/80 hover:opacity-90 text-PRIMARY  font-medium px-8 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create Quiz
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default QuizFormThree;
