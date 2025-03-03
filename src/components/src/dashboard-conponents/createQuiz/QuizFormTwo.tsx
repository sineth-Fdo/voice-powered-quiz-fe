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
    <div className="rounded-xl shadow-white p-8 flex flex-col space-y-6 w-[50%] bg-SECONDARY text-SECONDARY_TEXT">
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-semibold">Creating a New Quiz</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="w-[50%]">
                <FormLabel>Subject</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject._id} value={subject._id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem className="w-[50%]">
                <FormLabel>Grade</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(12)].map((_, i) => (
                      <SelectItem key={i} value={`G-${i + 1}`}>
                        Grade {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="batch"
            render={({ field }) => (
              <FormItem className="w-[50%]">
                <FormLabel>Batch</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Batch" />
                  </SelectTrigger>
                  <SelectContent>
                    {batches.map((batch) => (
                      <SelectItem key={batch._id} value={batch.name}>
                        {batch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
