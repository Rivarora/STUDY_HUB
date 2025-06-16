import { getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

async function displayUserPoints() {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    document.getElementById('user-points').innerText = "Points: " + userSnap.data().points;
  }
}

auth.onAuthStateChanged((user) => {
  if (user) displayUserPoints();
});



//
import { doc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// after successful note upload
await addDoc(collection(db, "notes"), {
  title,
  link,
  tags,
  uploadedBy: user.uid,
  createdAt: serverTimestamp(),
  downloads: 0,
  upvotes: 0
});

// ✅ update points (+10)
const userRef = doc(db, "users", user.uid);
await updateDoc(userRef, {
  points: increment(10)
});

alert("Note uploaded! +10 points earned");
