import { useState } from "react";

interface Customers {
  id: number;
  name?: string;
  code?: string;
  phone?: string;
  diemdon?: string;
  diemtra?: string;
  tuyenxeinfo_id?: number;
  tuyenxeinfo_code?: string;
}

export default function TuyenXePage(props: any) {

  const customerDefault = {
    id: 0,
    name: '',
    code: '',
    phone: '',
    diemdon: '',
    diemtra: '',
    tuyenxeinfo_id: 0,
    tuyenxeinfo_code: ''
  }

  const [customersList, setCustomersList] = useState<Customers[]>(props.customersList)




  const handleChange = (index: number, event: any, name: string) => {
    const { value } = event.target;

    setCustomersList(prevList => {
      const newList = [...prevList];
      const currentItem = newList[index];

      // Cập nhật giá trị cho field được thay đổi
      newList[index] = { ...currentItem, [name]: String(value) };

      return newList;
    });
  };

  const validCustomerCount = customersList.filter(c => c.phone !== '').length;

  const delItem = (index: number) => {
    setCustomersList(prevList => {
      const newList = prevList.filter((_, i) => i !== index);
      while (newList.length < 4) {
        newList.push(customerDefault);
      }

      return newList;
    });
  };

  const renderListCus = () => {
    return (
      <>
        <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">Danh sách khách hàng: <span className="text-red-500">{validCustomerCount}</span> Khách hàng</h3>
        <hr />
        {customersList.length > 0 ?

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">STT</th>
                  <th scope="col" className="px-6 py-3 text-center">Thông tin</th>
                  <th scope="col" className="px-6 py-3 text-center">Điện thoại</th>
                  <th scope="col" className="px-6 py-3 text-center">Điểm đón</th>
                  <th scope="col" className="px-6 py-3 text-center">Điểm trả</th>
                  <th scope="col" className="px-6 py-3 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {

                  customersList.map((item, key) => {
                    return (
                      <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <td
                          scope="row"
                          className="text-gray-900 whitespace-nowrap dark:text-white text-center border"
                        >
                          {Number(key + 1)}
                        </td>
                        <td className="text-gray-900 whitespace-nowrap dark:text-white border">
                          <input value={item.name} onChange={(e) => handleChange(key, e, 'name')} type="text" className=" h-11 w-full rounded-none appearance-none px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-none focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800" />
                        </td>
                        <td className="text-gray-900 whitespace-nowrap dark:text-white border">
                          <input value={item.phone} onChange={(e) => handleChange(key, e, 'phone')} type="text" className=" h-11 w-full rounded-none appearance-none px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-none focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800" />
                        </td>
                        <td className="text-gray-900 whitespace-nowrap dark:text-white border">
                          <input value={item.diemdon} onChange={(e) => handleChange(key, e, 'diemdon')} type="text" className=" h-11 w-full rounded-none appearance-none px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-none focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800" />
                        </td>
                        <td className="text-gray-900 whitespace-nowrap dark:text-white border">
                          <input value={item.diemtra} onChange={(e) => handleChange(key, e, 'diemtra')} type="text" className=" h-11 w-full rounded-none appearance-none px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-none focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800" />
                        </td>
                        <td
                          scope="row"
                          className="text-red-500 w-[20px] border p-1 text-center"
                        >
                          {item.phone !== '' && <span className="px-4 py-2.5 cursor-pointer" onClick={() => delItem(key)}>X</span>}
                        </td>
                      </tr>
                    )
                  })
                }


              </tbody>
            </table>
          </div>
          :
          <div className="p-10 text-center">Chưa có khách hàng</div>
        }

        <div className="text-right mt-10">
          <button
            onClick={() => props.saveTableCus(customersList)}
            className="bg-green-600 text-white px-4 py-2 rounded mr-1"
          >
            Lưu
          </button>
          <button
            onClick={() => props.setIsModalOpen(false)}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Đóng
          </button>
        </div>
      </>
    )
  }


  return (
    <div>
      {renderListCus()}
    </div>
  );
}
