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
});

export type FormData2 = z.infer<typeof formSchema>;

const QuizFormTwo = ({ onSubmit }: { onSubmit: (data: FormData2) => void }) => {
  const form = useForm<FormData2>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teacher: "",
      subject: "",
      grade: "",
      batch: "",
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

          <Button
            type="submit"
            className="bg-GREEN hover:bg-SECONDARY_GREEN text-white w-[100%]"
          >
            Next
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default QuizFormTwo;
