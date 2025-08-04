import { useState, useEffect } from 'react';
import packageJson from "../../package.json";
import Modal from "../components/modal/Modal";
import Toast from "../components/toast";

const CheckUpdateVersion = () => {
    const [showHideModal, setshowHideModal] = useState(false);
    const [loading_action, setloading_action] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const running = true
    //const [running, setRunning] = useState(true);
    const [completed, setcompleted] = useState(0);
    const bgcolor = '#00695c'
    //const [bgcolor, setbgcolor] = useState('#00695c');

    useEffect(() => {
        checkVersion()
    }, [])

    const checkVersion = () => {
        let version = localStorage.getItem('version_app');
        if (!version) {
            localStorage.setItem('version_app', packageJson.version);
        } else {
            if (version !== packageJson.version) {
                setshowHideModal(true)
            }
        }

    }

    const toggleModal = () => {
        setshowHideModal(!showHideModal)
    }

    const ProgressBar = (props: any) => {
        const { bgcolor, completed } = props;

        const containerStyles: React.CSSProperties = {
            height: 20,
            backgroundColor: "#e0e0de",
            borderRadius: 50,
            marginTop: 50
        }

        const fillerStyles: React.CSSProperties = {
            height: '100%',
            width: `${completed}%`,
            backgroundColor: bgcolor,
            borderRadius: 'inherit',
            textAlign: 'right'
        }

        const labelStyles = {
            padding: 5,
            color: 'white',
            fontWeight: 'bold'
        }

        return (
            <div style={containerStyles}>
                <div style={fillerStyles}>
                    <span style={labelStyles}>{`${completed}%`}</span>
                </div>
            </div>
        );
    };

    const check_version = () => {
        setloading_action(true)
        setShowToast(false)
        if (running) {
            setShowToast(true)
            let dem = 0;
            setInterval(() => {
                dem = dem + 1;
                if (dem <= 100) {
                    setcompleted((prev) => prev + 1);
                }
                else if (dem === 101) {
                    //const data = { version_app: versionClient }
                    if ('caches' in window) {
                        caches.keys().then((names) => {
                            names.forEach(name => {
                                caches.delete(name);
                            })
                        });

                        localStorage.setItem('version_app', packageJson.version);
                        toggleModal();
                    }
                }
            }, 50);
        }
    }

    return (

        <>
            {showHideModal &&
                <Modal isOpen={showHideModal} onClose={toggleModal} widthClass={`w-full sm:w-3/4 md:w-1/2 lg:w-1/2`}>
                    <h2 className="text-xl font-semibold mb-4">Cập nhật</h2>
                    <hr />

                    <div className="mb-4 mt-4 body-modal">

                        <div className="alert alert-success bg-green-500 text-white p-4 rounded">
                            <h4 className="bold">Phiên bản mới nhất</h4>
                            <p className="font-medium bold">{packageJson.version}</p>
                        </div>
                        {loading_action === true &&
                            <div className="col-md-12 text-center">
                                <ProgressBar bgcolor={bgcolor} completed={completed} />
                            </div>
                        }


                    </div>
                    <div className="text-right">
                        <button
                            onClick={check_version}
                            className="bg-green-600 text-white px-4 py-2 rounded mr-1"
                        >
                            Cập nhật
                        </button>
                        <button
                            onClick={toggleModal}
                            className="bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Đóng
                        </button>
                    </div>


                </Modal>
            }

            {showToast && <Toast message="Đã lưu thành công!" type="success" />}
        </>
    )

}

export default CheckUpdateVersion;