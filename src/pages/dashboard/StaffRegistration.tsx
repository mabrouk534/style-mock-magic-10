
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Save, Trash2 } from "lucide-react";
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
import { Staff } from "@/types/tournament";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

// Mock data for registered staff
const initialStaff: Staff[] = [
  {
    id: "1",
    name: "أحمد محمد",
    academy: "1",
    role: "مدرب",
    nationality: "السعودية",
  },
  {
    id: "2",
    name: "سلطان العتيبي",
    academy: "1",
    role: "مدير فني",
    nationality: "السعودية",
  },
];

const formSchema = z.object({
  name: z.string().min(2, { message: "يجب إدخال اسم عضو الجهاز الفني" }),
  role: z.string().min(2, { message: "يجب إدخال المنصب" }),
  nationality: z.string().min(2, { message: "يجب إدخال الجنسية" }),
});

type FormValues = z.infer<typeof formSchema>;

const StaffRegistration = () => {
  const [staff, setStaff] = useState<Staff[]>(initialStaff);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "",
      nationality: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      const newStaffMember: Staff = {
        id: Date.now().toString(),
        name: values.name,
        academy: "1", // This would come from the authenticated user
        role: values.role,
        nationality: values.nationality,
      };

      setStaff([...staff, newStaffMember]);

      toast({
        title: "تم تسجيل عضو الجهاز الفني بنجاح",
      });

      form.reset();
      setLoading(false);
    }, 1000);
  };

  const handleDeleteStaffMember = (id: string) => {
    setStaff(staff.filter((member) => member.id !== id));
    toast({
      title: "تم حذف عضو الجهاز الفني بنجاح",
    });
  };

  return (
    <DashboardLayout title="تسجيل الجهاز الفني والإداري">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-medium mb-4 pb-2 border-b">تسجيل عضو جديد في الجهاز الفني</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم الثلاثي</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل الاسم الثلاثي" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المنصب</FormLabel>
                    <FormControl>
                      <select 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        {...field}
                      >
                        <option value="">اختر المنصب</option>
                        <option value="مدرب">مدرب</option>
                        <option value="مدير فني">مدير فني</option>
                        <option value="مدرب حراس مرمى">مدرب حراس مرمى</option>
                        <option value="مدرب لياقة">مدرب لياقة</option>
                        <option value="طبيب">طبيب</option>
                        <option value="معالج طبيعي">معالج طبيعي</option>
                        <option value="إداري">إداري</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الجنسية</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل الجنسية" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FormLabel>صورة شخصية</FormLabel>
                <div className="mt-2 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6">
                  <div className="text-center">
                    <PlusCircle className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <Button type="button" variant="outline">
                        اختر صورة
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <FormLabel>صورة جواز السفر</FormLabel>
                <div className="mt-2 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6">
                  <div className="text-center">
                    <PlusCircle className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <Button type="button" variant="outline">
                        اختر صورة
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-quattro-blue hover:bg-quattro-blue/90"
                disabled={loading}
              >
                {loading ? (
                  "جاري التسجيل..."
                ) : (
                  <>
                    <Save className="ml-2" size={18} />
                    تسجيل عضو الجهاز الفني
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">الجهاز الفني والإداري المسجل</h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>المنصب</TableHead>
                <TableHead>الجنسية</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.nationality}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteStaffMember(member.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {staff.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    لا يوجد أعضاء مسجلين في الجهاز الفني
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffRegistration;
