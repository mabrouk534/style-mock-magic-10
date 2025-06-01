
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn, UserRound, School, UserPlus } from "lucide-react";

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
import { loginUser } from "@/services/authService";

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

  const handleSuccessfulLogin = (userData: any) => {
    localStorage.setItem("currentUser", JSON.stringify(userData));

    toast({
      title: "تم تسجيل الدخول بنجاح",
      description: "مرحباً بك في نظام بطولة كواترو",
    });

    // All users can access superadmin routes now
    navigate("/superadmin");
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);

    try {
      const userData = await loginUser(values.email, values.password);
      handleSuccessfulLogin(userData);
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "فشل تسجيل الدخول",
        description: error.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAutoAdminLogin = async () => {
    setLoading(true);
    try {
      // Create a demo admin login
      const userData = await loginUser("admin@quattro.com", "admin123");
      handleSuccessfulLogin(userData);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "فشل تسجيل الدخول",
        description: "لم يتم العثور على حساب المشرف",
      });
    } finally {
      setLoading(false);
    }
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

        <Button 
          onClick={() => navigate("/register-academy")}
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
              disabled={loading}
            >
              <UserRound className="ml-2" size={18} />
              دخول كمشرف النظام
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
