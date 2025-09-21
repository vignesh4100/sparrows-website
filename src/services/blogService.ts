import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Blog } from '../types/Blog';

const COLLECTION_NAME = 'blogs';

export const blogService = {
  // Get all blogs (published only for public)
  async getAllBlogs(includeUnpublished = false): Promise<Blog[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      
      const querySnapshot = await getDocs(q);
      const allBlogs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        publishedAt: doc.data().publishedAt?.toDate() || null,
      })) as Blog[];
      
      // Filter published blogs for public view
      if (includeUnpublished) {
        return allBlogs;
      } else {
        return allBlogs.filter(blog => blog.status === 'Published');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }
  },

  // Get blog by ID
  async getBlogById(id: string): Promise<Blog | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate() || new Date(),
          updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
          publishedAt: docSnap.data().publishedAt?.toDate() || null,
        } as Blog;
      }
      return null;
    } catch (error) {
      console.error('Error fetching blog:', error);
      return null;
    }
  },

  // Get blog by slug
  async getBlogBySlug(slug: string): Promise<Blog | null> {
    try {
      const q = query(collection(db, COLLECTION_NAME), where('slug', '==', slug));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
          publishedAt: doc.data().publishedAt?.toDate() || null,
        } as Blog;
      }
      return null;
    } catch (error) {
      console.error('Error fetching blog by slug:', error);
      return null;
    }
  },

  // Add new blog
  async addBlog(blogData: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    try {
      const now = Timestamp.now();
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...blogData,
        publishedAt: blogData.status === 'Published' ? now : null,
        createdAt: now,
        updatedAt: now,
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding blog:', error);
      return null;
    }
  },

  // Update blog
  async updateBlog(id: string, blogData: Partial<Omit<Blog, 'id' | 'createdAt'>>): Promise<boolean> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const updateData: any = {
        ...blogData,
        updatedAt: Timestamp.now(),
      };

      // Set publishedAt when status changes to Published
      if (blogData.status === 'Published') {
        updateData.publishedAt = Timestamp.now();
      }

      await updateDoc(docRef, updateData);
      return true;
    } catch (error) {
      console.error('Error updating blog:', error);
      return false;
    }
  },

  // Delete blog
  async deleteBlog(id: string): Promise<boolean> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error('Error deleting blog:', error);
      return false;
    }
  }
};