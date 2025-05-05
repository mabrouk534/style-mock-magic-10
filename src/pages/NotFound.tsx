
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-quattro-blue mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">عذرًا، الصفحة التي تبحث عنها غير موجودة</p>
        <Link to="/">
          <Button className="bg-quattro-blue hover:bg-quattro-blue/90">
            العودة إلى الصفحة الرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
