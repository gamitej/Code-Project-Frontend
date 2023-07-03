import {
  BasicModal,
  Dropdown,
  InputTextField,
  LoadingButton,
} from "../../components";
import React from "react";
import { inputData } from "./data";

export default function AdminModal({
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
