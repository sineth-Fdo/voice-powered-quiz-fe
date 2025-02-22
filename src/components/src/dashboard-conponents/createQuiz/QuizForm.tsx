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
  title: z.string().min(3,{
    message: "Title is required.",
  }),
  code: z.string().min(4, {
    message: "Code is required.",
  }),
  description: z.string().min(4, {
    message: "Description is required.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
  teacher: z.string().min(4, {
    message: "Teacher is required.",
  }),
  subject: z.string().min(4, {
    message: "Subject is required.",
  }),
  grade: z.string().min(4, {
    message: "Grade is required.",
  }),
  batch: z.string().min(4, {
    message: "Batch is required.",
  }),
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

export type FormData = z.infer<typeof formSchema>;

const QuizForm = ({ onSubmit }: { onSubmit: (data: FormData) => void }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      code: "",
      description: "",
      password: "",
      teacher: "",
      subject: "",
      grade: "",
      batch: "",
      startDate: "",
      startTime: "",
      endTime: "",
    },
  });

  return (
    <div className="rounded-xl shadow-white p-8 flex flex-col space-y-6 w-[80%] bg-SECONDARY text-SECONDARY_TEXT">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-semibold">Creating a New Quiz</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter quiz title here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Module Code</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter module code here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter quiz description here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter quiz password here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="teacher"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teacher</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter teacher name here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter subject name here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter grade here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="batch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Batch</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter batch here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
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

export default QuizForm;
