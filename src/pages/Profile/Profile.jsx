import React, { useEffect, useMemo, useState } from "react";
// comp
import { BackButton, BasicTable } from "../../components";
// mui
import { Button, Chip } from "@mui/material";
// services
import {
  getProfileDropdowns,
  getTableData,
  postQuestion,
} from "../../services";
import { toast } from "react-hot-toast";
import { useLogin } from "../../store/login/useLogin";
import AdminModal from "./AdminModal";
import { Link } from "react-router-dom";
import colorCode from "../../utils/colorCode.json";
import { MaterialReactTable } from "material-react-table";

const Profile = () => {
  const { user, userId } = useLogin();
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
  const [tableData, setTableData] = useState({});

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
  // ==================== CALL API'S ===================

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

  const callGetProfileDropdownApi = async () => {
    try {
      const { data } = await getProfileDropdowns();
      setDropDownData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const callGetTableData = async () => {
    try {
      setLoading(true);
      const { data } = await getTableData(userId);
      setTableData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ==================== USE-EFFECT-HOOKS ===================

  useEffect(() => {
    callGetProfileDropdownApi();
    callGetTableData();
  }, []);

  const columns = useMemo(
    () => [
      {
        id: "topic",
        header: "Topic",
        accessorFn: (row) => row.topic,
        size: 40,
      },
      {
        id: "question",
        header: "Question",
        accessorFn: (row) => row.question,
        size: 150,
      },
      {
        id: "url",
        header: "Url",
        Cell: (row) => (
          <Link
            target="_blank"
            to={row.renderedCellValue}
            className="text-blue-500 underline cursor-pointer hover:text-blue-700"
          >
            Click here!
          </Link>
        ),
        size: 120,
        accessorFn: (row) => row.url,
      },
      {
        id: "level",
        header: "Level",
        accessorFn: (row) => row.level,
        size: 40,
        Cell: ({ row }) => {
          const level = row.original.level;
          return (
            <Chip
              label={level}
              sx={{
                width: "5rem",
                backgroundColor: colorCode[level],
                textTransform: "capitalize",
                fontWeight: "bold",
              }}
            />
          );
        },
      },
      {
        id: "platform",
        header: "Platform",
        accessorFn: (row) => row.platform,
        size: 40,
      },
      {
        id: "done",
        header: "Done",
        Cell: ({ row }) => (
          <p
            className="font-semibold"
            style={{
              color:
                row.original.done === "Yes"
                  ? colorCode["pass"]
                  : colorCode["fail"],
            }}
          >
            {row.original.done}
          </p>
        ),
        accessorFn: (row) => row.done,
        size: 40,
      },
    ],
    []
  );

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
      <div className="w-[70%] m-auto">
        <BasicTable
          height={600}
          title="questions"
          isLoading={loading}
          rows={tableData.rows || []}
          columns={columns || []}
        />
      </div>
    </div>
  );
};

function convertRowData(row) {
  const newRow = row?.map((item) => {
    const { url, done } = item;
    console.log(url, item);
    return {
      ...item,
      url: (
        <Link
          target="_blank"
          to={url}
          className="text-blue-400 underline cursor-pointer hover:text-blue-700"
        >
          Click here!
        </Link>
      ),
      done: (
        <p
          className="font-semibold"
          style={{
            color: done === "Yes" ? colorCode["pass"] : colorCode["fail"],
          }}
        >
          {done}
        </p>
      ),
    };
  });
  return newRow;
}

export default Profile;
