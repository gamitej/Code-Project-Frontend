import React, { useEffect, useMemo, useState } from "react";
// libs
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
// comp
import AdminModal from "./AdminModal";
import { BackButton, BasicTable, Error } from "../../components";
// mui
import { Button, Chip, Tooltip } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
// services
import {
  getProfileDropdowns,
  getTableData,
  postQuestion,
} from "../../services";
// store
import { useLogin } from "../../store/login/useLogin";
// utils
import colorCode from "../../utils/colorCode.json";

const Profile = () => {
  const { userInfo } = useLogin();
  // =================== USE-STATE =====================
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({ status: false, msg: "" });
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
      const res = await postQuestion({ ...userInfo, req: form });
      if (res.error) {
        toast.success(res.message, { duration: 1200 });
        reset();
      } else {
        toast.error(res.message, { duration: 1200 });
      }
    } catch (error) {
      console.log(error);
      setIsError({ status: true, msg: "" });
    } finally {
      setLoading(false);
    }
  };

  const callGetProfileDropdownApi = async () => {
    try {
      const { data } = await getProfileDropdowns({ ...userInfo });
      if (!data.error) {
        setDropDownData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const callGetTableData = async () => {
    try {
      setLoading(true);
      const { data } = await getTableData({ ...userInfo });
      if (!data.error) {
        setTableData(data);
      } else {
        setIsError({ status: true, msg: data.message });
      }
    } catch (error) {
      console.log(error);
      setIsError({ status: true, msg: "Something went wrong" });
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
        id: "done",
        header: "Status",
        Cell: ({ row }) => {
          const done = row.original.done;
          return (
            <Tooltip
              className="cursor-pointer"
              title={`${done === "Yes" ? "Solved" : "Unsolved"}`}
              placement="top"
              arrow
            >
              <TaskAltIcon
                onClick={() => handleMark(id, completed)}
                className="col-span-1 hover:text-slate-400"
                style={{
                  color: done === "Yes" ? "green" : colorCode["skip"],
                }}
              />
            </Tooltip>
          );
        },
        accessorFn: (row) => row.done,
        size: 40,
      },
      {
        id: "topic",
        header: "Topic",
        accessorFn: (row) => row.topic,
        size: 40,
        Cell: ({ row }) => {
          const topic = row.original.topic;
          return <p className="text-md font-semibold">{topic}</p>;
        },
      },
      {
        id: "question",
        header: "Question",
        accessorFn: (row) => row.question,
        size: 150,
      },
      {
        id: "url",
        header: "Link",
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
        header: "Difficulty",
        accessorFn: (row) => row.level,
        size: 40,
        Cell: ({ row }) => {
          const level = row.original.level;
          return (
            <p
              style={{
                width: "5rem",
                color: colorCode[level.toUpperCase()],
                textTransform: "capitalize",
                fontWeight: "bold",
              }}
            >
              {level}
            </p>
          );
        },
      },
      {
        id: "platform",
        header: "Platform",
        accessorFn: (row) => row.platform,
        size: 40,
        Cell: ({ row }) => {
          const platform = row.original.platform;
          return <Chip label={platform} sx={{ textTransform: "capitalize" }} />;
        },
      },
    ],
    []
  );
  if (isError.status) {
    return (
      <div className="w-full h-full m-auto">
        <div className="relative h-[5rem] flex justify-center items-center">
          <h1 className="text-3xl font-semibold text-purple-400 underline capitalize">
            {userInfo?.name}
          </h1>
        </div>
        <Error />
      </div>
    );
  }

  return (
    <div className="w-full h-full m-auto">
      <div className="relative h-[5rem] flex justify-center items-center">
        <h1 className="text-3xl font-semibold text-purple-400 underline capitalize">
          {userInfo?.name}
        </h1>
        <BackButton className="absolute top-4 left-4" color="black" />
        <div className="absolute top-4 right-4">
          {userInfo?.name === "Amitej" && userInfo?.id === "1" && (
            <Button variant="contained" onClick={handleOpen}>
              Admin
            </Button>
          )}
          <AdminModal
            open={open}
            form={form}
            loading={loading}
            onClose={handleClose}
            handleOpen={handleOpen}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            dropDownData={dropDownData || []}
          />
        </div>
      </div>
      <div className="w-[90%] m-auto">
        <BasicTable
          height={400}
          title="questions"
          isLoading={loading}
          rows={tableData?.rows || []}
          columns={columns || []}
        />
      </div>
    </div>
  );
};

export default Profile;
