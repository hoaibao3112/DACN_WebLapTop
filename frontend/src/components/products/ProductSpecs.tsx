import React from 'react';
import { TechnicalSpec } from '@/lib/types';
import Card from '@/components/ui/Card';

interface ProductSpecsProps {
  specs: TechnicalSpec[];
}

const ProductSpecs: React.FC<ProductSpecsProps> = ({ specs }) => {
  if (!specs || specs.length === 0) {
    return null;
  }

  return (
    <Card>
      <h2 className="text-xl font-bold mb-4">Thông số kỹ thuật</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            {specs.map((spec, index) => (
              <tr
                key={spec.ma_thong_so}
                className={`border-b last:border-b-0 ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <td className="py-3 px-4 font-medium text-gray-700 w-1/3">
                  {spec.ten_thong_so}
                </td>
                <td className="py-3 px-4 text-gray-900">
                  {spec.gia_tri}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ProductSpecs;
