import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
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
import DashboardLayout from "@/components/DashboardLayout";
import { Academy } from "@/types/tournament";
import { academies } from "@/data";

const formSchema = z.object({
  name: z.string().min(2, { message: "يجب أن يكون الاسم على الأقل حرفين" }),
  country: z.string().min(2, { message: "يجب إدخال اسم الدولة" }),
  coordinator: z.string().min(2, { message: "يجب إدخال اسم المنسق" }),
  contactNumber: z.string().min(8, { message: "يجب إدخال رقم هاتف صحيح" }),
});

type FormValues = z.infer<typeof formSchema>;

const AcademyInfo = () => {
  const [academy, setAcademy] = useState<Academy | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      country: "",
      coordinator: "",
      contactNumber: "",
    },
  });

  useEffect(() => {
    const userStr = localStorage.getItem("currentUser");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.academyId) {
        // Find academy from mock data
        const foundAcademy = academies.find(a => a.id === user.academyId);
        if (foundAcademy) {
          setAcademy(foundAcademy);
          
          // Set form values
          form.reset({
            name: foundAcademy.name,
            country: foundAcademy.country,
            coordinator: foundAcademy.coordinator,
            contactNumber: foundAcademy.contactNumber,
          });
        }
      }
    }
  }, [form]);

  const onSubmit = (values: FormValues) => {
    setLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Update academy in mock data (this would be an API call in a real app)
      if (academy) {
        setAcademy({
          ...academy,
          name: values.name,
          country: values.country,
          coordinator: values.coordinator,
          contactNumber: values.contactNumber,
        });
      }

      toast({
        title: "تم تحديث معلومات الأكاديمية بنجاح",
      });
      setLoading(false);
    }, 1000);
  };

  if (!academy) {
    return (
      <DashboardLayout title="معلومات الأكاديمية">
        <div className="text-center py-10">جاري التحميل...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="معلومات الأكاديمية">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-quattro-blue">
            <img
              src={academy.logo}
              alt={academy.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
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
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الدولة</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل الدولة" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="coordinator"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>منسق الأكاديمية</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل اسم منسق الأكاديمية" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم التواصل</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل رقم التواصل" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-quattro-blue hover:bg-quattro-blue/90"
                disabled={loading}
              >
                {loading ? (
                  "جاري الحفظ..."
                ) : (
                  <>
                    <Save className="ml-2" size={18} />
                    حفظ التغييرات
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default AcademyInfo;
