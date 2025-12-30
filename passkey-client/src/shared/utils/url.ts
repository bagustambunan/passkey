export function getSearchParam(searchParamsString: string, param: string) {
  const searchParams = new URLSearchParams(searchParamsString)
  return searchParams.get(param)
}

export function setSearchParam(searchParamsString: string, param: string, value: string) {
  const searchParams = new URLSearchParams(searchParamsString)
  searchParams.set(param, value)
  return searchParams.toString()
}
