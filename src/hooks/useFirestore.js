import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { firestoreApp } from '../config/firebase';

export const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestoreApp, collectionName));
        const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDocs(documents);
      } catch (error) {
        console.error('Error fetching documents:', error);
        
      }
    };

    fetchDocs();
  }, [collectionName]);
  const addDocument = async (newDocument) => {
    try {
      const docRef = await addDoc(collection(firestoreApp, collectionName), newDocument);
      
      setDocs(prevDocs => [...prevDocs, { id: docRef.id, ...newDocument }]);
    } catch (error) {
      console.error('Error adding document:', error);
      throw error; 
    }
  };

  return { docs, addDocument };
};