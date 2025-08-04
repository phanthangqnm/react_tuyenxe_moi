import { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";

//import { useAtomValue } from "jotai";
import { gettuyenxe, getgiochay, getcustomerwithcodetx } from "../../api/tuyenxe/index";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Moment from 'moment';

interface VlForm {
  id: number;
  code: string;
  date: Date | null;
  tuyenXe_id: number;
  giochay_id: number;
  customers: string[];
}

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

export default function TuyenXePage() {

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

  const [customersList, setCustomersList] = useState<Customers[]>([customerDefault])
  const [tuyenXe, setTuyenXe] = useState<{ value: number; label: string }[]>([])
  const [gioChay, setGioChay] = useState<{ value: number; label: string }[]>([])

  const [vlForm, setvlForm] = useState<VlForm>({
    id: 0,
    code: '',
    date: new Date(),
    tuyenXe_id: 0,
    giochay_id: 0,
    customers: []
  });


  const get_list_tuyenxe = async () => {
    await gettuyenxe()
      .then(result => {
        if (result.success == true) {
          const gettx = result.data.tuyenxe;
          const options: { value: number; label: string }[] = gettx?.map((item: any) => ({
            value: item.id,
            label: item.title ?? ''
          }));
          setTuyenXe(options)
        }
      })
  }

  const get_list_giochay = async () => {
    await getgiochay().then(result => {
      if (result.success == true) {
        const gettx = result.data.giochay;
        const options: { value: number; label: string }[] = gettx?.map((item: any) => ({
          value: item.id,
          label: item.title ?? ''
        }));
        setGioChay(options)
      }
    })
  }

  const getListcustomerwithcodetx = async (code: string) => {
    await getcustomerwithcodetx({ tuyenxeinfo_code: code }).then(result => {
      if (result.success == true) {
        //setCustomersList(result.data.customers)

        const setCustomers = (newList: Customers[]) => {
          const filledList = [...newList];

          // Thêm item rỗng nếu chưa đủ 4
          while (filledList.length < 4) {
            filledList.push(customerDefault);
          }

          return filledList

        };

        setCustomersList(setCustomers(result.data.customers));
      }
    })
  }

  useEffect(() => {
    get_list_tuyenxe()
    get_list_giochay()
  }, [])

  useEffect(() => {
    getListcustomerwithcodetx(vlForm.code)
  }, [vlForm.code])

  const onClickButton = () => {
    const codeNew = vlForm.tuyenXe_id + '_' + String(vlForm.giochay_id) + "_" + Moment(vlForm.date).format('DD/MM/YYYY');
    setvlForm({ ...vlForm, code: String(codeNew) })
  }


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



      </>
    )
  }


  return (
    <div>
      <PageMeta
        title="Quản lý tuyến xe"
        description="Đây là trang Quản lý tuyến xe"
      />
      <PageBreadcrumb pageTitle="Tuyến xe" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-3 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-5 xl:py-12">
        <div className="mx-auto w-full">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Quản lý tuyến xe
          </h3>

          <div className="flex flex-wrap">
            <div className="w-full md:w-1/4 p-2">
              <Label>Chọn tuyến xe</Label>
              <Select
                value={Number(vlForm.tuyenXe_id)}
                options={tuyenXe}
                placeholder="Chọn tuyến xe"
                onChange={(value) => setvlForm({ ...vlForm, tuyenXe_id: Number(value) })}
                className="dark:bg-dark-900"
              />
            </div>
            <div className="w-full md:w-1/4 p-2">
              <Label>Chọn thời gian xuất phát</Label>
              <Select
                value={Number(vlForm.giochay_id)}
                options={gioChay}
                placeholder="Chọn thời gian xuất phát"
                onChange={(value) => setvlForm({ ...vlForm, giochay_id: Number(value) })}
                className="dark:bg-dark-900"
              />
            </div>

            <div className="w-full md:w-1/4 p-2">
              <Label>Chọn thời gian xuất phát</Label>
              <DatePicker
                selected={vlForm.date}
                onChange={date => setvlForm({ ...vlForm, date: date as Date | null })}
                name="date"
                dateFormat="dd/MM/yyyy"
                //maxDate={new Date()}
                className="Datepicker pa2 form-control dark:bg-dark-900 h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                placeholderText=""
                calendarClassName="rasta-stripes"
                peekNextMonth={true}
                showMonthDropdown={true}
                showYearDropdown={true}
              />
            </div>

            <div className="w-full md:w-1/4 p-2">
              <Label className="text-white hidden md:block">.</Label>
              <button
                className={`inline-flex items-center justify-center gap-1 rounded-lg transition bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 px-5 py-3 text-sm`}
                onClick={onClickButton}
              >
                Xem
              </button>
            </div>
          </div>

          {renderListCus()}

          <hr />
          <div className="text-right">
            <button
              className={`inline-flex items-center justify-center gap-4 rounded-lg transition bg-green-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 px-5 py-3 text-sm mt-4`}
              onClick={onClickButton}
            >
              Lưu tất cả
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
