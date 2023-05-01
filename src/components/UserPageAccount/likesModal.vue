<template>
  <div class="likesbar" v-if="store.$state.UserUID">
    <div class="likesFlex">
      <div class="Dislikes" :data-content="Dislikes">
        <img
          src="@/assets/UserAcc/likesModal/icons8-facebook-dislike-100.png"
          alt=""
          @click="clickLike(false)"
        />
      </div>
      <div class="likes" :data-content="likes">
        <img
          src="@/assets/UserAcc/likesModal/icons8-facebook-like-100.png"
          alt=""
          @click="clickLike(true)"
        />
      </div>
      <img
        id="share"
        src="@/assets/UserAcc/likesModal/icons8-share-100.png"
        alt=""
        @click="
          () => {
            clickShare();
            ShowUpCopied();
          }
        "
      />
      <span class="spanCopy" :class="{ spanCopied: Copied }"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { Store } from "@/piniaStorage/dbPinia";
import {
  addDoc,
  getDocFromCache,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { RaptorNewsStore } from "@/firebase/config";

export default defineComponent({
  props: {
    artNumb: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    let store = Store();
    let art: any = props.artNumb;
    let artObj = art[0];
    let likes = ref(artObj.amountOfLikes);
    let Dislikes = ref(artObj.amountOfDisLikes);
    let Copied = ref(false);
    const likesRef = collection(RaptorNewsStore, "Likes");
    const DislikesRef = collection(RaptorNewsStore, "DisLikes");
    let GetLIkes = doc(RaptorNewsStore, "Likes", artObj.id);
    let GetDisLikes = doc(RaptorNewsStore, "DisLikes", artObj.id);
    let ShowUpCopied = () => {
      Copied.value = true;
      setTimeout(() => {
        Copied.value = false;
      }, 1000);
    };
    let clickLike = async (like: boolean) => {
      let plusORminusLikeRef = like ? GetLIkes : GetDisLikes;
      let plusLikeDoc = await getDoc(plusORminusLikeRef);
      const users = plusLikeDoc.get("users");
      const userIndex = users.indexOf(store.$state.UserUID);
      const currentAmount = plusLikeDoc.get("amount");
      if (userIndex !== -1) {
        await updateDoc(plusORminusLikeRef, {
          users: arrayRemove(store.$state.UserUID),
          amount: currentAmount - 1,
        });
        likes.value -= 1;
      } else {
        await updateDoc(plusORminusLikeRef, {
          users: arrayUnion(store.$state.UserUID),
          amount: currentAmount + 1,
        });
        likes.value += 1;
      }
    };
    let clickShare = () => {
      let type = "text/plain";
      let blob = new Blob(
        ["http://localhost:4000/" + artObj.tag + "/" + artObj.id],
        { type }
      );
      let data = [new ClipboardItem({ [type]: blob })];
      navigator.clipboard.write(data);
    };
    let updateLikes = async () => {
      let likesSnapshot = await getDocs(likesRef);
      let DislikesSnapshot = await getDocs(DislikesRef);
      likesSnapshot.forEach((doc) => {
        if (doc.id == artObj.id) {
          likes.value = doc.data().amount;
        }
      });
      DislikesSnapshot.forEach((doc) => {
        if (doc.id == artObj.id) {
          Dislikes.value = doc.data().amount;
        }
      });
    };
    onMounted(() => {
      updateLikes();
    });
    return {
      Copied,
      ShowUpCopied,
      likes,
      Dislikes,
      clickLike,
      clickShare,
      store,
    };
  },
});
</script>

<style scoped>
.likesbar {
  display: grid;
  justify-items: center;
  gap: 3px;
  position: relative;
}
.likesFlex {
  display: flex;
  gap: 10px;
}
img {
  width: 20px;
  height: 20px;
  transform: scale(1);
  transition: 0.5s;
  cursor: pointer;
  position: relative;
  z-index: 1;
}
img:hover,
img:hover + .likes::after,
img:hover + .Dislikes::after {
  transform: scale(1.7);
}
.likes::after {
  content: attr(data-content);
  display: block;
  position: absolute;
  top: -1px;
  left: 45px;
  font-size: 7px;
  transform: scale(1);
  transition: 0.5s;
  z-index: 2;
}
.Dislikes::after {
  content: attr(data-content);
  display: block;
  position: absolute;
  top: 13px;
  left: 1px;
  font-size: 7px;
  transform: scale(1);
  transition: 0.5s;
  z-index: 2;
}
.spanCopy {
  display: inline-block;
  position: absolute;
  top: -20px;
  left: 70px;
  padding: 3px 6px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 10px;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  cursor: pointer;
}
.spanCopy::after {
  content: "Copied!";
  display: block;
  position: absolute;
  top: -8px;
  left: -19px;
  padding: 3px 6px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 8px;
  border-radius: 4px;
  transition: opacity 0.3s ease-in-out;
}
.spanCopied {
  opacity: 1;
}
</style>
