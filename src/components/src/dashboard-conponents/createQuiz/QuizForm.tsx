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
    <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-SECONDARY to-PRIMARY/90 shadow-xl w-[90%] max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-BLUE to-SECONDARY_BLUE p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Create New Quiz
        </h1>
        <p className="text-center mt-2 text-white/70">Fill out the form below to create a new quiz for your students</p>
      </div>

      {/* Form */}
      <div className="p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Info Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center text-PRIMARY_TEXT">
                <div className="bg-BLUE/20 p-1.5 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-BLUE" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Quiz Information
              </h2>
              
              <div className="bg-white/5 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel className="text-sm font-medium flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-TERTIARY" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        Quiz Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter quiz title here"
                          className="bg-white/10 border-white/20 focus:border-BLUE focus:ring-1 focus:ring-BLUE"
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
                      <FormLabel className="text-sm font-medium flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-TERTIARY" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Module Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter module code here"
                          className="bg-white/10 border-white/20 focus:border-BLUE focus:ring-1 focus:ring-BLUE"
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
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-sm font-medium flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-TERTIARY" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                        Description
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter quiz description here"
                          className="bg-white/10 border-white/20 focus:border-BLUE focus:ring-1 focus:ring-BLUE"
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
                      <FormLabel className="text-sm font-medium flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-TERTIARY" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter quiz password here"
                          className="bg-white/10 border-white/20 focus:border-BLUE focus:ring-1 focus:ring-BLUE"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-RED text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Class Details Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center text-PRIMARY_TEXT">
                <div className="bg-GREEN/20 p-1.5 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-GREEN" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857M17 8a5 5 0 01-5-5M12 3a5 5 0 01-5 5" />
                  </svg>
                </div>
                Class Details
              </h2>
              
              <div className="bg-white/5 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="teacher"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-TERTIARY" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Teacher
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter teacher name here"
                          className="bg-white/10 border-white/20 focus:border-BLUE focus:ring-1 focus:ring-BLUE"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-RED text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-TERTIARY" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Subject
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter subject name here"
                          className="bg-white/10 border-white/20 focus:border-BLUE focus:ring-1 focus:ring-BLUE"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-RED text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-TERTIARY" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Grade
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter grade here"
                          className="bg-white/10 border-white/20 focus:border-BLUE focus:ring-1 focus:ring-BLUE"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-RED text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="batch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-TERTIARY" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857M17 8a5 5 0 11-5-5M12 3a5 5 0 01-5 5" />
                        </svg>
                        Batch
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter batch here"
                          className="bg-white/10 border-white/20 focus:border-BLUE focus:ring-1 focus:ring-BLUE"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-RED text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Scheduling Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center text-PRIMARY_TEXT">
                <div className="bg-YELLOW/20 p-1.5 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-YELLOW" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Quiz Schedule
              </h2>
              
              <div className="bg-white/5 rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-TERTIARY" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Start Date
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="Enter start date here"
                          className="bg-white/10 border-white/20 focus:border-BLUE focus:ring-1 focus:ring-BLUE"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-RED text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-TERTIARY" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Start Time
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          placeholder="Enter start time here"
                          className="bg-white/10 border-white/20 focus:border-BLUE focus:ring-1 focus:ring-BLUE"
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
                      <FormLabel className="text-sm font-medium flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-TERTIARY" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        End Time
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          placeholder="Enter end time here"
                          className="bg-white/10 border-white/20 focus:border-BLUE focus:ring-1 focus:ring-BLUE"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-RED text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-6 bg-gradient-to-r from-GREEN to-SECONDARY_GREEN hover:opacity-90 text-white font-semibold text-lg rounded-lg shadow-lg mt-4 transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Quiz
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default QuizForm;