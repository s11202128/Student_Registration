import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle, Loader2 } from "lucide-react";

const schema = z.object({
  student_name: z.string().trim().min(1, "Name is required").max(100),
  student_id: z.string().trim().min(1, "Student ID is required").max(50),
  email: z.string().trim().email("Invalid email address").max(255),
  contact_number: z.string().trim().min(7, "Contact number must be at least 7 digits").max(20),
});

type FormData = z.output<typeof schema>;



export default function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      contact_number: "+679",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { error } = await supabase.from("students").insert([
        {
          student_name: data.student_name,
          student_id: data.student_id,
          email: data.email,
          contact_number: data.contact_number,
          course: "N/A",
        }
      ]);
      if (error) {
        if (error.code === "23505") {
          toast.error("A student with this ID already exists.");
        } else {
          toast.error("Registration failed. Please try again.");
        }
        return;
      }
      setSubmitted(true);
      toast.success("Registration successful!");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card className="w-full max-w-lg mx-auto animate-fade-in shadow-lg">
        <CardContent className="flex flex-col items-center py-16 gap-4">
          <div className="rounded-full bg-success/10 p-4">
            <CheckCircle className="h-12 w-12 text-success" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Registration Complete!</h2>
          <p className="text-muted-foreground text-center">Your information has been submitted successfully. You will receive a confirmation shortly.</p>
          <Button onClick={() => { setSubmitted(false); reset(); }} variant="outline" className="mt-4">
            Register Another Student
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto animate-fade-in shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-heading">Student Registration</CardTitle>
        <CardDescription>Fill in your details to complete registration</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div className="space-y-2">
            <Label htmlFor="student_name">Full Name</Label>
            <Input id="student_name" placeholder="John Doe" {...register("student_name")} />
            {errors.student_name && <p className="text-sm text-destructive">{errors.student_name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="student_id">Student ID</Label>
            <Input id="student_id" placeholder="STU-2024-001" {...register("student_id")} />
            {errors.student_id && <p className="text-sm text-destructive">{errors.student_id.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="john@university.edu" {...register("email")} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>



          <div className="space-y-2">
            <Label htmlFor="contact_number">Contact Number</Label>
            <Input id="contact_number" placeholder="+679 7899237" {...register("contact_number")} />
            {errors.contact_number && <p className="text-sm text-destructive">{errors.contact_number.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
