import axios from "axios";
import * as bcryptjs from "bcryptjs";

const API_URL = "http://localhost:4000";

export const USER_EMAIL_SESSION_ATTRIBUTE_NAME = "authenticatedUser";
const JWT_TOKEN = "token";

class AuthService {
  logout() {
    localStorage.removeItem(USER_EMAIL_SESSION_ATTRIBUTE_NAME);
    localStorage.removeItem(JWT_TOKEN);
  }

  async loginUser(email, password) {
    return await axios
      .post(`${API_URL}/auth/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem(JWT_TOKEN, response.data.access_token);
        localStorage.setItem(USER_EMAIL_SESSION_ATTRIBUTE_NAME, email);
        return true;
      })
      .catch((error) => {
        return false;
      });
  }

  async getUserBoards() {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };
    return await axios
      .get(`${API_URL}/boards/get`, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.status;
      });
  }

  // Get list of all users who have access to this board
  async getUsersFromBoard(id) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };

    return await axios
      .post(
        `${API_URL}/boards/getUsers`,
        {
          board_id: id,
        },
        config
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.status;
      });
  }

  async getBoardsLists(id) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };

    return await axios
      .post(
        `${API_URL}/lists/get`,
        {
          board_id: id,
        },
        config
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.status;
      });
  }

  async getListsCards(listId) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };

    return await axios
      .post(
        `${API_URL}/cards/get`,
        {
          list_id: listId,
        },
        config
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.status;
      });
  }

  async addBoard(boardName) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };
    return await axios
      .post(
        `${API_URL}/boards/add`,
        {
          name: boardName,
        },
        config
      )
      .catch((error) => {
        console.log(error);
      });
  }

  async addList(listName, boardId) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };

    return await axios
      .post(
        `${API_URL}/lists/add`,
        {
          board_id: parseInt(boardId),
          list_name: listName,
        },
        config
      )
      .catch((error) => {
        console.log(error);
      });
  }

  async addCard(cardName, listId) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };

    return await axios
      .post(
        `${API_URL}/cards/add`,
        {
          list_id: parseInt(listId),
          card_name: cardName,
        },
        config
      )
      .catch((error) => {
        console.log(error);
      });
  }

  async updateCardName(cardId, newCardName) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };

    return await axios
      .patch(
        `${API_URL}/cards`,
        {
          card_id: parseInt(cardId),
          card_new_name: newCardName,
        },
        config
      )
      .catch((error) => {
        console.log(error);
      });
  }

  async updateTimeLimitCard(cardId, cardTimeLimit) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };

    return await axios
      .patch(
        `${API_URL}/cards/updateTimeLimit`,
        {
          card_id: parseInt(cardId),
          time_limit: cardTimeLimit,
        },
        config
      )
      .catch((error) => {
        console.log(error);
      });
  }

  async updateLabelsIds(cardId, labelsIds) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };

    return await axios
      .patch(
        `${API_URL}/cards/updateLabels`,
        {
          card_id: cardId,
          label_ids: labelsIds,
        },
        config
      )
      .catch((error) => {
        console.log(error);
      });
  }

  async deleteBoard(boardId) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };
    return await axios
      .post(
        `${API_URL}/boards/delete`,
        {
          board_id: boardId,
        },
        config
      )
      .catch((error) => {
        console.log(error);
      });
  }

  async editBoard(boardId, newBoardName) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };
    return await axios
      .patch(
        `${API_URL}/boards/`,
        {
          board_id: boardId,
          board_new_name: newBoardName,
        },
        config
      )
      .catch((error) => {
        console.log(error);
      });
  }

  async editList(list_id, list_new_name) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };
    return await axios
      .patch(
        `${API_URL}/lists/`,
        {
          list_id: list_id,
          list_new_name: list_new_name,
        },
        config
      )
      .catch((error) => {
        console.log(error);
      });
  }

  async getUserInformation() {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };
    return await axios
      .get(`${API_URL}/auth/profile`, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async registerUser(email, password) {
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    let response = await axios.post(`${API_URL}/auth/register`, {
      email: email,
      password: hashedPassword,
    });
    return response.data;
  }

  async inviteUserToBoard(userEmail, board_id) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };
    return await axios
      .post(
        `${API_URL}/boards/addUser`,
        {
          email: userEmail,
          board_id: board_id,
        },
        config
      )
      .catch((error) => {
        console.log(error);
      });
  }

  // TASKLIST

  async addTaskList(newListName, card_id) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };
    return await axios
      .post(
        `${API_URL}/tasklists/add`,
        {
          title: newListName,
          card_id: card_id,
        },
        config
      )
      .catch((error) => {
        console.log(error);
      });
  }

  async getTaskList(card_id) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };
    return await axios
      .post(
        `${API_URL}/tasklists/get`,
        {
          card_id: card_id,
        },
        config
      )
      .catch((error) => {
        console.log(error);
      });
  }

  // TASK

  async changeDoneStatus(task_id, status) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };
    return await axios
      .patch(
        `${API_URL}/tasks/updateDone`,
        {
          task_id: task_id,
          done: status,
        },
        config
      )
      .catch((error) => {
        console.log(error);
      });
  }

  async deleteTask(task_id) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };
    return await axios
      .post(
        `${API_URL}/tasks/delete`,
        {
          task_id: task_id,
        },
        config
      )
      .catch((error) => {
        console.log(error);
      });
  }

  async addTask(tasklist_id, newTaskName) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };
    console.log("TASKLIST_ID: " + tasklist_id)
    console.log("NEW TASK NAME: " + newTaskName)
    return await axios
      .post(
        `${API_URL}/tasks/add`,
        {
          tasklist_id: tasklist_id,
          title: newTaskName,
        },
        config
      )
      .catch((error) => {
        console.log(error);
      });
  }

  async getTasksForTasklist(tasklist_id) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };
    return await axios
      .post(
        `${API_URL}/tasks/get`,
        {
          tasklist_id: tasklist_id
        },
        config
      )
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new AuthService();
