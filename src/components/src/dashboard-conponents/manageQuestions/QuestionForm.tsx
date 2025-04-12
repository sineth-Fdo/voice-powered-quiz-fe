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
    <div className="rounded-xl overflow-hidden bg-gradient-to-b from-SECONDARY to-PRIMARY/90 text-SECONDARY_TEXT shadow-lg">
      <div className="bg-gradient-to-r from-SECONDARY_BLUE to-BLUE p-4 flex items-center gap-3">
        <div className="bg-white/20 rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold">Create New Question</h1>
      </div>
      
      <div className="p-6">
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
            
            {/* Question field */}
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Question Text
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter your question here..." 
                      {...field} 
                      className="bg-white/10 border-white/20 focus:border-BLUE focus:ring-1 focus:ring-BLUE resize-none min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage className="text-RED" />
                </FormItem>
              )}
            />

            {/* Marks field */}
            <FormField
              control={form.control}
              name="marks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Question Marks
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="Enter marks"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="bg-white/10 border-white/20 focus:border-BLUE focus:ring-1 focus:ring-BLUE pl-10"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-TERTIARY">
                        #
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-RED" />
                </FormItem>
              )}
            />

            {/* Options and Correct Answer */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <FormField
                control={form.control}
                name="correctAnswer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium flex items-center gap-2 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Answer Options (Select the Correct One)
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="space-y-3"
                      >
                        {options.map((option, index) => (
                          <div 
                            key={index} 
                            className={`
                              flex items-center space-x-2 bg-white/5 rounded-lg p-2 border 
                              ${field.value === options[index]?.option 
                                ? "border-GREEN bg-GREEN/10" 
                                : "border-white/10 hover:bg-white/10"
                              }
                              transition-colors duration-200
                            `}
                          >
                            {/* Option Input */}
                            <FormField
                              control={form.control}
                              name={`options.${index}.option`}
                              render={({ field: optionField }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <div className="relative">
                                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-TERTIARY">
                                        {String.fromCharCode(65 + index)}.
                                      </div>
                                      <Input
                                        type="text"
                                        placeholder={`Option ${index + 1}`}
                                        {...optionField}
                                        className="pl-10 bg-white/10 border-transparent focus:border-BLUE focus:ring-1 focus:ring-BLUE"
                                        onChange={(e) => {
                                          optionField.onChange(e.target.value);
                                          const updatedOptions = [...options];
                                          updatedOptions[index].option = e.target.value;
                                          setOptions(updatedOptions);
                                          form.setValue("options", updatedOptions);
                                        }}
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage className="text-xs text-RED" />
                                </FormItem>
                              )}
                            />
                            
                            {/* Radio Button */}
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                className="text-SECONDARY_TEXT bg-SECONDARY border-BLUE"
                                value={options[index]?.option}
                                onClick={() => form.setValue("correctAnswer", options[index].option)}
                              />
                              
                              {/* Remove Option Button */}
                              {options.length > 2 && (
                                <Button
                                  type="button"
                                  onClick={() => removeOption(index)}
                                  className="bg-RED/80 hover:bg-RED text-white h-8 w-8 rounded-full p-0 flex items-center justify-center"
                                  title="Remove option"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                  </svg>
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage className="text-RED mt-2" />
                  </FormItem>
                )}
              />
              
              {/* Add Option Button */}
              {options.length < 5 && (
                <Button
                  type="button"
                  onClick={addOption}
                  className="mt-3 bg-SECONDARY_BLUE/80 hover:bg-SECONDARY_BLUE text-white w-full flex items-center justify-center gap-2 py-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Option
                </Button>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="bg-gradient-to-r from-SECONDARY_GREEN to-GREEN hover:opacity-90 text-white w-full py-6 text-lg font-semibold mt-6 rounded-lg flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save Question
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default QuestionForm;