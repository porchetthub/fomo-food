import { create } from "zustand";
import { trucks, Truck, Comment } from "./vendors";

interface AppState {
  trucks: Truck[];
  user: { name: string; avatar: string; badges: string[] } | null;
  liveComments: (Comment & { truckName?: string })[];
  addComment: (truckId: string, comment: Omit<Comment, "id">) => void;
  addTruck: (truck: Omit<Truck, "id" | "slug" | "comments" | "rating" | "reviewCount">) => void;
  likeComment: (commentId: string) => void;
  setUser: (user: { name: string; avatar: string; badges: string[] }) => void;
}

export const useAppStore = create<AppState>((set) => ({
  trucks: trucks,
  user: null,
  liveComments: trucks.flatMap((t) =>
    t.comments.map((c) => ({ ...c, truckName: t.name }))
  ),

  addComment: (truckId, comment) =>
    set((state) => {
      const newComment = { ...comment, id: `c-${Date.now()}` };
      const truck = state.trucks.find((t) => t.id === truckId);
      return {
        trucks: state.trucks.map((t) =>
          t.id === truckId
            ? { ...t, comments: [newComment, ...t.comments] }
            : t
        ),
        liveComments: [
          { ...newComment, truckName: truck?.name },
          ...state.liveComments,
        ],
      };
    }),

  addTruck: (truck) =>
    set((state) => {
      const id = `t-${Date.now()}`;
      const slug = truck.name.toLowerCase().replace(/\s+/g, "-");
      const newTruck: Truck = {
        ...truck,
        id,
        slug,
        rating: 0,
        reviewCount: 0,
        comments: [],
        badges: ["Nuova scoperta"],
        isLive: true,
      };
      return { trucks: [newTruck, ...state.trucks] };
    }),

  likeComment: (commentId) =>
    set((state) => ({
      trucks: state.trucks.map((t) => ({
        ...t,
        comments: t.comments.map((c) =>
          c.id === commentId ? { ...c, likes: c.likes + 1 } : c
        ),
      })),
    })),

  setUser: (user) => set({ user }),
}));
