export enum SortOrder {
    asc = 'ASC',
    desc = 'DESC',
}

export interface SortParams {
    order: SortOrder,
    column: string,
}

export const defaultSortParams: SortParams = {
  order: SortOrder.asc,
  column: 'price',
};
