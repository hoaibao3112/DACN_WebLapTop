"use client";

import AdminShell from "@/components/AdminShell";

export default function Dashboard() {
  const stats = [
    { label: 'Tổng doanh thu', value: '1.250.000.000₫', change: '+12.5%', icon: '💵', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Đơn hàng mới', value: '156', change: '+8.2%', icon: '🛒', color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Khách hàng mới', value: '42', change: '+5.1%', icon: '👥', color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Tỷ lệ chuyển đổi', value: '3.5%', change: '-0.4%', icon: '📈', color: 'text-red-600', bg: 'bg-red-50' },
  ];

  return (
    <AdminShell>
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Bảng Điều Khiển</h2>
            <p className="text-gray-500">Chào mừng trở lại, đây là thông tin cửa hàng của bạn hôm nay.</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center space-x-2">
            <span>📥</span>
            <span>Xuất báo cáo</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center text-2xl`}>
                  {stat.icon}
                </div>
                <span className={`text-sm font-bold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Placeholder */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-800">Thống kê doanh thu</h3>
              <select className="bg-gray-50 border-none rounded-lg text-sm font-medium focus:ring-0">
                <option>Năm 2023</option>
                <option>Năm 2024</option>
              </select>
            </div>
            <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200">
              <span className="text-gray-400 font-medium">Biểu đồ doanh thu 6 tháng gần nhất</span>
            </div>
          </div>

          {/* Side Info */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-6">Thương hiệu bán chạy</h3>
            <div className="space-y-6">
              {[
                { name: 'Apple MacBook', percentage: 35, color: 'bg-blue-600' },
                { name: 'Dell XPS/Vostro', percentage: 28, color: 'bg-blue-500' },
                { name: 'ASUS ROG/Zenbook', percentage: 20, color: 'bg-blue-400' },
                { name: 'HP Envy/Pavilion', percentage: 12, color: 'bg-blue-300' },
                { name: 'Lenovo ThinkPad', percentage: 5, color: 'bg-blue-200' },
              ].map((brand, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">{brand.name}</span>
                    <span className="text-gray-500">{brand.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`${brand.color} h-full transition-all duration-1000`}
                      style={{ width: `${brand.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 text-blue-600 text-sm font-bold hover:underline">
              Xem chi tiết phân tích
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-800">Đơn hàng mới nhất</h3>
              <button className="text-blue-600 text-sm font-bold hover:underline">Xem tất cả</button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((order) => (
                <div key={order} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-xl">
                      🛍️
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-800">#ORD-5542 - Trần Minh Tâm</p>
                      <p className="text-xs text-gray-500">2 phút trước • 1 sản phẩm</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-gray-800">19.500.000₫</p>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase">Chờ xử lý</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Products */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-800">Sản phẩm sắp hết hàng</h3>
              <button className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-xs font-bold">Cần nhập thêm</button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                  <th className="pb-4 font-medium">Tên sản phẩm</th>
                  <th className="pb-4 font-medium text-center">Kho</th>
                  <th className="pb-4 font-medium text-right">Giá bán</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { name: 'MacBook Pro 14"', stock: 2, price: '45.900.000₫' },
                  { name: 'Dell XPS 13 9315', stock: 1, price: '29.990.000₫' },
                  { name: 'ASUS ROG Zephyrus', stock: 0, price: '42.000.000₫' },
                ].map((product, index) => (
                  <tr key={index} className="border-t border-gray-50">
                    <td className="py-4 font-medium text-gray-700">{product.name}</td>
                    <td className="py-4 text-center">
                      <span className={`px-2 py-1 rounded-lg font-bold text-xs ${product.stock === 0 ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4 text-right font-bold text-gray-800">{product.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
