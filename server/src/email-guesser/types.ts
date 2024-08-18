export enum EmailCase {
  firstLast = 'first_name_last_name',
  firstInitLast = 'first_name_initial_last_name',
}

export type DataRecord = {
  fullName: string;
  email: string;
};
