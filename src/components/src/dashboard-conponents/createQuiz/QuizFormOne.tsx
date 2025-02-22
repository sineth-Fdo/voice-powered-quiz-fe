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

});

export type FormData1 = z.infer<typeof formSchema>;

const QuizFormOne = ({ onSubmit }: { onSubmit: (data: FormData1) => void }) => {
  const form = useForm<FormData1>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      code: "",
      description: "",
      password: "",
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

export default QuizFormOne;
