
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Academy } from '@/types/tournament';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TeamCardProps {
  academy: Academy;
}

export const TeamCard = ({ academy }: TeamCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-quattro-blue text-white py-2 px-4 flex justify-center">
        <h3 className="text-lg font-bold">{academy.name}</h3>
      </CardHeader>
      <CardContent className="p-6 flex flex-col items-center">
        <img 
          src={academy.logo} 
          alt={academy.name} 
          className="w-24 h-24 object-contain mb-4"
        />
        <div className="text-center mb-4">
          <p className="text-gray-600 mb-1"><strong>الدولة:</strong> {academy.country}</p>
          <p className="text-gray-600 mb-1"><strong>المنسق:</strong> {academy.coordinator}</p>
          <p className="text-gray-600 mb-1"><strong>رقم التواصل:</strong> {academy.contactNumber}</p>
        </div>
        <div className="mb-4">
          <h4 className="font-bold text-md mb-2">الفئات المشاركة:</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {academy.participatingCategories.map((category) => (
              <span key={category} className="bg-quattro-gray px-2 py-1 rounded-md text-sm">
                {category}
              </span>
            ))}
          </div>
        </div>
        <Link to={`/team/${academy.id}`}>
          <Button className="bg-quattro-blue hover:bg-quattro-blue/90">عرض التفاصيل</Button>
        </Link>
      </CardContent>
    </Card>
  );
};
