import { useState, useEffect, useRef } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";

//import { useAtomValue } from "jotai";
import { gettuyenxe, getgiochay, hopdonginfoGet, hopdonginfoPost, savehopdong } from "../../api/tuyenxe/index";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Moment from 'moment';
import Modal from "../../components/modal/Modal";
import Toast from "../../components/toast";

import tuyenxeLib from "./lib/tuyenxeLib"
import ReactDOMServer from 'react-dom/server';

import { number_format, numberToVietnameseWords } from '../../libs/System_lib'

import initialHtml from "./components/componentsHopDong"
import ModalCustomerList from "./components/ModalCustomerList"
import "./components/style.css"

interface VlForm {
  id: number;
  code: string;
  code_tuyenxe: string;
  date: Date | null;
  tuyenXe_id: number;
  giochay_id: number;
  benb_id: number;
  laixe_id: number;
  loaixe_id: number;
  customers: [];
  hopdong?: string;
  checkShowHD?: boolean
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
  const containerRef = useRef<HTMLDivElement>(null);

  const [titleModal, setTitleModal] = useState('');
  const [dataStyle, setDataStyle] = useState<string>('');
  const [idElement, setIdElement] = useState<string>('');
  //const [dataValue, setDataValue] = useState<string>('');
  const [urlImageCompanyName, setUrlImageCompanyName] = useState<string>('');

  const [showToast, setShowToast] = useState(false);

  const pointEmpty = '...............'

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
  const [benB, setBenB] = useState<{ value: number; label: string; code?: string; phone?: string; cccd?: string; diachi?: string }[]>([])
  const [laiXe, setLaiXe] = useState<{ value: number; label: string; phone?: string }[]>([])
  const [loaiXe, setLoaiXe] = useState<{ value: number; label: string; sochongoi?: string; bienso?: string }[]>([])

  const [vlForm, setvlForm] = useState<VlForm>({
    id: 0,
    code: '',
    code_tuyenxe: '',
    date: new Date(),
    tuyenXe_id: 0,
    giochay_id: 0,
    benb_id: 0,
    laixe_id: 0,
    loaixe_id: 0,
    customers: [],
    hopdong: '',
    checkShowHD: false
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

  const get_hopdonginfo = async () => {
    //const data = {tuyenxeinfo_code: '', hopdonginfo_code: ''}
    await hopdonginfoGet().then(result => {
      if (result.success == true) {
        const optionsBenB: { value: number; label: string; phone?: string; cccd?: string; diachi?: string }[] = (result.data.benb)?.map((item: any) => ({
          value: item.id,
          label: item.name ?? '',
          phone: item.phone,
          cccd: item.cccd,
          diachi: item.diachi
        }));
        setBenB(optionsBenB)

        const optionsLaiXe: { value: number; label: string; phone?: string; cccd?: string; diachi?: string }[] = (result.data.laixe)?.map((item: any) => ({
          value: item.id,
          label: item.name ?? '',
          phone: item.phone,
          cccd: item.cccd,
          diachi: item.diachi
        }));

        setLaiXe(optionsLaiXe)

        const optionsLoaiXe: { value: number; label: string; sochongoi?: string; bienso?: string }[] = (result.data.loaixe)?.map((item: any) => ({
          value: item.id,
          label: item.name ?? '',
          sochongoi: item.sochongoi,
          bienso: item.bienso
        }));
        setLoaiXe(optionsLoaiXe)

        setUrlImageCompanyName(result.data.imgcompanyname)
      }
    })
  }

  const getListcustomerwithcodetx = async (codehd: string, codetx: string) => {
    await hopdonginfoPost({ hopdonginfo_code: codehd, tuyenxeinfo_code: codetx }).then(result => {
      if (result.success == true) {
        const setCustomers = (newList: Customers[]) => {
          const filledList = [...newList];
          while (filledList.length < 4) {
            filledList.push(customerDefault);
          }
          return filledList
        };
        const newlist = setCustomers(result.data.customers)
        setCustomersList(newlist);
      }
    })
  }

  useEffect(() => {
    get_list_tuyenxe()
    get_list_giochay()
    get_hopdonginfo()
  }, [])

  useEffect(() => {
    getListcustomerwithcodetx(vlForm.code, vlForm.code_tuyenxe)
  }, [vlForm.code_tuyenxe])

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spans = container.querySelectorAll('.doithongtin');
    spans.forEach((span) => {
      span.addEventListener('click', () => {
        const id = span.id;
        //const dataval = span.getAttribute('data-value') || '';
        const valuestyle = span.getAttribute('data-style') || '';

        setDataStyle(valuestyle);
        setIdElement(id)
        //setDataValue(dataval)

        setTitleModal(tuyenxeLib.updateSpanTitleModal(id))
        //textContent
        if (valuestyle === 'textboxlive') {
          setEditContent(span.textContent || '');
        } else {
          setEditContent(span.innerHTML || '');
        }

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

  useEffect(() => {
    rederTableCus(customersList)
  }, [customersList]);

  const found = tuyenXe.find(item => item.value === vlForm.tuyenXe_id);
  const laixe_index = laiXe.find(item => item.value === vlForm.laixe_id);
  const loaixe_index = loaiXe.find(item => item.value === vlForm.loaixe_id);
  const benb_index = benB.find(item => item.value === vlForm.benb_id);

  //beign onclick
  const onClickButton = async () => { //chinh
    const stringDate = String(Moment(vlForm.date).format('DD/MM/YYYY'));
    const codeNew = vlForm.tuyenXe_id + '_' + String(vlForm.giochay_id) + "_" + stringDate;
    const codehd = codeNew + '_' + String(vlForm.benb_id) + '_' + String(vlForm.laixe_id) + '_' + String(vlForm.loaixe_id)


    const ngayhd = tuyenxeLib.formatDateVietnamese(stringDate)
    const formattedSoHopDong = stringDate.replace(/\//g, '') + '/' + String(vlForm.tuyenXe_id) + String(vlForm.giochay_id) + "/TSĐH-TXNĐ";

    const textLoaiXe = `Loại xe sử dụng là ${loaixe_index?.label || pointEmpty}, số chổ ${loaixe_index?.sochongoi || pointEmpty} (Chưa bao gồm nhân viên lái xe) Biển số xe: ${loaixe_index?.bienso || pointEmpty}`;

    const htmlBenB = `
          <div style="overflow: hidden;">
              <div style="float: left; width: 48%;">
                  <p>Họ và tên: <strong style="text-transform: uppercase"><span class="doithongtin" data-value="0" id="benb_name" data-style="textboxlive">${benb_index?.label || pointEmpty}</span></strong></p>
                  <p>Điện thoại: <span class="doithongtin" data-value="0" id="benb_phone" data-style="textboxlive">${benb_index?.phone || pointEmpty}</span></p>
              </div>
              <div style="float: right; width: 48%;">
                  <p>Số CMND/CCCD: <span class="doithongtin" data-value="0" id="benb_cccd" data-style="textboxlive">${benb_index?.cccd || pointEmpty}</span></p>
                  <p>Địa chỉ: <span class="doithongtin" data-value="0" id="benb_diachi" data-style="textboxlive">${benb_index?.diachi || pointEmpty}</span></p>
              </div>
          </div>
    `;


    const newHtml = tuyenxeLib.updateMultipleSpansFull(html, {
      datehopdong: {
        innerHTML: ngayhd
      },
      sohopdong: {
        innerHTML: formattedSoHopDong
      },
      tuyenxe: {
        innerHTML: found?.label || pointEmpty,
        dataValue: String(vlForm.tuyenXe_id)
      },
      laixe: {
        innerHTML: laixe_index?.label || pointEmpty,
        dataValue: String(vlForm.laixe_id)
      },
      loaixe: {
        innerHTML: textLoaiXe,
        dataValue: String(vlForm.loaixe_id)
      },
      thongtinbenb: {
        innerHTML: htmlBenB,
        dataValue: String(vlForm.benb_id)
      },
      imgcompanyname: {
        innerHTML: String(`<img src="${urlImageCompanyName}" />`),
      }
      // listkhachhang: {
      //   innerHTML: htmlStringTableCus,
      // }
    });

    setHtml(newHtml);

    const checkShowHD = (vlForm.tuyenXe_id !== 0 && vlForm.giochay_id !== 0 && vlForm.benb_id !== 0 && vlForm.laixe_id !== 0 && vlForm.loaixe_id !== 0) ? true : false
    setvlForm({ ...vlForm, code: String(codehd), code_tuyenxe: String(codeNew), checkShowHD: checkShowHD })
  }

  const rederTableCus = (listCus: Customers[]) => {
    const ComponentTableCus = () => {
      return (
        <table className="info-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontSize: '13px' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: '#f0f0f0', border: '1px solid #000', padding: '2px', 'textAlign': 'center' }}>STT</th>
              <th style={{ backgroundColor: '#f0f0f0', border: '1px solid #000', padding: '2px', 'textAlign': 'center' }}>Thông tin khách</th>
              <th style={{ backgroundColor: '#f0f0f0', border: '1px solid #000', padding: '2px', 'textAlign': 'center' }}>Số điện thoại</th>
              <th style={{ backgroundColor: '#f0f0f0', border: '1px solid #000', padding: '2px', 'textAlign': 'center' }}>Điểm đón</th>
              <th style={{ backgroundColor: '#f0f0f0', border: '1px solid #000', padding: '2px', 'textAlign': 'center' }}>Điểm trả</th>
            </tr>
          </thead>
          <tbody>
            {
              listCus.map((item, key) => {
                return (
                  <tr key={key}>
                    <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{key + 1}</td>
                    <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{item.name}</td>
                    <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{item.phone}</td>
                    <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{item.diemdon}</td>
                    <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>{item.diemtra}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      )
    }
    const htmlStringTableCus = ReactDOMServer.renderToString(<ComponentTableCus />);

    const validCustomerCount = listCus.filter(c => c.phone !== '').length;
    const tongTien = Number(validCustomerCount * 100000)

    const bangChu = numberToVietnameseWords(validCustomerCount * 100000)

    const newHtml = tuyenxeLib.updateMultipleSpansFull(html, {
      listkhachhang: {
        innerHTML: htmlStringTableCus
      },
      giatrihopdong: {
        innerHTML: String(number_format(tongTien, 0, ',', '.'))
      },
      giatrichu: {
        innerHTML: bangChu + ' đồng.'
      }
    });
    setHtml(newHtml);
  }

  const changeEditContent = (value: string) => {
    setEditContent(value)
  }

  const saveSetContentEdit = (id: string, newContent: string) => {
    if (idElement === 'tuyenxe') {
      const newHtml = tuyenxeLib.updateMultipleSpansFull(html, {
        tuyenxe: {
          innerHTML: found?.label || '',
          dataValue: String(vlForm.tuyenXe_id)
        }
      });
      setHtml(newHtml);

    } else if (idElement === 'listkhachhang') {
      rederTableCus(customersList)
    } else {
      setHtml(prevHtml => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div>${prevHtml}</div>`, 'text/html');

        const span = doc.querySelector(`#${id}`);
        if (span) span.innerHTML = newContent;

        return doc.body.querySelector('div')?.innerHTML || '';
      });

    }

    setIsModalOpen(false)

  };

  const saveTableCus = (cusList: Customers[]) => {
    rederTableCus(cusList)
    setCustomersList(cusList)
    setIsModalOpen(false)
  }

  const submitHopDong = async (style?: boolean) => {
    //savehopdong
    setShowToast(false)
    const data = { vlForm: vlForm, customersList: customersList, html: html }
    await savehopdong(data).then(result => {
      if (result.success == true) {
        setShowToast(true)
        if(style === true){
          window.open(result.data.linkFile, "PRINT", "height=600,width=800");
        }
      }
    })
  }

  //const setStyle = idElement === 'tuyenxe' ? 'saveTuyenXe' : idElement === 'listkhachhang' ? '' : '';
  const setClassWithModal = idElement === 'listkhachhang' ? `w-full sm:w-3/4 md:w-3/4 lg:w-3/4` : `w-full sm:w-3/4 md:w-1/2 lg:w-1/2`;

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
            <div className="w-full md:w-[14.2857%] p-2">
              <Label>Chọn tuyến xe</Label>
              <Select
                defaultValue={Number(vlForm.tuyenXe_id) === 0 ? '' : Number(vlForm.tuyenXe_id)}
                options={tuyenXe}
                placeholder="Chọn tuyến xe"
                onChange={(value) => setvlForm({ ...vlForm, tuyenXe_id: Number(value) })}
                className="dark:bg-dark-900"
              />
            </div>
            <div className="w-full md:w-[14.2857%] p-2">
              <Label>Thời gian xuất phát</Label>
              <Select
                value={Number(vlForm.giochay_id)}
                options={gioChay}
                placeholder="Chọn thời gian xuất phát"
                onChange={(value) => setvlForm({ ...vlForm, giochay_id: Number(value) })}
                className="dark:bg-dark-900"
              />
            </div>

            <div className="w-full md:w-[14.2857%] p-2">
              <Label>Chọn ngày</Label>
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

            <div className="w-full md:w-[14.2857%] p-2">
              <Label>Chọn bên thuê xe</Label>
              <Select
                value={Number(vlForm.benb_id)}
                options={benB}
                placeholder="Chọn bên thuê xe"
                onChange={(value) => setvlForm({ ...vlForm, benb_id: Number(value) })}
                className="dark:bg-dark-900"
              />
            </div>

            <div className="w-full md:w-[14.2857%] p-2">
              <Label>Chọn lái xe</Label>
              <Select
                value={Number(vlForm.laixe_id)}
                options={laiXe}
                placeholder="Chọn lái xe"
                onChange={(value) => setvlForm({ ...vlForm, laixe_id: Number(value) })}
                className="dark:bg-dark-900"
              />
            </div>
            <div className="w-full md:w-[14.2857%] p-2">
              <Label>Chọn loại xe</Label>
              <Select
                value={Number(vlForm.loaixe_id)}
                options={loaiXe}
                placeholder="Chọn loại xe"
                onChange={(value) => setvlForm({ ...vlForm, loaixe_id: Number(value) })}
                className="dark:bg-dark-900"
              />
            </div>

            <div className="w-full md:w-[14.2857%] p-2">
              <Label className="text-white hidden md:block">.</Label>
              <button
                className={`inline-flex items-center justify-center gap-1 rounded-lg transition bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 px-5 py-3 text-sm`}
                onClick={onClickButton}
              >
                Xem
              </button>
            </div>
          </div>

          <hr />

          {vlForm.checkShowHD === true &&
            <>
              <div
                ref={containerRef}
                dangerouslySetInnerHTML={{ __html: html }}
                className="border p-4 bg-gray-50"
              />


              <hr />

              <div className="text-right">
                <button
                  className={`inline-flex items-center justify-center gap-4 rounded-lg transition bg-green-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 px-5 py-3 text-sm mt-4 mr-3`}
                  onClick={()=>submitHopDong(false)}
                >
                  Lưu lại
                </button>
                <button
                  className={`inline-flex items-center justify-center gap-4 rounded-lg transition bg-blue-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 px-5 py-3 text-sm mt-4`}
                  onClick={()=>submitHopDong(true)}
                >
                  Lưu và xuất file
                </button>
              </div>
            </>
          }

          {showToast && <Toast message="Đã lưu thành công!" type="success" />}

          {isModalOpen &&
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} widthClass={setClassWithModal}>
              <h2 className="text-xl font-semibold mb-4">{titleModal === '' ? 'Tiêu đề' : titleModal}</h2>
              <hr />

              <div className="mb-4 mt-4 body-modal">
                {
                  dataStyle === 'textboxlive' &&
                  <textarea value={editContent} onChange={(e) => { changeEditContent(e.target.value) }} className=" h-20 w-full rounded-none appearance-none px-4 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-200 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800" />
                }


                {
                  dataStyle === 'selectboxlive' && idElement === 'tuyenxe' &&
                  <>
                    <div>
                      <Label>Chọn tuyến xe</Label>
                      <Select
                        defaultValue={Number(vlForm.tuyenXe_id) === 0 ? '' : Number(vlForm.tuyenXe_id)}
                        options={tuyenXe}
                        placeholder="Chọn tuyến xe"
                        onChange={(value) => setvlForm({ ...vlForm, tuyenXe_id: Number(value) })}
                        className="dark:bg-dark-900"
                      />
                    </div>

                    <div
                      className="border p-4 bg-gray-50 mt-5"
                      dangerouslySetInnerHTML={{ __html: found?.label || '' }}
                    />
                  </>
                }

                {
                  dataStyle === 'tablecus' && idElement === 'listkhachhang' &&
                  <ModalCustomerList customersList={customersList} setCustomersList={setCustomersList} setIsModalOpen={setIsModalOpen} saveTableCus={saveTableCus} />
                }



              </div>

              {dataStyle !== 'tablecus' && idElement !== 'listkhachhang' &&
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
              }

            </Modal>
          }

        </div>
      </div>
    </div>
  );
}
