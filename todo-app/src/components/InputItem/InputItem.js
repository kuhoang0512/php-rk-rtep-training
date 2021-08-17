import React, { useEffect, useState } from "react";
import { Button, Container } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router-dom";
import TodoList from "../TodoList/TodoList";
import "./InputItem.scss";
import { ThemeProvider,  createTheme } from "@material-ui/core/styles";
import EditTodo from "../EditTodo/EditTodo";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F2AA4CFF",
    },
  },
});

const InputItem = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "",
  });

  const [showTaskData, setShowTaskData] = useState([]);
  const [successAlertMsg, setSuccessAlertMsg] = useState("");
  const [todoDeleteMsg, setTodoDeleteMsg] = useState("");
  const [editTaskDataModal, setEditTaskDataModal] = useState(false);
  const [successTodoUpdatedMsg, setSuccessTodoUpdateMsg] = useState("");

  const [editTaskData, setEditTaskData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    getTaskData();
  }, []);

  const getTaskData = () => {
    let token = sessionStorage.getItem("token");
    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/api/user/todos`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setShowTaskData(result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const addItem = () => {
    let token = sessionStorage.getItem("token");
    var formdata = new FormData();
    formdata.append("title", taskData.title);
    formdata.append("description", taskData.description);
    var requestOptions = {
      method: "POST",
      body: formdata,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/api/user/todos`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setSuccessAlertMsg(result.message);
          getTaskData();
          setTimeout(() => {
            setSuccessAlertMsg("")
          }, 1000);
        }
        if (result.error === false) {
          setTaskData({
            title: "",
            description: "",
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChangehandler = (e) => {
    const tmpTaskData = {...taskData};
    tmpTaskData[e.target.name] = e.target.value;
    setTaskData(tmpTaskData);
  };

  const clearList = () => {
    setShowTaskData([]);
  };

  const handleDelete = (id) => {
    let token = sessionStorage.getItem("token");
    var requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/api/user/todos/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setTodoDeleteMsg(result.message)
          getTaskData();
          setTodoDeleteMsg("");
        }
      });
  };

  const toggleEditTaskModal = () => {
    setEditTaskDataModal(!editTaskDataModal);
  };
  const onChangeEditTodoHandler = (e) => {
    let tmpEditTaskData = {...editTaskData};
    tmpEditTaskData[e.target.name] = e.target.value;
    setEditTaskData(tmpEditTaskData);
  };

  const editTodo = (id, title, description) => {
    setEditTaskData({ id, title, description });
    setEditTaskDataModal(!editTaskDataModal)
  };

  const updateTodo = () => {
    let { id, title, description } = editTaskData;
    let token = sessionStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("title", title);
    urlencoded.append("description", description);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/api/user/todos/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setEditTaskDataModal(false);
          setEditTaskData({ title, description });
          this.getTaskData()


          setTimeout(() => {
            setEditTaskDataModal(false);
          }, 1000);
        }
        if (result.errors === false) {
          setSuccessTodoUpdateMsg(result.message)
        }
      })
      .catch((error) => console.log("error", error));
  };

  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <Container className="themed-container mt-5" fluid="sm">
      <div className="input-field-container">
        <ThemeProvider theme={theme}>
          <TextField
            type="text"
            name="title"
            placeholder="Task Title"
            value={taskData.title}
            onChange={onChangehandler}
            color="primary"
            variant="outlined"
          />
          <TextField
            type="text"
            name="description"
            placeholder="Task description"
            value={taskData.description}
            onChange={onChangehandler}
            color="primary"
            variant="outlined"
            style={{ width: "50%" }}
          />
          <Button
            color="success"
            className="font-weight-bold add-task"
            onClick={addItem}
          >
            +
          </Button>
        </ThemeProvider>
      </div>
      <div class="text-success p-4 mt-2">{successAlertMsg}</div>
      {/*TODO list  */}
      <TodoList
        showTaskData={showTaskData}
        clearList={clearList}
        handleDelete={handleDelete}
        todoDeleteMsg={todoDeleteMsg}
        editTodo={editTodo}
        toggleEditTaskModal={toggleEditTaskModal}
      />
      {/* Model for Edit Todo */}
      <EditTodo
        toggleEditTaskModal={toggleEditTaskModal}
        editTaskDataModal={editTaskDataModal}
        onChangeEditTodoHandler={onChangeEditTodoHandler}
        editTodo={editTodo}
        editTaskData={editTaskData}
        updateTodo={updateTodo}
        successTodoUpdatedMsg={successTodoUpdatedMsg}
      />
    </Container>
  );
}

export default InputItem;