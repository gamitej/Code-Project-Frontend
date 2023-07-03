import React, { useEffect, useState } from "react";
// comp
import {
  BackButton,
  BasicModal,
  BasicTable,
  Dropdown,
  InputTextField,
  LoadingButton,
} from "../../components";
// mui
import { Button } from "@mui/material";
// data
import { inputData } from "./data";
// services
import { getProfileDropdowns, postQuestion } from "../../services";
import { toast } from "react-hot-toast";
import { useLogin } from "../../store/login/useLogin";

const Profile = () => {
  const { user } = useLogin();
  // =================== USE-STATE =====================
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dropDownData, setDropDownData] = useState([]);
  const [form, setForm] = useState({
    url: "",
    level: "",
    platform: "",
    question: "",
    topic: "",
  });

  // =================== EVENT-HANDLERS ================

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setForm({
      url: "",
      level: "",
      platform: "",
      question: "",
      topic: "",
    });
    setOpen(true);
  };

  const handleChange = (target) => {
    const { value, name } = target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const reset = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await postQuestion(form);
      if (res.error) {
        toast.success(res.message, { duration: 1200 });
        reset();
      } else {
        toast.error(res.message, { duration: 1200 });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ========= CALL ALL PINS API =============
  const callGetProfileDropdownApi = async () => {
    try {
      setLoading(true);
      const { data } = await getProfileDropdowns();
      setDropDownData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callGetProfileDropdownApi();
  }, []);

  return (
    <div className="w-full h-full m-auto">
      <div className="relative h-[5rem] flex justify-center items-center">
        <h1 className="text-3xl font-semibold text-purple-400 underline capitalize">
          {user}
        </h1>
        <BackButton className="absolute top-4 left-4" color="black" />
        <div className="absolute top-4 right-4">
          <Button variant="contained" onClick={handleOpen}>
            Admin
          </Button>
          <AdminModal
            open={open}
            form={form}
            loading={loading}
            onClose={handleClose}
            handleOpen={handleOpen}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            dropDownData={dropDownData}
          />
        </div>
      </div>
      <div className="w-[90%] m-auto">
        <BasicTable
          height={"30rem"}
          title="questions"
          enableDowloadCsv
          isLoading={false}
        />
      </div>
    </div>
  );
};

function AdminModal({
  form,
  open,
  loading,
  onClose,
  handleOpen,
  handleChange,
  handleSubmit,
  dropDownData = [],
}) {
  return (
    <BasicModal
      height="25rem"
      width="40rem"
      open={open}
      onClose={onClose}
      handleOpen={handleOpen}
    >
      <div className="p-4 flex flex-col justify-center items-center w-full h-full">
        <p className="text-purple-500 font-semibold text-2xl underline select-none mb-8">
          Add Questions
        </p>
        <form
          className="flex flex-col justify-around items-center h-[90%] w-full"
          onSubmit={handleSubmit}
        >
          {inputData?.map(({ name, label, placeholder }, index) => (
            <InputTextField
              size="small"
              key={index}
              name={name}
              label={label}
              value={form[name]}
              placeholder={placeholder}
              onChange={(e) => handleChange(e.target)}
              width="85%"
              maxLength={150}
            />
          ))}
          <div className="w-[90%] flex justify-between items-center">
            {dropDownData?.map(({ options, id, name, label }, index) => (
              <Dropdown
                size="small"
                id={id}
                name={name}
                key={index}
                label={label}
                width="10rem"
                options={options}
                value={form[name]}
                onChange={handleChange}
              />
            ))}
          </div>
          <LoadingButton
            width="50%"
            isLoading={loading}
            label={"Add Question"}
          />
        </form>
      </div>
    </BasicModal>
  );
}

export default Profile;
