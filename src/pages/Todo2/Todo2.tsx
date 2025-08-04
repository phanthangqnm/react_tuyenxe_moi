
import { useState, useEffect, useRef } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

import TextArea from "../../components/form/input/TextArea";
import Input from "../../components/form/input/InputField";
import PhoneInput from "../../components/form/group-input/PhoneInput";
import FileInput from "../../components/form/input/FileInput"; //file input
import Checkbox from "../../components/form/input/Checkbox";//checkbox
import Radio from "../../components/form/input/Radio";//radio
import { CalenderIcon, EyeCloseIcon, EyeIcon, TimeIcon } from "../../icons";
import DatePicker from 'react-datepicker';
import Moment from 'moment';
import { list, process_action, delete_data } from "../../api/todo2/todo.api2";
import { uploadFile } from '../../api/kho';

interface todo {
  id: number;
  user: string;
  projectname: string;
  team: string;
  status: string;
  des: string;
  email: string;
  phone: string;
  mydate: Date | null;
  myimg: number;
  myimg_url: string;
}

export default function TodoPage() {

  const vlDefault = { id: 0, user: '', projectname: '', team: '', status: '', des: '', email: '', phone: '', mydate: new Date(), myimg: 0, myimg_url: '' }

  const [vlForm, setVlFrom] = useState(vlDefault)
  const [todoList, setTodoList] = useState<todo[]>([])
  //const [selected, setSelected] = useState<string>("");
  const options = [
    { value: "Active", label: "Acvive" },
    { value: "Pending", label: "Pending" },
    { value: "Cancel", label: "Cancel" },
  ]; //combobox
  const [des, setDes] = useState("");//textarea

  const getListTodo = async () => {
    await list().then(result => {
      if (result.success == true) {
        const vl = result.data.list;
        setTodoList(vl)
      }
    })
  }

  const [email, setEmail] = useState("");//email
  const [error, setError] = useState(false);
  // Simulate a validation check
  const validateEmail = (value: string) => {
    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    setError(!isValidEmail);
    return isValidEmail;
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    validateEmail(value);
    setEmail(value); setVlFrom({ ...vlForm, email: value })
  };
  const [phone, setPhone] = useState("+1 ");//phone
  const countries = [{ code: "US", label: "+1 " }, { code: "GB", label: "+44 " }, { code: "CA", label: "+1 " }, { code: "AU", label: "+61 " },
  { code: "VN", label: "+84 " }];
  const handlePhoneNumberChange = (phoneNumber: string) => {
    setPhone(phoneNumber); setVlFrom({ ...vlForm, phone: phoneNumber })
  };
  //file input    
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState('');
  const [link, setLink] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      // Gán vào state
      setFile(file); setMsg('');
      setLink(previewURL);
    }
  };
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return setMsg("Vui lòng chọn file!");
    const formData = new FormData();
    formData.append('file', file);
    try {
      await uploadFile(formData).then(result => {
        if (result.data.success === true) {
          setMsg(result.data.message);
          setLink(result.data.link);
          setVlFrom(prev => ({ ...prev, myimg: result.data.id_img }));
          // Reset form
          formRef.current?.reset();
          fileInputRef.current!.value = "";
          setFile(null);
        } else setMsg(result.data.alert);
      });
    } catch (err) {
      setMsg("Lỗi upload!");
    }
  };
  //checkbox
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedTwo, setIsCheckedTwo] = useState(true);
  const [isCheckedDisabled, setIsCheckedDisabled] = useState(true);
  //radio
  const [selectedValue, setSelectedValue] = useState<string>("option2");
  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };
  //pass
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    getListTodo()
  }, [])

  const setUpdate = (data: any) => {
    const mydate: Date = Moment(data.mydate, "DD/MM/YYYY").toDate();
    setVlFrom({
      id: data.id,
      user: data.user,
      projectname: data.projectname,
      team: data.team,
      status: data.status,
      des: data.des,
      email: data.email,
      phone: data.phone,
      mydate: mydate,
      myimg: data.myimg,
      myimg_url: data.myimg_url
    });
    setDes(data.des); setEmail(data.email); setPhone(data.phone); setLink(data.myimg_url);
    // Reset form upload
    formRef.current?.reset();
    fileInputRef.current!.value = ""; setFile(null);
  }

  const delItem = async (id: number) => {
    const confirm = window.confirm('Bạn có chắc chắn muốn xoá mục này?');
    if (confirm) {
      await delete_data(id).then(result => {
        if (result.success == true) {
          setTodoList(prevList => {
            const newList = prevList.filter((item) => item.id !== id);
            setVlFrom(vlDefault); setDes(''); setEmail(''); setPhone('');
            return newList;
          });
        }
      })
    }
  };

  const renderList = () => {
    return (
      <>
        <hr />
        {todoList.length > 0 ?
          <div className="relative">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">STT</th>
                  <th scope="col" className="px-6 py-3 text-center">ID</th>
                  <th scope="col" className="px-6 py-3 text-center">User</th>
                  <th scope="col" className="px-6 py-3 text-center">Project Name</th>
                  <th scope="col" className="px-6 py-3 text-center">Team</th>
                  <th scope="col" className="px-6 py-3 text-center">Status</th>
                  <th scope="col" className="px-6 py-3 text-center">Email</th>
                  <th scope="col" className="px-6 py-3 text-center">Phone</th>
                  <th scope="col" className="px-6 py-3 text-center">MyDate</th>
                  <th scope="col" className="px-6 py-3 text-center">MyImg</th>
                  <th scope="col" className="px-6 py-3 text-center">Edit</th>
                </tr>
              </thead>
              <tbody>
                {
                  todoList.map((item, key) => {

                    return (
                      <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <td scope="row" className="text-gray-900 whitespace-nowrap dark:text-white text-center border">
                          <span className="text-green-600">{Number(key + 1)}</span> </td>
                        <td className="text-gray-900 whitespace-nowrap dark:text-white border">
                          {item.id} </td>
                        <td className="text-gray-900 whitespace-nowrap dark:text-white border">
                          {item.user} </td>
                        <td className="text-gray-900 whitespace-nowrap dark:text-white border">
                          {item.projectname} </td>
                        <td className="text-gray-900 whitespace-nowrap dark:text-white border">
                          {item.team} </td>
                        <td className="text-gray-900 whitespace-nowrap dark:text-white border">
                          {item.status} </td>
                        <td className="text-gray-900 whitespace-nowrap dark:text-white border">
                          {item.email} </td>
                        <td className="text-gray-900 whitespace-nowrap dark:text-white border">
                          {item.phone} </td>
                        <td className="text-gray-900 whitespace-nowrap dark:text-white border">
                          {Moment(item.mydate, "DD/MM/YYYY").format("DD/MM/YYYY")}
                        </td>
                        <td className="text-gray-900 whitespace-nowrap dark:text-white border">
                          <img src={item.myimg_url} className="w-[50px] h-[50px] object-cover rounded-full" alt="Avatar" />
                        </td>
                        <td scope="row" className="w-[20px] border p-1 text-center">
                          <span className="px-4 py-2.5 cursor-pointer text-green" onClick={() => setUpdate(item)}>Sửa</span>
                          <span className="text-red-500 px-4 py-2.5 cursor-pointer" onClick={() => delItem(item.id)}>X</span>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          :
          <div className="p-10 text-center">Chưa có todo</div>
        }
      </>
    )
  }

  const onClickButtonSave = async () => {
    const newvlform = { ...vlForm, mydate: Moment(vlForm.mydate).format("DD/MM/YYYY") };
    await process_action(newvlform).then(result => {
      if (result.success === true) {
        if (Number(vlForm.id) === 0) {
          const vl = { id: result.value.id, user: vlForm.user, projectname: vlForm.projectname, team: vlForm.team, status: vlForm.status, des: vlForm.des, email: vlForm.email, phone: vlForm.phone, mydate: vlForm.mydate, myimg: vlForm.myimg, myimg_url: link }
          setTodoList([vl, ...todoList])
          const maQG = phone.trim().split(" ")[0] + " "; setLink(''); setMsg('');
          setVlFrom(vlDefault); setDes(''); setEmail(''); setPhone(maQG);
        } else {
          setTodoList(prev =>
            prev.map(item => (item.id === vlForm.id ? { ...item, user: vlForm.user, projectname: vlForm.projectname, team: vlForm.team, status: vlForm.status, des: vlForm.des, email: vlForm.email, phone: vlForm.phone, mydate: vlForm.mydate, myimg: vlForm.myimg, myimg_url: link } : item))
          );
          const maQG = phone.trim().split(" ")[0] + " "; setLink(''); setMsg('');
          setVlFrom(vlDefault); setDes(''); setEmail(''); setPhone(maQG);
        }
      }
    })
  }
  return (
    <div>
      <PageMeta title="Quản lý todo" description="Đây là trang Quản lý todo" />
      <PageBreadcrumb pageTitle="Todo" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-3 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-5 xl:py-12">
        <div className="mx-auto w-full">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Quản lý todo
          </h3>
          <Input type='text' value={vlForm.user} onChange={(e) => setVlFrom({ ...vlForm, user: e.target.value })} placeholder="Enter user" />
          <Input type='text' value={vlForm.projectname} onChange={(e) => setVlFrom({ ...vlForm, projectname: e.target.value })} placeholder="Enter projectname" />
          <Input type='text' value={vlForm.team} onChange={(e) => setVlFrom({ ...vlForm, team: e.target.value })} placeholder="Enter team" />
          <div className="space-y-6">
            <select value={vlForm?.status ?? ""} onChange={(e) => setVlFrom({ ...vlForm, status: e.target.value })} className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
              <option value="">-- Select status --</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <>
            <TextArea value={des} onChange={(e) => { setDes(e); setVlFrom({ ...vlForm, des: e }) }} rows={2} placeholder="Enter your Description" />

            <Input type="email" value={email} error={error} onChange={handleEmailChange} placeholder="info@gmail.com"
              hint={error ? "This is an invalid email address." : ""} />
            <PhoneInput value={phone} selectPosition="start" countries={countries} placeholder="+1 (555) 000-0000" onChange={handlePhoneNumberChange}
            />
            <FileInput onChange={handleFileChange} className="custom-class" /> <hr />
          </> <hr />
          <div className="flex items-center gap-4">
            <b>Checkbox: </b>
            <div className="flex items-center gap-3">
              <Checkbox checked={isChecked} onChange={setIsChecked} label="Default" />
            </div>
            <div className="flex items-center gap-3">
              <Checkbox checked={isCheckedTwo} onChange={setIsCheckedTwo} label="Checked" />
            </div>
            <div className="flex items-center gap-3">
              <Checkbox checked={isCheckedDisabled} onChange={setIsCheckedDisabled} disabled label="Disabled" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-8"> <b>Radio button: </b>
            <Radio id="radio1" name="group1" value="option1" checked={selectedValue === "option1"} onChange={handleRadioChange} label="Default" />
            <Radio id="radio2" name="group1" value="option2" checked={selectedValue === "option2"} onChange={handleRadioChange} label="Selected" />
            <Radio id="radio3" name="group1" value="option3" checked={selectedValue === "option3"} onChange={handleRadioChange} label="Disabled" disabled={true} />
          </div>
          <div className="relative">
            <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" />
            <button onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2" >
              {showPassword ? (<EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </button>
          </div>
          <DatePicker
            selected={vlForm.mydate}
            onChange={e => setVlFrom({ ...vlForm, mydate: e ?? new Date() })}
            name="date"
            dateFormat="dd/MM/yyyy"
            className="Datepicker pa2 form-control dark:bg-dark-900 h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            placeholderText=""
            calendarClassName="rasta-stripes"
            peekNextMonth={true}
            showMonthDropdown={true}
            showYearDropdown={true}
          />
          <div>
            <form onSubmit={handleUpload} className="space-y-4" encType="multipart/form-data" ref={formRef}>
              <FileInput onChange={handleFileChange} className="custom-class" ref={fileInputRef} />
              <button type="submit" className={`inline-flex items-center justify-center gap-4 rounded-lg transition bg-green-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 px-5 py-3 text-sm mt-4`}>
                Upload </button>
              <p className={`text-red-500`}> {msg}</p>
            </form>
            <hr />
            {link && (<img src={link} className="w-[80px] h-[80px] object-cover rounded-full" alt="Avatar" />)}
          </div>
          <div className="text-right mb-5">
            <button
              className={`inline-flex items-center justify-center gap-4 rounded-lg transition bg-green-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 px-5 py-3 text-sm mt-4`}
              onClick={onClickButtonSave}>
              {vlForm.id === 0 ? 'Lưu' : 'Sửa'}
            </button>
          </div>
          <hr />
          {renderList()}
          <hr />
        </div>
      </div>
    </div>
  );
}
