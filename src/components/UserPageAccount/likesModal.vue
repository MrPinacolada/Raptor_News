<template>
  <div class="likesbar" v-if="store.$state.UserUID">
    <div class="likesFlex">
      <div
        class="Dislikes"
        :data-content="Dislikes"
        :class="{ DisLikeClicked: isDisLiked }"
      >
        <img
          src="@/assets/UserAcc/likesModal/icons8-facebook-dislike-100.png"
          alt=""
          @click="clickLike(false)"
        />
      </div>
      <div
        class="likes"
        :class="{ LikeClicked: isLiked }"
        :data-content="likes"
      >
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
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import { Store } from "@/piniaStorage/dbPinia";
import {
  collection,
  doc,
  getDocs,
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
    let likes = ref();
    let Dislikes = ref();
    let Copied = ref(false);
    let likesRef = collection(RaptorNewsStore, "Likes");
    let DislikesRef = collection(RaptorNewsStore, "DisLikes");
    let GetLikes = doc(RaptorNewsStore, "Likes", artObj.id);
    let GetDisLikes = doc(RaptorNewsStore, "DisLikes", artObj.id);
    let isLiked = ref(false);
    let isDisLiked = ref(false);
    let ShowUpCopied = () => {
      Copied.value = true;
      setTimeout(() => {
        Copied.value = false;
      }, 1000);
    };
    let clickLike = async (like: boolean) => {
      let plusORminusLikeRef = like ? GetLikes : GetDisLikes;
      let plusLikeDoc = await getDoc(plusORminusLikeRef);
      let users = await plusLikeDoc.get("users");
      let userIndex = users.indexOf(store.$state.UserUID);
      let currentAmount = await plusLikeDoc.get("amount");
      if (userIndex !== -1) {
        if (like) {
          likes.value -= 1;
          isLiked.value = false;
        } else {
          Dislikes.value -= 1;
          isDisLiked.value = false;
        }
        updateDoc(plusORminusLikeRef, {
          users: arrayRemove(store.$state.UserUID),
          amount: currentAmount - 1,
        });
      } else {
        if (like) {
          likes.value += 1;
          isLiked.value = true;
        } else {
          Dislikes.value += 1;
          isDisLiked.value = true;
        }
        updateDoc(plusORminusLikeRef, {
          users: arrayUnion(store.$state.UserUID),
          amount: currentAmount + 1,
        });
      }
      // updateLikes();
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
      let LikeDoc = await getDoc(GetLikes);
      let DisLikeDoc = await getDoc(GetDisLikes);
      let usersLike = LikeDoc.get("users");
      let usersDisLike = DisLikeDoc.get("users");
      isLiked.value = usersLike.indexOf(store.$state.UserUID) ? false : true;
      isDisLiked.value = usersDisLike.indexOf(store.$state.UserUID)
        ? false
        : true;
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
      isLiked,
      isDisLiked,
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

img:hover {
  transform: scale(1.7);
  font-size: 10px;
}
img:hover + .Dislikes::after {
  transform: scale(1.7);
  font-size: 10px;
}
/* .likes:hover::after{
  transform: scale(1.4);
  top: -4px;
  left: 48px;

} */

.likes::after {
  content: attr(data-content);
  display: block;
  position: absolute;
  top: -1px;
  left: 45px;
  font-size: 7px;
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
.LikeClicked > img {
  filter: invert(75%) sepia(58%) saturate(506%) hue-rotate(78deg)
    brightness(86%) contrast(87%);
}
.DisLikeClicked > img {
  filter: invert(31%) sepia(73%) saturate(1461%) hue-rotate(341deg)
    brightness(112%) contrast(86%);
}
</style>
