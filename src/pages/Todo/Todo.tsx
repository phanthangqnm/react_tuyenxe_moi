import { useState, useEffect } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

import { list, process_action, delete_data } from "../../api/todo/todo.api";

interface todo {
  id: number;
  title?: string;
}

export default function TodoPage() {

  const vlDefault = {id: 0, title: ''}

  const [vlForm, setVlFrom] = useState(vlDefault)
  const [todoList, setTodoList] = useState<todo[]>([])


  const getListTodo = async () => {
    await list()
      .then(result => {
        if (result.success == true) {
          const vl = result.data.list;
          setTodoList(vl)
        }
      })
  }

  useEffect(() => {
    getListTodo()
  }, [])

  const setUpdate = (data: any) => {
    setVlFrom({
      id: data.id,
      title: data.title
    })
  }


  const delItem = async (id: number) => {
    const confirm = window.confirm('Bạn có chắc chắn muốn xoá mục này?');
    if (confirm) {
      await delete_data(id).then(result => {
        if (result.success == true) {
          setTodoList(prevList => {
            const newList = prevList.filter((item) => item.id !== id);
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
                  <th scope="col" className="px-6 py-3 text-center">Title</th>
                  <th scope="col" className="px-6 py-3 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {
                  todoList.map((item, key) => {
                    return (
                      <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <td
                          scope="row"
                          className="text-gray-900 whitespace-nowrap dark:text-white text-center border"
                        >
                          <span className="text-green-600">{Number(key + 1)}</span>
                        </td>
                        <td className="text-gray-900 whitespace-nowrap dark:text-white border">
                          {item.id}
                        </td>
                        <td className="text-gray-900 whitespace-nowrap dark:text-white border">
                          {item.title}
                        </td>
                        <td
                          scope="row"
                          className="w-[20px] border p-1 text-center"
                        >
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
    await process_action(vlForm).then(result => {
      if (result.success === true) {
        if (Number(vlForm.id) === 0) {
          const vl = { id: result.value.id, title: vlForm.title }
          setTodoList([vl, ...todoList])
          setVlFrom(vlDefault)
        } else {
          setTodoList(prev =>
            prev.map(item => (item.id === vlForm.id ? { ...item, title: vlForm.title } : item))
          );
          setVlFrom(vlDefault)
        }

      }
    })
  }

  return (
    <div>
      <PageMeta
        title="Quản lý todo"
        description="Đây là trang Quản lý todo"
      />
      <PageBreadcrumb pageTitle="Tuyến xe" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-3 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-5 xl:py-12">
        <div className="mx-auto w-full">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Quản lý todo
          </h3>

          <input value={vlForm.title} onChange={(e) => setVlFrom({ ...vlForm, title: e.target.value })} type="text" className=" h-11 w-full px-4 py-2.5 text-sm placeholder:text-gray-400 focus:ring  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800" />
          <div className="text-right mb-5">
            <button
              className={`inline-flex items-center justify-center gap-4 rounded-lg transition bg-green-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 px-5 py-3 text-sm mt-4`}
              onClick={onClickButtonSave}
            >
              {vlForm.id === 0 ? 'Lưu' : 'Sửa'}
            </button>
          </div>
          <hr />
          {renderList()}
          <hr />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Phone
            </label>
            <div className="relative flex">
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="dark:bg-dark-900 h-11 w-full pr-[84px] rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                defaultValue={+1}
              />
              <div className="absolute right-0">
                <select className="appearance-none bg-none rounded-r-lg border-0 border-l border-gray-200 bg-transparent py-3 pl-3.5 pr-8 leading-tight text-gray-700 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-800 dark:text-gray-400">
                  <option
                    value="US"
                    className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                  >
                    US
                  </option>
                  <option
                    value="GB"
                    className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                  >
                    GB
                  </option>
                  <option
                    value="CA"
                    className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                  >
                    CA
                  </option>
                  <option
                    value="AU"
                    className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
                  >
                    AU
                  </option>
                </select>
                <div className="absolute inset-y-0 flex items-center text-gray-700 pointer-events-none right-3 dark:text-gray-400">
                  <svg
                    className="stroke-current"
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
