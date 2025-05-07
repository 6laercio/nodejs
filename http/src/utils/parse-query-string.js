// ['search=Laercio', 'page=3']
export function parseQueryString(query) {
  if (!query || query === "?") return {};

  return query
    .slice(1)
    .split("&")
    .reduce((params, param) => {
      if (!param) return params;

      const [key, value] = param.split("=").map(decodeURIComponent);

      if (key) params[key] = value ?? "";

      return params;
    }, {});
}
