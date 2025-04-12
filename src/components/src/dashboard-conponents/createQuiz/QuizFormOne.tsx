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
  title: z.string().min(3, {
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
    <div className="max-w-3xl mx-auto">
      {/* Form Header */}
      <div className="mb-8 text-center">
        <div className="inline-block p-3 bg-BLUE/10 rounded-full mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-BLUE" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-PRIMARY_TEXT">Quiz Information</h1>
        <p className="text-TERTIARY mt-2">Enter the basic details about your quiz</p>
      </div>

      {/* Form Container */}
      <div className="bg-SECONDARY rounded-xl shadow-lg border border-white/5 overflow-hidden">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Form Fields Container */}
            <div className="p-6 space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium flex items-center gap-2 text-PRIMARY_TEXT">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-BLUE" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Quiz Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter quiz title here"
                        className="bg-white/5 border-white/10 focus:border-BLUE focus:ring-BLUE/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-RED text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium flex items-center gap-2 text-PRIMARY_TEXT">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-BLUE" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Quiz Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter quiz code here"
                        className="bg-white/5 border-white/10 focus:border-BLUE focus:ring-BLUE/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-RED text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium flex items-center gap-2 text-PRIMARY_TEXT">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-BLUE" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter quiz description here"
                        className="bg-white/5 border-white/10 focus:border-BLUE focus:ring-BLUE/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-RED text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium flex items-center gap-2 text-PRIMARY_TEXT">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-BLUE" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter quiz password here"
                        className="bg-white/5 border-white/10 focus:border-BLUE focus:ring-BLUE/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-RED text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* Button Section */}
            <div className="px-6 py-4 bg-SECONDARY/80 border-t border-white/5 flex justify-end">
              <Button
                type="submit"
                className="bg-gradient-to-r from-BLUE to-SECONDARY_BLUE hover:opacity-90 text-white font-medium px-8 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                Continue
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default QuizFormOne;