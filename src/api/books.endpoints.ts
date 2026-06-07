import { api } from "./config";

export const BookEndpoints = {
  FETCH_BY_ISBN: (isbn: string) =>
    api(`/edition/editions/${isbn}`),

  SEARCH_BY_TITLE: (title: string) =>
    api(`/edition/search/titles/${title}?page=1&page_size=1000`),

  FETCH_MOST_POPULAR: api("/core/most_popular_editions"),

  COVER_OL: (
    key: string = "isbn",
    value: string,
    size: string = "M"
  ) =>
    `https://covers.openlibrary.org/b/${key}/${value}-${size}.jpg`,
};