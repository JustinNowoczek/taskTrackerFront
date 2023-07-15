import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dateConvert from "../utils/dateConvert";
import Loading from "./Loading";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, TrashIcon, CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, ShieldExclamationIcon } from "@heroicons/react/24/outline";
const apiUrl = import.meta.env.VITE_API_URL;

const TaskLists = () => {
  const navigate = useNavigate();
  const [userTasks, setUserTasks] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  let { userID, isCompleted, sortDateNotPriority } = useParams();
  const authToken = Cookies.get("authToken");

  useEffect(() => {
    axios
      .get(apiUrl + "/dashboard/" + userID + "/" + isCompleted + "/" + sortDateNotPriority, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      })
      .then(({ data: { data } }) => {
        const datedTasks = data.map((task) => {
          return { ...task, ...dateConvert(task.dueDate) };
        });
        setUserTasks(datedTasks);
        setIsLoading(false);
      })
      .catch(
        ({
          response: {
            data: { code, data },
          },
        }) => {
          navigate(`/action-fail`, { state: { code, data } });
        }
      );
  }, [isCompleted, sortDateNotPriority, refresh]);

  async function handleMark(taskID) {
    try {
      await axios.put(apiUrl + "/dashboard/" + userID + "/" + taskID, undefined, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + authToken,
        },
      });
      setRefresh(Date.now());
      navigate(`/dashboard/${userID}/${isCompleted}/${sortDateNotPriority}`);
    } catch (error) {
      navigate(`/action-fail`, { state: { code, data } });
    }
  }

  async function handleDelete(taskID) {
    try {
      await axios.delete(apiUrl + "/dashboard/" + userID + "/" + taskID, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + authToken,
        },
      });
      setRefresh(Date.now());
      navigate(`/dashboard/${userID}/${isCompleted}/${sortDateNotPriority}`);
    } catch (error) {
      navigate(`/action-fail`, { state: { code, data } });
    }
  }

  function switchComp() {
    setIsLoading("true");
    navigate(`/dashboard/${userID}/${isCompleted == "true" ? "false" : "true"}/${sortDateNotPriority}`);
  }
  function switchSort() {
    setIsLoading("true");
    navigate(`/dashboard/${userID}/${isCompleted}/${sortDateNotPriority == "true" ? "false" : "true"}`);
  }

  if (isLoading) {
    return <Loading />;
  }

  const divCss = "flex-row flex justify-center";
  const labelCss = "w-60 text-center text-2xl border border-primary rounded-2xl bg-base-200";
  const labelHighlightCss = " bg-neutral-content bg-opacity-20";
  const arrowCss = "w-7 hover:text-primary ";

  return (
    <>
      <div className="flex flex-col  pt-10">
        <div className={divCss}>
          <p className={labelCss + (isCompleted == "true" ? labelHighlightCss : "")}>Completed </p>
          {isCompleted == "true" ? <ArrowLeftCircleIcon onClick={switchComp} className={arrowCss} /> : <ArrowRightCircleIcon onClick={switchComp} className={arrowCss} />}
          <p className={labelCss + (isCompleted == "true" ? "" : labelHighlightCss)}>Not Completed</p>
        </div>
        <br />
        <div className={divCss}>
          <p className={labelCss + (sortDateNotPriority == "true" ? labelHighlightCss : "")}>Sort By Date </p>
          {sortDateNotPriority == "true" ? <ArrowLeftCircleIcon onClick={switchSort} className={arrowCss} /> : <ArrowRightCircleIcon onClick={switchSort} className={arrowCss} />}
          <p className={labelCss + (sortDateNotPriority == "true" ? "" : labelHighlightCss)}>Sort By Priority</p>
        </div>
      </div>

      <div className="overflow-x-auto p-20 pt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="border-b-4 border-primary text-xl">
              <th className="w-1/2">Name</th>
              <th className="w-3/12">DueDate</th>
              <th className="w-2/12">Importance</th>
              <th className="w-1/12">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {userTasks.map((task) => {
              let level;
              switch (task.priorityLevel) {
                case 1:
                  level = <ExclamationCircleIcon className="w-6 text-error" />;
                  break;
                case 2:
                  level = <ExclamationTriangleIcon className="w-6 text-warning" />;
                  break;
                case 3:
                  level = <ShieldExclamationIcon className="w-6 text-success" />;
                  break;
              }
              const unitEnd = ["w", "d", "h", "m"];

              return (
                <tr key={task._id} className="border-b-1 hover:scale-y-120 border-neutral-600 transition delay-100 duration-200 ease-in hover:-translate-x-2 hover:bg-base-200 hover:opacity-50 hover:shadow-2xl">
                  <td className="text-2xl font-bold">{task.name}</td>
                  <td className={`text-lg ${task.isOverdue ? "text-error" : "text-success"}`}>
                    {task.isOverdue ? " " : "In "}
                    {task.dueDate.map((unit, i) => {
                      if (unit && i != 4) {
                        return unit + unitEnd[i] + " ";
                      }
                    })}
                    {task.isOverdue ? " Ago" : " "}
                  </td>
                  <td className="pl-12 text-5xl">{level}</td>
                  <td className="flex flex-row space-x-3">
                    <div className="tooltip tooltip-left hover:tooltip-error" data-tip="Delete">
                      <TrashIcon
                        onClick={() => {
                          handleDelete(task._id);
                        }}
                        className="mt-1 w-6 text-neutral-400 hover:animate-ping  hover:text-error "
                      />
                    </div>
                    {task.isCompleted ? (
                      <div className="tooltip tooltip-right hover:tooltip-success" data-tip="Completed Task">
                        <CheckCircleIcon className="mt-1 w-6 text-success" />
                      </div>
                    ) : (
                      <div className="tooltip tooltip-right hover:tooltip-primary" data-tip="Mark As Completed">
                        <CheckCircleIcon
                          onClick={() => {
                            handleMark(task._id);
                          }}
                          className="mt-1 w-6 text-neutral-400 hover:animate-ping hover:text-primary"
                        />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TaskLists;
