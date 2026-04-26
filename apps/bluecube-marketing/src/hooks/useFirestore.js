import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../../../../packages/shared/firebase.js';

/**
 * Real-time listener for an entire collection, ordered by a field.
 * Returns { data: [], loading: boolean, error: string|null }
 */
export function useCollection(collectionName, orderField = 'createdAt', orderDir = 'desc') {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, collectionName),
      orderBy(orderField, orderDir)
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        setData(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        console.error(`[useCollection] ${collectionName}:`, err);
        setError(err.message);
        setLoading(false);
      }
    );

    return unsub;
  }, [collectionName, orderField, orderDir]);

  return { data, loading, error };
}

/**
 * Real-time listener for a single document.
 * Returns { data: object|null, loading: boolean, error: string|null }
 */
export function useDocument(collectionName, docId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, collectionName, docId),
      (snap) => {
        setData(snap.exists() ? { id: snap.id, ...snap.data() } : null);
        setLoading(false);
      },
      (err) => {
        console.error(`[useDocument] ${collectionName}/${docId}:`, err);
        setError(err.message);
        setLoading(false);
      }
    );

    return unsub;
  }, [collectionName, docId]);

  return { data, loading, error };
}
