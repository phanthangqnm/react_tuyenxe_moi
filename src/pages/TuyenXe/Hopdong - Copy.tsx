import { useState, useEffect, useRef } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";

//import { useAtomValue } from "jotai";
import { gettuyenxe, getgiochay, getcustomerwithcodetx, hopdonginfo } from "../../api/tuyenxe/index";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Moment from 'moment';
import Modal from "../../components/modal/Modal";

import tuyenxeLib from "./lib/tuyenxeLib"

import initialHtml from "./components/componentsHopDong"
import "./components/style.css"

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
  const [html, setHtml] = useState(initialHtml);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [titleModal, setTitleModal] = useState('');
  const [dataStyle, setDataStyle] = useState<string>('');
  const [idElement, setIdElement] = useState<string>('');
  const [dataValue, setDataValue] = useState<string>('');

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

  const getListcustomerwithcodetx = async () => {
    await getcustomerwithcodetx({ tuyenxeinfo_code: vlForm.code }).then(result => {
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
    getListcustomerwithcodetx()
  }, [vlForm.code])

  // Gắn listener click cho các .doithongtin sau khi render HTML
  //const na = tuyenxeLib.updateSpanContent(html, String(vlForm.giochay_id) + "_" + Moment(vlForm.date).format('DD/MM/YYYY'), 'datehopdong');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spans = container.querySelectorAll('.doithongtin');
    spans.forEach((span, index) => {
      span.addEventListener('click', () => {
        const id = span.id;
        const dataval = span.getAttribute('data-value') || '';
        const valuestyle = span.getAttribute('data-style') || '';

        setDataStyle(valuestyle);
        setIdElement(id)
        setDataValue(dataval)

        setTitleModal(tuyenxeLib.updateSpanTitleModal(id))
        //textContent
        if (valuestyle === 'textboxlive') {
          setEditContent(span.textContent || '');
        } else {
          setEditContent(span.innerHTML || '');
        }

        setTargetIndex(index);
        setIsModalOpen(true);
      });
    });

    // Cleanup để tránh gắn nhiều lần
    return () => {
      spans.forEach((span) => {
        span.replaceWith(span.cloneNode(true));
      });
    };


  }, [html]);



  const onClickButton = () => {
    const stringDate = String(Moment(vlForm.date).format('DD/MM/YYYY'));
    const codeNew = vlForm.tuyenXe_id + '_' + String(vlForm.giochay_id) + "_" + stringDate;

    const ngayhd = tuyenxeLib.formatDateVietnamese(stringDate)
    //saveSetContentEdit('datehopdong', ngayhd)

    const formattedDate = stringDate.replace(/\//g, '');
    //saveSetContentEdit('sohopdong', formattedDate + '/' + String(vlForm.tuyenXe_id) + String(vlForm.giochay_id) + "/TSĐH-TXNĐ")

    const found = tuyenXe.find(item => item.value === vlForm.tuyenXe_id);
    //saveSetContentEdit('tuyenxe', found ? found.label : '')

    const newHtmlSpan = tuyenxeLib.updateMultipleSpans(html, {
      datehopdong: ngayhd,
      sohopdong: formattedDate + '/' + String(vlForm.tuyenXe_id) + String(vlForm.giochay_id) + "/TSĐH-TXNĐ",
      tuyenxe: found ? found.label : ''
    });

    setHtml(String(newHtmlSpan))

    const newHtml = tuyenxeLib.updateMultipleSpanDataValues(html, {
      tuyenxe: String(vlForm.tuyenXe_id),
      // datehopdong: '25062025',
      // daidien: '123' // thêm bao nhiêu cũng được
    });

    //setHtml(String(newHtml))

    setvlForm({ ...vlForm, code: String(codeNew) })
  }

  const changeEditContent = (value: string) => {
    setEditContent(value)
  }

  // const saveSetContentEdit = (idE: string, editContent: any) => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');

  //   const span = doc.querySelector(`#${idE}`);
  //   if (span) {
  //     span.innerHTML = editContent;
  //   }

  //   const htmlNew = doc.body.innerHTML;
  //   setHtml(htmlNew || '');
  //   setIsModalOpen(false)
  // }

  const saveSetContentEdit = (id: string, newContent: string) => {
    setHtml(prevHtml => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(`<div>${prevHtml}</div>`, 'text/html');

      const span = doc.querySelector(`#${id}`);
      if (span) span.innerHTML = newContent;

      return doc.body.querySelector('div')?.innerHTML || '';
    });
    setIsModalOpen(false)
  };


  return (
    <div>
      <PageMeta
        title="Quản lý hợp đồng"
        description="Đây là trang Quản lý hợp đồng"
      />
      <PageBreadcrumb pageTitle="Hợp đồng" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-3 py-1 dark:border-gray-800 dark:bg-white/[0.03] xl:px-5 xl:py-5">
        <div className="mx-auto w-full">
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

          {/* {renderListCus()} */}

          <hr />

          <div
            ref={containerRef}
            dangerouslySetInnerHTML={{ __html: html }}
            className="border p-4 bg-gray-50"
          />
          <hr />

          <div className="text-right">
            <button
              className={`inline-flex items-center justify-center gap-4 rounded-lg transition bg-green-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 px-5 py-3 text-sm mt-4`}
              onClick={onClickButton}
            >
              Lưu tất cả
            </button>
          </div>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2 className="text-xl font-semibold mb-4">{titleModal === '' ? 'Tiêu đề' : titleModal}</h2>
            <hr />
            <p className="mb-4 mt-4">
              {
                dataStyle === 'textboxlive' &&
                <input value={editContent} onChange={(e) => { changeEditContent(e.target.value) }} type="text" className=" h-11 w-full rounded-none appearance-none px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-none focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800" />
              }

              {
                dataStyle === 'selectboxlive' && idElement === 'tuyenxe' &&
                <>
                  <Label>Chọn tuyến xe</Label>
                  <Select
                    value={Number(vlForm.giochay_id)}
                    options={tuyenXe}
                    placeholder="Chọn tuyến xe"
                    onChange={(value) => setvlForm({ ...vlForm, giochay_id: Number(value) })}
                    className="dark:bg-dark-900"
                  />
                  <hr />
                  <div
                    dangerouslySetInnerHTML={{ __html: editContent }}
                    className="border p-4 bg-gray-50 mt-5"
                  />
                </>
              }

            </p>
            <div className="text-right">
              <button
                onClick={() => saveSetContentEdit(idElement, editContent)}
                className="bg-green-600 text-white px-4 py-2 rounded mr-1"
              >
                Lưu
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Đóng
              </button>
            </div>

          </Modal>

        </div>
      </div>
    </div>
  );
}
