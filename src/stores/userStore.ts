import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    username: "",
    email: "",
    birthdate: "",
    isAuthenticated: false,
    submittedList: [] as any[],
  }),
  actions: {
    login(username: string, email: string) {
      this.username = username;
      this.email = email;
      this.isAuthenticated = true;
    },
    logout() {
      this.username = "";
      this.email = "";
      this.birthdate = "";
      this.isAuthenticated = false;
    },
    updateProfile(data: { birthdate?: string }) {
      if (data.birthdate) this.birthdate = data.birthdate;
    },
    submitForm(data: any) {
      this.submittedList.push(data);
    },
  },
});
