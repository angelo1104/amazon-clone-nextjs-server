import admin from 'firebase-admin';
import serviceAccount from "./firebaseCredentials.js";

const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://subtle-anthem-265314.firebaseio.com"
});

export default firebaseAdmin;