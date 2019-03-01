import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => {
  return async (dispatch, getState) => {
    await dispatch(fetchPosts());

    const userIds = _.uniq(_.map(getState().posts, "userId"));
    userIds.forEach(id => dispatch(fetchUser(id)));
  };
};

//Example of above userIds code using lodash chain instead.
// _.chain(getState().posts)
//   .map("userId")
//   .uniq()
//   .forEach(id => dispatch(fetchUser(id)))
//   .value();

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("./posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};
