import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, School } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { registerUser } from "@/services/authService";
import { createAcademy } from "@/services/academyService";

const formSchema = z.object({
  academyName: z.string().min(3, { message: "اسم الأكاديمية يجب أن يكون 3 أحرف على الأقل" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  password: z.string().min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
  confirmPassword: z.string(),
  phoneNumber: z.string().min(10, { message: "رقم الهاتف غير صحيح" }),
  city: z.string().min(2, { message: "المدينة مطلوبة" }),
  country: z.string().min(2, { message: "الدولة مطلوبة" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "كلمات المرور غير متطابقة",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const RegisterAcademy = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      academyName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      city: "",
      country: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);

    try {
      // Create academy in Firestore
      const academyId = await createAcademy({
        name: values.academyName,
        country: values.country,
        coordinator: values.academyName, // Using academy name as coordinator for now
        contactNumber: values.phoneNumber,
        logo: "",
        participatingCategories: [],
        isApproved: false
      });

      // Register user with Firebase Auth
      await registerUser(values.email, values.password, {
        role: 'academy',
        academyId: academyId,
        academyName: values.academyName,
        isApproved: false
      });

      toast({
        title: "تم تسجيل الأكاديمية بنجاح",
        description: "سيتم مراجعة بياناتك والتواصل معك قريباً",
      });
      
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "فشل في التسجيل",
        description: error.message || "حدث خطأ أثناء التسجيل",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <School className="h-12 w-12 text-quattro-red" />
          </div>
          <CardTitle className="text-2xl">تسجيل أكاديمية جديدة</CardTitle>
          <CardDescription>أدخل بيانات الأكاديمية للاشتراك في بطولة كواترو</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="academyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم الأكاديمية</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل اسم الأكاديمية" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل البريد الإلكتروني" type="email" {...field} />
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
                      <FormLabel>كلمة المرور</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="أدخل كلمة المرور" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>تأكيد كلمة المرور</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="تأكيد كلمة المرور" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الهاتف</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل رقم الهاتف" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المدينة</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل اسم المدينة" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الدولة</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل اسم الدولة" {...field} />
                      </FormControl>
                      <FormDescription>
                        يجب أن تكون الأكاديمية من دول مجلس التعاون الخليجي
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex space-x-4 justify-between">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate("/")}
                >
                  العودة
                </Button>
                
                <Button 
                  type="submit" 
                  className="bg-quattro-red hover:bg-quattro-red/90"
                  disabled={loading}
                >
                  {loading ? (
                    <span>جاري التسجيل...</span>
                  ) : (
                    <span className="flex items-center">
                      تسجيل الأكاديمية
                      <ArrowRight className="mr-2" size={18} />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterAcademy;
