import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import serviceAccount from './serviceAccount.json';

// Initialize Firebase Admin
const apps = getApps();

if (!apps.length) {
  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
  });
}

export const adminDb = getFirestore();
export const adminAuth = getAuth();

// lib/firebaseAdmin.js
// lib/firebaseAdmin.js
// import { initializeApp, getApps, cert } from "firebase-admin/app";
// import { getAuth } from "firebase-admin/auth";
// import { getFirestore } from "firebase-admin/firestore";
// import serviceAccount from "../serviceAccount.json"; // keep this file private!

// if (!getApps().length) {
//   initializeApp({
//     credential: cert(serviceAccount),
//     databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
//   });
// }

// const adminAuth = getAuth();
// const adminDb = getFirestore();

// export { adminAuth, adminDb };
