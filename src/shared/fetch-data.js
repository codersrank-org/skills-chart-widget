const cache = {};

export const fetchData = (username, id) => {
  if (cache[username]) return Promise.resolve(cache[username]);

  let endpoint = `https://grpcgateway.codersrank.io/candidate/${
    username || id
  }/GetScoreProgress`;
  if (id) endpoint += '?id=true';

  return fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data && data.code === 400) {
        return Promise.reject(data);
      }
      cache[username] = data;
      return data;
    })
    .catch((err) => {
      // eslint-disable-next-line
      return Promise.reject(err);
    });
};
