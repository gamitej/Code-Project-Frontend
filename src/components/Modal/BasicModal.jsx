import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

export default function BasicModal({
  children,
  open = false,
  width = "200px",
  height = "200px",
  onClose = () => {},
}) {
  return (
    <div className="">
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "transparent",
        }}
      >
        <div
          className="relative bg-white shadow-md rounded-2xl p-2 border-transparent"
          style={{ height, width }}
        >
          <button
            className="absolute top-3 right-3 hover:bg-slate-100 p-1 rounded-full"
            onClick={onClose}
          >
            <CloseIcon style={{ fontSize: "2rem" }} />
          </button>
          {children}
        </div>
      </Modal>
    </div>
  );
}

BasicModal.propTypes = {
  children: PropTypes.any,
  handleClose: PropTypes.func,
  handleOpen: PropTypes.func,
  height: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  width: PropTypes.string,
};
