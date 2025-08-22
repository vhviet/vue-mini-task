import { defineStore } from "pinia";
import { ref } from "vue";

export interface FormEntry {
  name: string;
  email: string;
  birthDate: string;
  gender: string;
  product: string;
  price: number;
  quantity: number;
  total: number;
}

export const useFormDataStore = defineStore("formData", () => {
  const entries = ref<FormEntry[]>([]);

  function addEntry(entry: FormEntry) {
    entries.value.push(entry);
  }

  function deleteEntry(index: number) {
    entries.value.splice(index, 1);
  }

  function clearAll() {
    entries.value = [];
  }

  return {
    entries,
    addEntry,
    deleteEntry,
    clearAll,
  };
});

