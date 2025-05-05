
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
import { Player } from "@/types/tournament";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

// Mock data for registered players
const initialPlayers: Player[] = [
  {
    id: "1",
    name: "محمد الشهري",
    academy: "1",
    category: "تحت 14 سنة",
    dateOfBirth: "2010-05-15",
    goals: 0,
    yellowCards: 0,
    redCards: 0,
    position: "مهاجم",
    jerseyNumber: 10,
    nationality: "السعودية",
  },
  {
    id: "2",
    name: "عبدالله العمري",
    academy: "1",
    category: "تحت 16 سنة",
    dateOfBirth: "2008-08-22",
    goals: 0,
    yellowCards: 0,
    redCards: 0,
    position: "وسط",
    jerseyNumber: 8,
    nationality: "السعودية",
  },
];

const formSchema = z.object({
  name: z.string().min(2, { message: "يجب إدخال اسم اللاعب" }),
  dateOfBirth: z.string().min(1, { message: "يجب إدخال تاريخ الميلاد" }),
  nationality: z.string().min(2, { message: "يجب إدخال الجنسية" }),
  category: z.string().min(1, { message: "يجب اختيار الفئة العمرية" }),
  position: z.string().min(1, { message: "يجب إدخال المركز" }),
  jerseyNumber: z.string().refine((val) => !isNaN(Number(val)), {
    message: "يجب أن يكون رقم القميص رقماً",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const PlayerRegistration = () => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dateOfBirth: "",
      nationality: "",
      category: "",
      position: "",
      jerseyNumber: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: values.name,
        academy: "1", // This would come from the authenticated user
        category: values.category,
        dateOfBirth: values.dateOfBirth,
        goals: 0,
        yellowCards: 0,
        redCards: 0,
        position: values.position,
        jerseyNumber: parseInt(values.jerseyNumber),
        nationality: values.nationality,
      };

      setPlayers([...players, newPlayer]);

      toast({
        title: "تم تسجيل اللاعب بنجاح",
      });

      form.reset();
      setLoading(false);
    }, 1000);
  };

  const handleDeletePlayer = (id: string) => {
    setPlayers(players.filter((player) => player.id !== id));
    toast({
      title: "تم حذف اللاعب بنجاح",
    });
  };

  return (
    <DashboardLayout title="تسجيل اللاعبين">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-medium mb-4 pb-2 border-b">تسجيل لاعب جديد</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم اللاعب الثلاثي</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل اسم اللاعب" {...field} />
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

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تاريخ الميلاد</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الفئة العمرية</FormLabel>
                    <FormControl>
                      <select 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        {...field}
                      >
                        <option value="">اختر الفئة</option>
                        <option value="تحت 14 سنة">تحت 14 سنة</option>
                        <option value="تحت 16 سنة">تحت 16 سنة</option>
                        <option value="تحت 18 سنة">تحت 18 سنة</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المركز</FormLabel>
                    <FormControl>
                      <select 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        {...field}
                      >
                        <option value="">اختر المركز</option>
                        <option value="حارس مرمى">حارس مرمى</option>
                        <option value="مدافع">مدافع</option>
                        <option value="وسط">وسط</option>
                        <option value="مهاجم">مهاجم</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jerseyNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم القميص</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="أدخل رقم القميص" {...field} />
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
                    تسجيل اللاعب
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Players Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">اللاعبون المسجلون</h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم اللاعب</TableHead>
                <TableHead>الفئة العمرية</TableHead>
                <TableHead>تاريخ الميلاد</TableHead>
                <TableHead>الجنسية</TableHead>
                <TableHead>المركز</TableHead>
                <TableHead>رقم القميص</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player) => (
                <TableRow key={player.id}>
                  <TableCell>{player.name}</TableCell>
                  <TableCell>{player.category}</TableCell>
                  <TableCell>{player.dateOfBirth}</TableCell>
                  <TableCell>{player.nationality}</TableCell>
                  <TableCell>{player.position}</TableCell>
                  <TableCell>{player.jerseyNumber}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeletePlayer(player.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {players.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    لا يوجد لاعبين مسجلين
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

export default PlayerRegistration;
