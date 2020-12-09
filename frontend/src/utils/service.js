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
        //console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        //console.log(error.response.status);
        return error.response.status;
      });
  }

  // Get list of all users who have access to this board
  async getUsersFromBoard(boardName) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };

    return await axios
      .post(`${API_URL}/boards/getUsers`,
      {
        name: boardName,
      },
       config
      )
      .then((response) => {
        //console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        //console.log(error.response.status);
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
    .get(`${API_URL}/lists/get`,
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
    .get(`${API_URL}/cards/${listId}`, config)
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
          list_name: listName,
          board_id: boardId
        },
        config
      )
      .catch((error) => {
        console.log(error);
      });
  }

  async deleteBoard(boardName) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN)
      },
    };
    return await axios
      .post(`${API_URL}/boards/delete`
      ,{
        name: boardName,
      },
      config
      )
      .catch((error) => {
        console.log(error);
      });
  }

  async editBoard(boardName, newBoardName) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };
    return await axios
      .patch(
        `${API_URL}/boards/`,
        {
          name: boardName,
          new_name: newBoardName
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
    console.log("token" + localStorage.getItem(JWT_TOKEN));
    return await axios
      .get(`${API_URL}/auth/profile`, config)
      .then((response) => {
        console.log(response);
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

  async inviteUserToBoard(userEmail, boardName) {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem(JWT_TOKEN),
      },
    };
    return await axios
      .post(`${API_URL}/boards/addUser`
      ,{
        email: userEmail,
        name: boardName
      },
      config
      )
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new AuthService();
