import { findAllBatch } from "@/api/batch/batchAPI";
import { findAllSubjects } from "@/api/subject/subjectAPI";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  subject: z.string().min(1, {
    message: "Subject is required.",
  }),
  grade: z.string().min(1, {
    message: "Grade is required.",
  }),
  batch: z.string().min(1, {
    message: "Batch is required.",
  }),
});

export type FormData2 = z.infer<typeof formSchema>;

const QuizFormTwo = ({ onSubmit }: { onSubmit: (data: FormData2) => void }) => {
  const form = useForm<FormData2>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      grade: "",
      batch: "",
    },
  });

  const [subjects, setSubjects] = useState<{ _id: string; name: string }[]>([]);
  const [batches, setBatches] = useState<{ _id: string; name: string }[]>([]);

  const getAllSubjects = async () => {
    const response = await findAllSubjects();
    setSubjects(response);
  };

  const FindAllBatches = async () => {
    const response = await findAllBatch();
    setBatches(response);
  };

  useEffect(() => {
    getAllSubjects();
    FindAllBatches();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Form Header */}
      <div className="mb-8 text-center">
        <div className="inline-block p-3 bg-GREEN/10 rounded-full mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-GREEN"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857M17 8a5 5 0 01-5-5M12 3a5 5 0 01-5 5"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-PRIMARY_TEXT">Class Details</h1>
        <p className="text-TERTIARY mt-2">
          Select the subject, grade and batch for your quiz
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
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium flex items-center gap-2 text-PRIMARY_TEXT">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-GREEN"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      Subject
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-white/5 border-white/10 focus:border-GREEN focus:ring-GREEN/30">
                        <SelectValue placeholder="Select Subject" />
                      </SelectTrigger>
                      <SelectContent className=" border-white/10">
                        {subjects.map((subject) => (
                          <SelectItem key={subject._id} value={subject._id}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-RED text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium flex items-center gap-2 text-PRIMARY_TEXT">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-GREEN"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      Grade
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-white/5 border-white/10 focus:border-GREEN focus:ring-GREEN/30">
                        <SelectValue placeholder="Select Grade" />
                      </SelectTrigger>
                      <SelectContent className=" border-white/10">
                        {[...Array(12)].map((_, i) => (
                          <SelectItem key={i} value={`G-${i + 1}`}>
                            Grade {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-RED text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="batch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium flex items-center gap-2 text-PRIMARY_TEXT">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-GREEN"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      Batch
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-white/5 border-white/10 focus:border-GREEN focus:ring-GREEN/30">
                        <SelectValue placeholder="Select Batch" />
                      </SelectTrigger>
                      <SelectContent className=" border-white/10">
                        {batches.map((batch) => (
                          <SelectItem key={batch._id} value={batch.name}>
                            {batch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-RED text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* Button Section */}
            <div className="px-6 py-4 bg-SECONDARY/80 border-t border-white/5 flex justify-between">
              <Button
                type="submit"
                className="bg-gradient-to-r from-GREEN to-SECONDARY_GREEN hover:opacity-90 text-white font-medium px-8 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                Continue
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default QuizFormTwo;
