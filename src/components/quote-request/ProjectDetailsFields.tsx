
import React from "react";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectDetailsFieldsProps {
  control: Control<any>;
}

export function ProjectDetailsFields({ control }: ProjectDetailsFieldsProps) {
  return (
    <>
      <FormField
        control={control}
        name="requirements"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-medium">Project Details</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your project requirements, goals, and any specific needs..." 
                className="min-h-32 border-gray-300 focus:border-blue-500 focus:ring-blue-500" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="budget"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 font-medium">Estimated Budget</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., Rs. 5,000 - 15,000" 
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="deadline"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-gray-700 font-medium">Delivery Time</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full pl-3 text-left font-normal border-gray-300 hover:border-blue-500",
                      !field.value && "text-gray-500"
                    )}
                  >
                    {field.value ? format(field.value, "PPP") : <span>Select completion date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
