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
//
import { getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const helpForm = document.getElementById('help-form');
const helpStatus = document.getElementById('help-status');

helpForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('help-title').value;
  const description = document.getElementById('help-description').value;

  const user = auth.currentUser;
  if (!user) {
    alert("You must be logged in.");
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();

  if (userData.points < 20) {
    helpStatus.innerText = "❌ You need at least 20 points to request help.";
    return;
  }

  // Deduct 20 points
  await updateDoc(userRef, {
    points: increment(-20)
  });

  // Save help request
  await addDoc(collection(db, "helpRequests"), {
    title,
    description,
    requestedBy: user.uid,
    requestedAt: serverTimestamp(),
    status: "open"
  });

  helpStatus.innerText = "✅ Help request submitted!";
  helpForm.reset();
  displayUserPoints(); // refresh point count
});
//
const helpList = document.getElementById('help-list');

onSnapshot(collection(db, "helpRequests"), (snapshot) => {
  helpList.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${data.title}</h3>
      <p>${data.description}</p>
      <p>Status: ${data.status}</p>
    `;
    helpList.appendChild(div);
  });
});
