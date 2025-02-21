"use client";

import { createBatch, findAllBatch } from "@/api/batch/batchAPI";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email.",
    }),
    name: z.string().min(4, {
      message: "Name must be at least 4 characters.",
    }),
    password: z.string().min(4, {
      message: "Password must be at least 4 characters.",
    }),
    role: z.enum(["student", "teacher", "admin"], {
      message: "Role is required.",
    }),
    grade: z.string().optional(),
    batch: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.role === "student") {
        return !!data.grade && !!data.batch;
      }
      return true;
    },
    {
      message: "Grade and Batch are required for students.",
      path: ["grade", "batch"],
    }
  );

export type FormData = z.infer<typeof formSchema>;

const FormSection = ({ onSubmit }: { onSubmit: (data: FormData) => void }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      role: "student",
      grade: "",
      batch: "",
    },
  });

  const role = useWatch({ control: form.control, name: "role" });

  const { toast } = useToast();
  const [batches, setBatches] = useState<{ _id: string; name: string }[]>([]);
  const [batchName, setBatchName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // fetch all batches
  const FindAllBatches = async () => {
    const response = await findAllBatch();
    setBatches(response);
  };

  // Add a new batch
  const AddNewBatch = async (name: string) => {
    const response = await createBatch(name);
    if (response.error) {
      toast({
        title: "Failed",
        description: `Batch creation failed`,
        duration: 5000,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Done",
      description: `Batch created successfully`,
      duration: 5000,
      variant: "default",
      className: "bg-GREEN text-PRIMARY_TEXT",
    });

    FindAllBatches();
  };

  useEffect(() => {
    FindAllBatches();
  }, []);

  return (
    <div className=" rounded-xl shadow-white p-8 min-w-[30%] md:min-w-[80%] lg:min-w-[50%] flex flex-col space-y-6 bg-SECONDARY text-SECONDARY_TEXT">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-semibold">Register</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            if (data.role !== "student") {
              delete data.grade;
              delete data.batch;
            }
            onSubmit(data);
            form.reset();
          })}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter Your Email here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter Your Name here"
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
                    placeholder="Enter Your password here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {role === "student" && (
            <>
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
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

              <div className=" flex items-end">
                <FormField
                  control={form.control}
                  name="batch"
                  render={({ field }) => (
                    <FormItem className="w-[80%]">
                      <FormLabel>Batch</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
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

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger
                    onClick={() => setIsDialogOpen(true)}
                    className=" w-[20%] h-[100%] flex items-center justify-center"
                  >
                    <div className="bg-SECONDARY_BLUE hover:bg-BLUE text-white text-sm w-[100%] h-8 ml-2 flex justify-center items-center rounded-md ">
                      Add
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-[40%] bg-PRIMARY border border-[#545454]">
                    <DialogHeader>
                      <DialogTitle className="text-PRIMARY_TEXT">
                        Add a New Batch
                      </DialogTitle>
                      <div>
                        {" "}
                        <div className="flex justify-between items-center py-2">
                          <Input
                            type="text"
                            placeholder="Enter Your Batch here example: 2021"
                            className="w-[70%] text-PRIMARY_TEXT"
                            onChange={(e) => {
                              const value = e.target.value;
                              setBatchName(value);
                            }}
                          />
                          <Button
                            className="bg-GREEN hover:bg-SECONDARY_GREEN text-white w-[20%]"
                            onClick={() => {
                              AddNewBatch(batchName);
                              setBatchName("");
                            }}
                          >
                            Add
                          </Button>
                        </div>
                      </div>{" "}
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </>
          )}

          <Button
            type="submit"
            className="bg-GREEN hover:bg-SECONDARY_GREEN text-white w-[100%]"
          >
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormSection;
