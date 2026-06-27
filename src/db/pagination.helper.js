export const paginate = async (model, params = {}) => {
  const page = Math.max(1, params.page ?? 1);
  const itemPerPage = Math.max(1, params.itemPerPage ?? 10);

  const totalItems = await model.count();

  if (params.where) {
    model = model.where(params.where);
  }

  const list = await model
    .offset((page - 1) * itemPerPage)
    .limit(itemPerPage)
    .toArray();

  return {
    totalItems,
    totalPages: Math.ceil(totalItems / itemPerPage),
    page,
    itemPerPage,
    list,
  };
};
