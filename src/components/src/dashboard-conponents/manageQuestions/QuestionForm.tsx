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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  question: z.string().min(3, {
    message: "Question is required.",
  }),
  marks: z.number().int().positive({
    message: "Marks is required.",
  }),
  options: z
    .array(
      z.object({
        option: z.string().min(1, { message: "Option is required." }),
      })
    )
    .min(2, { message: "At least 2 options are required." }),
  correctAnswer: z.string().min(1, {
    message: "Please select a correct answer.",
  }),
});

export type QuestionFormData = z.infer<typeof formSchema>;

const QuestionForm = ({
  onSubmit,
}: {
  onSubmit: (data: QuestionFormData) => void;
}) => {
  const [options, setOptions] = useState<{ option: string }[]>([
    { option: "" },
    { option: "" },
  ]);

  const form = useForm<QuestionFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      marks: 0,
      options: [{ option: "" }, { option: "" }],
      correctAnswer: "",
    },
  });

  const addOption = () => {
    if (options.length < 5) {
      const newOptions = [...options, { option: "" }];
      setOptions(newOptions);
      form.setValue("options", newOptions);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const updatedOptions = options.filter((_, i) => i !== index);
      setOptions(updatedOptions);
      form.setValue("options", updatedOptions);

      const correctAnswer = form.getValues("correctAnswer");
      if (correctAnswer === options[index].option) {
        form.setValue("correctAnswer", "");
      }
    }
  };

  return (
    <div className="rounded-xl shadow-white p-8 flex flex-col space-y-6 w-[60%] bg-SECONDARY text-SECONDARY_TEXT">
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-semibold">Add New Question</h1>
      </div>
      <Form {...form}>
        <form 
          onSubmit={
            form.handleSubmit((data) => {
              onSubmit(data);
              form.reset({
                question: "",
                marks: 0,
                options: [{ option: "" }, { option: "" }], 
                correctAnswer: "",
              });
            
              setOptions([{ option: "" }, { option: "" }]); 
            })
          } 
          className="space-y-6">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter question here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="marks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marks</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter marks here"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="correctAnswer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select the Correct Answer</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="space-y-2"
                  >
                    {options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <FormField
                          control={form.control}
                          name={`options.${index}.option`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder={`Option ${index + 1}`}
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e.target.value);
                                    const updatedOptions = [...options];
                                    updatedOptions[index].option =
                                      e.target.value;
                                    setOptions(updatedOptions);
                                    form.setValue("options", updatedOptions);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <RadioGroupItem
                          className="text-SECONDARY_TEXT bg-SECONDARY border-BLUE"
                          value={options[index]?.option}
                          onClick={() =>
                            form.setValue("correctAnswer", options[index].option)
                          }
                        />
                        {options.length > 2 && (
                          <Button
                            type="button"
                            onClick={() => removeOption(index)}
                            className="bg-red-500 text-white"
                          >
                            -
                          </Button>
                        )}
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            onClick={addOption}
            className="bg-SECONDARY_BLUE text-white w-full"
          >
            + Add Option
          </Button>

          <Button
            type="submit"
            className="bg-GREEN hover:bg-SECONDARY_GREEN text-white w-full"
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default QuestionForm;
