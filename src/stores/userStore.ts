import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    username: "Admin",
    email: "",
    birthdate: "",
    isAuthenticated: false,
    loginError: "",
    submittedList: [] as any[],
  }),

  actions: {
    login(email: string, password: string) {
      if (email === "admin@gmail.com" && password === "Admin") {
        this.email = email;
        this.username = "Admin";
        this.isAuthenticated = true;
        this.loginError = "";

        // ✅ Lưu vào localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: this.email,
            username: this.username,
            isAuthenticated: true,
          })
        );
      } else {
        this.isAuthenticated = false;
        this.loginError = "account/password không đúng";
      }
    },

    logout() {
      this.username = "Admin";
      this.email = "";
      this.birthdate = "";
      this.isAuthenticated = false;
      this.loginError = "";
      localStorage.removeItem("user"); 
    },

    restoreSession() {
      const saved = localStorage.getItem("user");
      if (saved) {
        const user = JSON.parse(saved);
        this.email = user.email;
        this.username = user.username;
        this.isAuthenticated = user.isAuthenticated;
      }
    },

    updateProfile(data: { birthdate?: string }) {
      if (data.birthdate) this.birthdate = data.birthdate;
    },

    submitForm(data: any) {
      this.submittedList.push(data);
    },
  },
});

