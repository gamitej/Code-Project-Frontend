import { BasicModal } from "../../components";
import React, { useState } from "react";

const ProfileHistoryModal = ({ open, setOpen }) => {
  return (
    <BasicModal
      open={open}
      handleClose={() => setOpen(false)}
      handleOpen={() => setOpen(true)} 
      onClose={() => setOpen(false)}
    >
      <div>hi</div>
    </BasicModal>
  );
};

export default ProfileHistoryModal;
