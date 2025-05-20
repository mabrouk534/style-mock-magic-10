
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn, UserRound, School, UserPlus, Mail } from "lucide-react";

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
  { id: "4", email: "google_user@gmail.com", password: "", role: "academy", academyId: "3" },
];

const formSchema = z.object({
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  password: z.string().min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
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

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    
    // Simulate Google OAuth login with timeout
    setTimeout(() => {
      // Here we're using a mock user with a Google email
      const googleUser = mockUsers.find(user => user.email === "google_user@gmail.com");
      
      if (googleUser) {
        handleSuccessfulLogin(googleUser);
        toast({
          title: "تم تسجيل الدخول باستخدام Google",
          description: "تم تسجيل الدخول بنجاح باستخدام حساب Google",
        });
      } else {
        toast({
          variant: "destructive",
          title: "فشل تسجيل الدخول",
          description: "حدث خطأ أثناء محاولة تسجيل الدخول باستخدام Google",
        });
      }
      
      setGoogleLoading(false);
    }, 1500);
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

  const handleAutoAcademyLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const academyUser = mockUsers.find(user => user.role === "academy");
      if (academyUser) {
        handleSuccessfulLogin(academyUser);
      }
      setLoading(false);
    }, 500);
  };

  const handleRegisterAcademy = () => {
    // This is a placeholder - in a real app it would navigate to a registration page
    navigate("/register-academy");
    toast({
      title: "صفحة التسجيل",
      description: "انتقال إلى صفحة تسجيل أكاديمية جديدة",
    });
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
              className="w-full bg-quattro-red hover:bg-quattro-red/90"
              disabled={loading || googleLoading}
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

        <div className="relative mt-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300"></span>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">أو</span>
          </div>
        </div>
        
        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full border border-gray-300 flex items-center justify-center gap-2"
          disabled={loading || googleLoading}
        >
          {googleLoading ? (
            <span>جاري تسجيل الدخول...</span>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg>
              <span>تسجيل الدخول باستخدام Google</span>
            </>
          )}
        </Button>

        <Button 
          onClick={handleRegisterAcademy}
          variant="outline" 
          className="w-full border-quattro-red text-quattro-red hover:bg-quattro-red/10 mt-4"
        >
          <UserPlus className="ml-2" size={18} />
          تسجيل أكاديمية جديدة
        </Button>

        <div className="pt-4">
          <Separator className="my-4" />
          <div className="text-center text-sm mb-4 text-gray-500">
            تسجيل دخول سريع للتجربة
          </div>
          <div className="space-y-3">
            <Button 
              onClick={handleAutoAdminLogin} 
              variant="outline" 
              className="w-full border-quattro-red text-quattro-red hover:bg-quattro-red/10"
              disabled={loading || googleLoading}
            >
              <UserRound className="ml-2" size={18} />
              دخول كمشرف النظام
            </Button>
            
            <Button 
              onClick={handleAutoAcademyLogin} 
              variant="outline" 
              className="w-full border-quattro-red text-quattro-red hover:bg-quattro-red/10"
              disabled={loading || googleLoading}
            >
              <School className="ml-2" size={18} />
              تسجيل كأكاديمية
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
