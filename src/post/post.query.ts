const limit = 10;

export const getPostsQuery = (id: number, idx: number) => {
  const condition = {};
  condition['where'] = { status: 'Published' };
  condition['order'] = [['updatedAt', 'DESC']];
  condition['limit'] = limit;
  condition['offset'] = idx;
  if (id != 0) {
    condition['where'] = { status: 'Published', userId: id };
  }
  return condition;
};
