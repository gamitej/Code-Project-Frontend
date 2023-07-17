import React, { lazy, useEffect, useMemo, useState } from "react";
// libs
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
// comp
import AdminModal from "./AdminModal";
import { BackButton, BasicTable, Error } from "../../components";
import ProfileHistoryModal from "./ProfileHistoryModal";
// lazy import
const ProfileStatus = lazy(() => import("./ProfileStatus"));
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

const levelMapping = {
  easy: 0,
  medium: 1,
  hard: 2,
};

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

  const [openHistory, setOpenHistory] = useState(false);

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
  // ======================= API'S ============================

  // post questions api
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await postQuestion({ ...userInfo, form });
      if (res.error) {
        toast.success(res.message, { duration: 1200 });
        reset();
      } else {
        toast.error(res.message, { duration: 1200 });
      }
    } catch (error) {
      console.log(error);
      setIsError({ status: true, msg: "" });
    }
  };

  // get profile dropdown api
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

  // get table data api
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

  // ==================== USE-EFFECT-HOOKS  ===================

  useEffect(() => {
    callGetProfileDropdownApi();
    callGetTableData();
  }, []);

  // ==================== TABLE COLUMN DATA ===================

  const columns = useMemo(
    () => [
      {
        size: 5,
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
      },
      {
        size: 40,
        id: "topic",
        header: "Topic",
        accessorFn: (row) => row.topic,
        Cell: ({ row }) => {
          const topic = row.original.topic;
          return <p className="text-md font-semibold">{topic}</p>;
        },
      },
      {
        id: "question",
        header: "Question",
        accessorFn: (row) => row.question,
        Cell: ({ row }) => {
          const question = row?.original?.question;
          const url = row?.original?.url;
          return (
            <Link
              target="_blank"
              to={url}
              className="cursor-pointer hover:text-blue-500"
            >
              {question}
            </Link>
          );
        },
      },
      {
        id: "level",
        header: "Difficulty",
        accessorFn: (row) => levelMapping[row.level],
        Cell: ({ row }) => {
          const level = row.original.level;
          return (
            <Chip
              label={level}
              sx={{
                textTransform: "capitalize",
                color: "whitesmoke",
                fontWeight: "bold",
              }}
              style={{
                width: "5rem",
                backgroundColor: colorCode[level.toUpperCase()],
              }}
            />
          );
        },
      },
      // {
      //   id: "platform",
      //   header: "Platform",
      //   accessorFn: (row) => row.platform,
      //   size: 40,
      //   Cell: ({ row }) => {
      //     const platform = row.original.platform;
      //     return <Chip label={platform} sx={{ textTransform: "capitalize" }} />;
      //   },
      // },
    ],
    [],
  );

  // ===================== ERROR MSG ==========================
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

  /**
   * JSX
   */

  return (
    <div className="w-full h-full m-auto relative">
      <div className="fixed top-24 right-4 z-[10000]">
        {false && (
          <Button variant="contained" onClick={() => setOpenHistory(true)}>
            {" "}
            History{" "}
          </Button>
        )}
        <ProfileHistoryModal open={openHistory} setOpen={setOpenHistory} />
      </div>
      <div className="relative h-[5rem] flex justify-center items-center">
        <h1 className="text-3xl font-semibold text-purple-400 underline capitalize">
          {userInfo?.name}
        </h1>
        {/* <BackButton
          className="absolute top-4 left-4"
          color="black"
        /> */}
        <div className="absolute top-4 right-4">
          {false && userInfo?.name === "Amitej" && (
            <Button variant="contained" onClick={handleOpen}>
              Admin
            </Button>
          )}

          {/* MODAL --> ADD QUESTION */}
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

      <ProfileStatus userInfo={userInfo} />
      <br />
      {/* QUESTION TABLE */}
      <div className="w-[90%] grid grid-cols-4 m-auto gap-4 mt-3">
        <div className="col-span-4">
          <BasicTable
            height={500}
            title="questions"
            isLoading={loading}
            rows={tableData?.rows || []}
            columns={columns || []}
            width="100%"
          />
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default Profile;
