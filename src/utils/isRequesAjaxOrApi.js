export const isRequestAjaxOrApi = (req) => {
  return req.xhr || !req.accepts('html')
}