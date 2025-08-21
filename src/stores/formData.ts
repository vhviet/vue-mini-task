import { defineStore } from "pinia";

export interface Entry {
  name: string;
  email: string;
  gender: string;
  birthDate: string;
  product: string;
  price: number;
  quantity: number;
  total: number;
}

export const useFormDataStore = defineStore("formData", {
  state: () => ({
    entries: [] as Entry[],
  }),
  actions: {
    addEntry(entry: Entry) {
      this.entries.push(entry);
    },
    deleteEntry(index: number) {
      this.entries.splice(index, 1);
    },
  },
});
