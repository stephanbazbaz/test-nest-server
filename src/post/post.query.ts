const limit = 10;

export const getPostsQuery = ({ payload }) => {
  const { id, idx, sortColumn, isSortAsc } = payload;
  const condition = {};
  condition['where'] = { status: 'Published', deleted: false };
  condition['order'] = [[sortColumn, isSortAsc ? 'DESC' : 'ASC']];
  condition['limit'] = limit;
  condition['offset'] = idx;
  if (id != 0) {
    condition['where'] = { status: 'Published', userId: id };
  }
  return condition;
};
