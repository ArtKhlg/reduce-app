import httpService from "./http.service";
const todosEndPoint = "todos/";
const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndPoint, {
      params: {
        _page: 1,
        _limit: 10,
      },
    });
    return data;
  },
  create: async (id) => {
    let { data } = await httpService.get(todosEndPoint, {
      params: {
        _start: id - 1,
        _limit: 1,
      },
    });
    data[0].completed = false;
    console.log(data);
    return data;
  },
};

export default todosService;
