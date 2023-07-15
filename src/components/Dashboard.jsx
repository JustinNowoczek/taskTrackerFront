import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dashboardDateCalculate from "../utils/dashboardDateCalculate";
import Loading from "./Loading";
const apiUrl = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [userTaskInfo, setUserTaskInfo] = useState([]);
  const navigate = useNavigate();
  const userID = Cookies.get("userID");
  const authToken = Cookies.get("authToken");

  useEffect(() => {
    axios
      .get(apiUrl + "/dashboard/" + userID, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
      })
      .then(
        ({
          data: {
            data: { name, tasks },
          },
        }) => {
          setUserName(name);
          setUserTaskInfo(dashboardDateCalculate(tasks));
          setIsLoading(false);
        }
      )
      .catch(
        ({
          response: {
            data: { code, data },
          },
        }) => {
          navigate(`/action-fail`, { state: { code, data } });
        }
      );
  }, []);

  function handleAddTask() {
    navigate(`/dashboard/${userID}/create`);
  }

  async function handleRemoveUser() {
    try {
      await axios.delete(apiUrl + "/dashboard/" + userID, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + authToken,
        },
      });
      navigate(`/register`);
    } catch ({
      response: {
        data: { code, data },
      },
    }) {
      navigate(`/action-fail`, { state: { code, data } });
    }
  }

  function handleViewTasks() {
    navigate(`/dashboard/${userID}/false/false`);
  }

  if (isLoading) {
    return <Loading />;
  }

  const { taskTotal, donePercent, todoTotal, highTodoTotal, mediumTodoTotal, lowTodoTotal, overdueTasks, aheadTasks } = userTaskInfo;
  const priorityData = [
    { val: highTodoTotal, name: "High", col: " hover:bg-error-content hover:text-error" },
    { val: mediumTodoTotal, name: "Medium", col: " hover:bg-warning-content hover:text-warning" },
    { val: lowTodoTotal, name: "Low", col: " hover:bg-success-content hover:text-success" },
  ];
  const summaryData = [
    { val: taskTotal, name: "Total Tasks" },
    { val: todoTotal, name: "Uncompleted Tasks" },
    { val: donePercent + "%", name: "Tasks Completed" },
  ];

  if (overdueTasks.length > 3) {
    overdueTasks.length = 3;
  } else if (overdueTasks.length < 3) {
    while (overdueTasks.length < 3) {
      overdueTasks.push({ text: "No More Overdue Tasks" });
    }
  }

  if (aheadTasks.length > 3) {
    aheadTasks.length = 3;
  } else if (aheadTasks.length < 3) {
    while (aheadTasks.length < 3) {
      aheadTasks.push({ text: "No More Tasks To Do" });
    }
  }

  return (
    <>
      {/* upper section */}
      <div className="mt-4 flex flex-col flex-wrap justify-between md:flex-row">
        <div className="stats stats-vertical my-2 ml-32  basis-4/12 border-4 border-neutral bg-base-200 text-neutral shadow hover:border-primary hover:border-opacity-50 hover:text-primary">
          <h1 className="stat text-center text-3xl font-bold">Most Overdue</h1>
          {overdueTasks?.map((stat, i) => {
            const units = ["w", "d", "h", "m"];
            if (stat.dueDate) {
              delete stat?.dueDate[4];
            }
            if (stat.text) {
              return (
                <div key={i} className={"stat hover:animate-pulse hover:bg-neutral hover:text-neutral-content"}>
                  <div className="stat-value ml-3">{stat.text} </div>
                </div>
              );
            }
            return (
              <div key={stat._id} className={"stat hover:animate-pulse " + (stat?.dueDate[0] > 2 ? "hover:bg-error-content hover:text-error" : "hover:bg-neutral hover:text-neutral-content")}>
                <div className="stat-title -ml-2 font-extrabold">{stat.dueDate ? stat.name : <p>&nbsp;</p>} </div>
                <div className="stat-value ml-3">
                  {stat.dueDate ? (
                    <div>
                      Due{" "}
                      {stat.dueDate[0] > 2
                        ? "Over Two Weeks "
                        : stat.dueDate.map((uniV, i) => {
                            return uniV ? uniV + units[i] + " " : " ";
                          })}
                      Ago
                    </div>
                  ) : (
                    stat.text
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="divider divider-horizontal grow"></div>
        <div className="stats stats-vertical my-2 mr-60 basis-60 border-4 border-neutral bg-base-200 text-neutral shadow hover:border-primary hover:border-opacity-50 hover:text-primary">
          <h1 className="stat text-center text-3xl font-bold">Task Summary</h1>
          {summaryData.map((stat) => {
            return (
              <div key={stat.name} className="stat hover:animate-pulse hover:bg-neutral hover:text-neutral-content">
                <div className="stat-title -ml-2 font-bold">{stat.name}</div>
                <div className="stat-value ml-3">{stat.val}</div>
              </div>
            );
          })}
        </div>
      </div>
      {/* mid section */}
      <div className="flex flex-row justify-center text-2xl">
        <button onClick={handleAddTask} className="btn-base btn mx-3 basis-1/12 border-4 border-neutral bg-base-200 text-center shadow hover:border-primary hover:border-opacity-50">
          Add A Task
        </button>
        <button onClick={handleRemoveUser} className="btn-base btn mx-3 basis-1/12 border-4 border-neutral bg-base-200 text-center shadow hover:border-error hover:border-opacity-50">
          Delete User
        </button>
        <button onClick={handleViewTasks} className="btn-base btn mx-3 basis-1/12 border-4 border-neutral bg-base-200 text-center shadow hover:border-primary hover:border-opacity-50">
          View Tasks
        </button>
      </div>
      {/* lower section */}
      <div className="flex flex-col flex-wrap justify-between md:flex-row">
        <div className="stats stats-vertical my-2 ml-60 basis-60 border-4 border-neutral bg-base-200 text-neutral shadow hover:border-primary hover:border-opacity-50 hover:text-primary">
          <h1 className="stat text-center text-3xl font-bold">Todo's</h1>
          {priorityData.map((stat) => {
            return (
              <div key={stat.name} className={"stat hover:animate-pulse" + stat.col}>
                <div className="stat-title -ml-2 font-bold">{stat.name} Priority</div>
                <div className="stat-value ml-3">{stat.val}</div>
              </div>
            );
          })}
        </div>
        <div className="divider divider-horizontal grow"></div>
        <div className="stats stats-vertical my-2 mr-32 basis-4/12 border-4 border-neutral bg-base-200 text-neutral shadow hover:border-primary hover:border-opacity-50 hover:text-primary">
          <h1 className="stat text-center text-3xl font-bold">Least Ahead</h1>
          {aheadTasks.map((stat, i) => {
            const units = ["w", "d", "h", "m"];
            if (stat.dueDate) {
              delete stat?.dueDate[4];
            }
            if (stat.text) {
              return (
                <div key={i} className={"stat hover:animate-pulse hover:bg-neutral hover:text-neutral-content"}>
                  <div className="stat-value ml-3">{stat.text} </div>
                </div>
              );
            }
            return (
              <div key={stat._id} className={"stat hover:animate-pulse " + (stat?.dueDate[0] > 2 ? "hover:bg-success-content hover:text-success" : "hover:bg-neutral hover:text-neutral-content")}>
                <div className="stat-title -ml-2 font-extrabold">{stat.dueDate ? stat.name : <p>&nbsp;</p>} </div>
                <div className="stat-value ml-3">
                  {stat.dueDate ? (
                    <div>
                      Due In{" "}
                      {stat.dueDate[0] > 2
                        ? "Over Two Weeks "
                        : stat.dueDate.map((uniV, i) => {
                            return uniV ? uniV + units[i] + " " : " ";
                          })}
                    </div>
                  ) : (
                    stat.text
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
