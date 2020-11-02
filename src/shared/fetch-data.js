const cache = {};

export const fetchData = (username) => {
  if (cache[username]) return Promise.resolve(cache[username]);

  return fetch(
    `https://grpcgateway.codersrank.io/candidate/${username}/GetScoreProgress`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
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
