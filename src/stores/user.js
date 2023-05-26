import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", () => {
  const defaultUsername = "คลิ๊กเพื่อเปลี่ยนโปรไฟล์"; // Default username if localStorage is undefined
  const defaultAvatar = "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"; // Default avatar if localStorage is undefined

  const username = ref(localStorage.getItem("username") || defaultUsername);
  const avatar = ref(localStorage.getItem("avatar") || defaultAvatar);

  function setUser(newUsername, newAvatar) {
    if (newUsername) {
      localStorage.setItem("username", newUsername);
      username.value = newUsername;
    }
    if (newAvatar) {
      localStorage.setItem("avatar", newAvatar);
      avatar.value = newAvatar;
    }
  }

  return { avatar, username, setUser };
});
