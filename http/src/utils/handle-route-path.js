export function handleRoutePath(path) {
  const routeParamsRegexPattern = /:([a-zA-Z]+)/g;
  // console.log(Array.from(path.matchAll(routeParamsRegexPattern)));
  // console.log([...path.matchAll(routeParamsRegexPattern)]);

  const pathWithParams = path.replaceAll(
    routeParamsRegexPattern,
    "(?<$1>[a-z0-9-_]+)"
  );

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

  return pathRegex;
}
