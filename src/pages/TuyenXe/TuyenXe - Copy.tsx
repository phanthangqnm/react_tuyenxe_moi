import { useState, useEffect, useMemo } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";

import { useAtomValue } from "jotai";
import { tuyenXeState, gioChayState, customersTuyenXeInfoState } from "../../state";
//import { Customers } from "../../types";
import { gettuyenxe, getgiochay } from "../../api/tuyenxe/index";
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

  const [customersList, setCustomersList] = useState<Customers[]>([])
  const [tuyenXe, setTuyenXe] = useState<{ value: number; label: string }[]>([])
  const [gioChay, setGioChay] = useState<{ value: number; label: string }[]>([])

  const [vlForm, setvlForm] = useState<VlForm>({
    id: 0,
    code: '1_1_22/06/2025',
    date: new Date(),
    tuyenXe_id: 0,
    giochay_id: 0,
    customers: []
  });

  //const tuyenXe = useAtomValue(tuyenXeState);
  const giochay = useAtomValue(gioChayState);


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

  useEffect(() => {
   get_list_tuyenxe()
   get_list_giochay()
  }, [])


  // const options: { value: number; label: string }[] = tuyenXe?.map(item => ({
  //   value: item.id,
  //   label: item.title ?? ''
  // }));

  const giochayOption: { value: number, label: string }[] = giochay.map(item => ({
    value: item.id,
    label: item.title
  }));


  // const handleSelectChange = (value: string) => {
  //   console.log("Selected value:", value);
  // };

  const onClickButton = () => {
    const codeNew = vlForm.tuyenXe_id + '_' + String(vlForm.giochay_id) + "_" + Moment(vlForm.date).format('DD/MM/YYYY');
    setvlForm({ ...vlForm, code: String(codeNew) })
  }

  const renderListCus = () => {
    return (
      <>
        <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
          Danh sách khách hàng
          <hr />
          {
            customersList.length > 0 ?
              'đ'
              :
              <div className="p-10 text-center">Chưa có khách hàng</div>
          }
        </h3>
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
                options={tuyenXe}
                placeholder="Chọn tuyến xe"
                //onChange={handleSelectChange}
                onChange={(value) => setvlForm({ ...vlForm, tuyenXe_id: Number(value) })}
                className="dark:bg-dark-900"
              />
            </div>
            <div className="w-full md:w-1/4 p-2">
              <Label>Chọn thời gian xuất phát</Label>
              <Select
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

        </div>
      </div>
    </div>
  );
}
