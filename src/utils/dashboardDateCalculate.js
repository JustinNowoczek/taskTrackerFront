import dateConvert from "./dateConvert.js";

function dashboardDateCalculate(tasks) {
  tasks = tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  const taskTotal = tasks.length;
  let todoTotal = 0;
  let highTodoTotal = 0;
  let mediumTodoTotal = 0;
  let lowTodoTotal = 0;
  let overdueTasks = [];
  let aheadTasks = [];

  tasks.map((task) => {
    delete task.__v;
    delete task.userID;

    const { dueDate, isOverdue } = dateConvert(task.dueDate);

    task.dueDate = dueDate;
    task.isOverdue = isOverdue;

    if (task.isCompleted == false) {
      ++todoTotal;
      switch (task.priorityLevel) {
        case 1:
          ++highTodoTotal;
          break;
        case 2:
          ++mediumTodoTotal;
          break;
        case 3:
          ++lowTodoTotal;
          break;
      }
    }

    if (task.isOverdue == true && task.isCompleted == false) {
      overdueTasks.push(task);
    } else if (task.isOverdue == false && task.isCompleted == false) {
      aheadTasks.push(task);
    }
  });

  let donePercent = Math.round(((taskTotal - todoTotal) / taskTotal) * 100);

  return {
    taskTotal,
    donePercent,
    todoTotal,
    highTodoTotal,
    mediumTodoTotal,
    lowTodoTotal,
    overdueTasks,
    aheadTasks,
  };
}

export default dashboardDateCalculate;
