import axios from "../index";

export const getPlanets = axios.get(`/api/planets`).then(({ data }) => data);
