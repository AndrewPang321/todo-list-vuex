import { auth, db } from '@/api/firebase';

export const authenticate = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    return auth.currentUser;
  } catch (error) {
    throw error;
  }
}

export const deauthenticate = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
}

export const list = async (action, payload) => {
  const list = db.ref('list');
  try {
    switch (action) {
      case 'get': {
        const query = await list.once('value');
        return query.val();
      }
      case 'add': {
        const newTodo = payload;
        const result = await list.push(newTodo);
        return result.key;
      }
      case 'update': {
        await list.child(payload.id).update(payload.content);
        const snapshot = (await list.once('value')).val();
        return snapshot;
      }
      case 'delete': {
        for (let i = 0; i < payload.trash.length; i++) {
          await list.child(payload.trash[i]).remove();
        }
      }
    }
  } catch (error) {
    throw error;
  }
};