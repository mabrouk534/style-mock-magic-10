
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { TeamCard } from '@/components/TeamCard';
import { academies } from '@/data';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Teams = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  // Get unique countries from academies
  const countries = [...new Set(academies.map(academy => academy.country))];

  // Filter academies based on search term and selected country
  const filteredAcademies = academies.filter(academy => {
    const matchesSearch = academy.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry ? academy.country === selectedCountry : true;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">الفرق المشاركة</h1>
        
        {/* Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-3 text-gray-400" size={20} />
            <Input
              className="pl-4 pr-10"
              placeholder="ابحث عن فريق..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="p-2 border rounded-md w-full md:w-48"
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
          >
            <option value="">جميع الدول</option>
            {countries.map((country, index) => (
              <option key={`country-${index}`} value={String(country)}>
                {String(country)}
              </option>
            ))}
          </select>
        </div>
        
        {/* Teams Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAcademies.map(academy => (
            <TeamCard key={academy.id} academy={academy} />
          ))}
          
          {filteredAcademies.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">لم يتم العثور على أكاديميات مطابقة للبحث</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teams;
