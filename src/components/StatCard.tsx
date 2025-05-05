
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: string;
}

export const StatCard = ({ title, value, icon, color = "bg-quattro-blue" }: StatCardProps) => {
  return (
    <Card className="overflow-hidden h-full">
      <div className={`h-2 ${color}`} />
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
          </div>
          {icon && <div className={`p-3 rounded-full ${color} text-white`}>{icon}</div>}
        </div>
      </CardContent>
    </Card>
  );
};
