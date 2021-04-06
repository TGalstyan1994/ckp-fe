import axios from 'axios';

export const getPlanets = axios
  .get(`${process.env.NEXT_PUBLIC_API}/api/planets`)
  .then(({ data }) => data)