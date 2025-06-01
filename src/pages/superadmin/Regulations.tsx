
import { useState, useEffect } from "react";
import SuperadminLayout from "@/components/SuperadminLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Save } from "lucide-react";

const Regulations = () => {
  const [regulations, setRegulations] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load existing regulations from localStorage
    const savedRegulations = localStorage.getItem("tournament-regulations");
    if (savedRegulations) {
      setRegulations(savedRegulations);
    }
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Save to localStorage for now (can be replaced with Firestore later)
      localStorage.setItem("tournament-regulations", regulations);
      
      toast({
        title: "تم حفظ اللوائح التنظيمية",
        description: "تم حفظ اللوائح التنظيمية بنجاح"
      });
    } catch (error) {
      console.error('Error saving regulations:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ في حفظ اللوائح التنظيمية",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SuperadminLayout title="اللوائح التنظيمية">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">اللوائح التنظيمية</h2>
        <p className="text-gray-600">
          إدارة وتعديل اللوائح التنظيمية للبطولة
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>محتوى اللوائح التنظيمية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={regulations}
            onChange={(e) => setRegulations(e.target.value)}
            placeholder="اكتب اللوائح التنظيمية هنا..."
            className="min-h-[500px] text-right"
            dir="rtl"
          />
          
          <div className="flex justify-end">
            <Button 
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <Save size={16} />
              <span>{loading ? "جاري الحفظ..." : "حفظ اللوائح"}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </SuperadminLayout>
  );
};

export default Regulations;
