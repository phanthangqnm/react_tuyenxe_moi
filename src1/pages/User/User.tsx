import { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

import 'react-datepicker/dist/react-datepicker.css';
import { loaduser } from "../../api/user/user_index";


interface Users {
  name: string;
  acc: string;
  pass: string;
  phone?: string;
}

export default function UserPage() {

  const userDefault = {
    name: '',
    acc: '',
    pass: '',
    phone: ''
  }

  const [usersList, setUsersList] = useState<Users[]>([userDefault])

  const loaduser1 = async () => {
    console.log('11111111111')
      await loaduser().then(result => {
        console.log('2222222222')
        if (result.success == true) {
        const setUsers = (newList: Users[]) => {
          const filledList = [...newList];

          // Thêm item rỗng nếu chưa đủ 3
          while (filledList.length < 3) {
            filledList.push(userDefault);
          }

          return filledList

        };
        setUsersList(setUsers(result.data.users));
        }
      })
    }

  useEffect(() => {
    loaduser1()
  }, [])

  const handleChange = (index: number, event: any, name: string) => {
    const { value } = event.target;

    setUsersList(prevList => {
      const newList = [...prevList];
      const currentItem = newList[index];

      // Cập nhật giá trị cho field được thay đổi
      newList[index] = { ...currentItem, [name]: String(value) };

      return newList;
    });
  };

  const validUserCount = usersList.filter(c => c.phone !== '').length;

  const delItem = (index: number) => {
    setUsersList(prevList => {
      const newList = prevList.filter((_, i) => i !== index);
      while (newList.length < 4) {
        newList.push(userDefault);
      }

      return newList;
    });
  };

  const renderListCus = () => {
    return (
      <>
        <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">Danh sách User: <span className="text-red-500">{validUserCount}</span> User</h3>
        <hr />
        {usersList.length > 0 ?
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">STT</th>
                  <th scope="col" className="px-6 py-3 text-center">Họ tên</th>
                  <th scope="col" className="px-6 py-3 text-center">Tài khoản</th>
                  <th scope="col" className="px-6 py-3 text-center">Mật khẩu</th>
                  <th scope="col" className="px-6 py-3 text-center">Số phone</th>
                  <th scope="col" className="px-6 py-3 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {

                  usersList.map((item, key) => {
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
                          <input value={item.acc} onChange={(e) => handleChange(key, e, 'acc')} type="text" className=" h-11 w-full rounded-none appearance-none px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-none focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800" />
                        </td>
                        <td className="text-gray-900 whitespace-nowrap dark:text-white border">
                          <input value={item.pass} onChange={(e) => handleChange(key, e, 'pass')} type="text" className=" h-11 w-full rounded-none appearance-none px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-none focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800" />
                        </td>
                        <td className="text-gray-900 whitespace-nowrap dark:text-white border">
                          <input value={item.phone} onChange={(e) => handleChange(key, e, 'phone')} type="text" className=" h-11 w-full rounded-none appearance-none px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-none focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800" />
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
          <div className="p-10 text-center">Chưa có User</div>
        }

      </>
    )
  }

  return (
    <div>      
      <PageBreadcrumb pageTitle="DANH SÁCH USER" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-3 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-5 xl:py-12">

          {renderListCus()}

          <hr />         

      </div>
    </div>
  );
}
