let db: any;

// Instance of Firebase Firestore
const getFirestoreInstance = async () => {
  if (!db) {
    const { initializeApp } = await import('firebase/app');
    const { getFirestore } = await import('firebase/firestore');
    const { firebaseConfig } = await import('./firebase.config');

    // Your web app's Firebase configuration
    //IMPORTANT: delete the firebaseConfig when you push to a public repository
    //firebaseConfig is in the .gitignore file

    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
  return db;
}

// Functions
export const addProduct = async (product: any) => {
  try {
    // Get a reference to the Firestore instance
    const db = await getFirestoreInstance();
    const { addDoc, collection } = await import('firebase/firestore');

    // Add a new document with a generated id.
    const where = collection(db, 'products');
    await addDoc(where, product);
    console.log("Product added successfully");
  } catch (error) {
    console.error("Error adding document:", error);
  };
};

export const getProducts = async () => {
  try {
    const db = await getFirestoreInstance();
    const { getDocs, collection } = await import('firebase/firestore');

    const where = collection(db, 'products');
    const querySnapshot = await getDocs(where);
    const data: any[] = [];

    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });

    return data;
  } catch (error) {
    console.error("Error getting document:", error);
  };
};