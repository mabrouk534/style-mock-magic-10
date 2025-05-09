
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn, UserRound } from "lucide-react";

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
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

// Dummy users for mock data
const mockUsers = [
  { id: "1", email: "admin@quattro.com", password: "admin123", role: "admin", academyId: null },
  { id: "2", email: "alhilal@academy.com", password: "alhilal123", role: "academy", academyId: "1" },
  { id: "3", email: "alnassr@academy.com", password: "alnassr123", role: "academy", academyId: "2" },
];

const formSchema = z.object({
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  password: z.string().min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSuccessfulLogin = (user: any) => {
    // Store user info in localStorage
    localStorage.setItem("currentUser", JSON.stringify({
      id: user.id,
      email: user.email,
      role: user.role,
      academyId: user.academyId,
    }));

    toast({
      title: "تم تسجيل الدخول بنجاح",
      description: "مرحباً بك في نظام بطولة كواترو",
    });

    if (user.role === "admin") {
      navigate("/superadmin");
    } else {
      navigate("/dashboard");
    }
  };

  const onSubmit = (values: FormValues) => {
    setLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      const user = mockUsers.find(
        (user) => user.email === values.email && user.password === values.password
      );

      if (user) {
        handleSuccessfulLogin(user);
      } else {
        toast({
          variant: "destructive",
          title: "فشل تسجيل الدخول",
          description: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
        });
      }
      
      setLoading(false);
    }, 1000);
  };

  const handleAutoAdminLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const adminUser = mockUsers.find(user => user.role === "admin");
      if (adminUser) {
        handleSuccessfulLogin(adminUser);
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <img 
            src="/lovable-uploads/0bba4204-75a2-4450-816b-bd2b6f469e00.png" 
            alt="Quattro Logo" 
            className="mx-auto h-16 w-16"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">تسجيل الدخول</h2>
          <p className="mt-2 text-sm text-gray-600">
            قم بتسجيل الدخول للوصول إلى لوحة التحكم
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>البريد الإلكتروني</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل البريد الإلكتروني" {...field} />
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
            
            <Button 
              type="submit" 
              className="w-full bg-quattro-blue hover:bg-quattro-blue/90"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">جاري تسجيل الدخول...</span>
              ) : (
                <span className="flex items-center">
                  <LogIn className="ml-2" size={18} />
                  تسجيل الدخول
                </span>
              )}
            </Button>
          </form>
        </Form>

        <div className="pt-4">
          <Separator className="my-4" />
          <div className="text-center text-sm mb-4 text-gray-500">
            تسجيل دخول سريع للتجربة
          </div>
          <Button 
            onClick={handleAutoAdminLogin} 
            variant="outline" 
            className="w-full border-quattro-blue text-quattro-blue hover:bg-quattro-blue/10"
            disabled={loading}
          >
            <UserRound className="ml-2" size={18} />
            دخول كمشرف النظام
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
