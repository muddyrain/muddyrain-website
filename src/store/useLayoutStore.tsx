import { create } from 'zustand';

interface StoreProps {
  /**
   * 是否显示登录弹窗
   */
  isShowLogin: boolean;
  setShowLogin: (isShow: boolean) => void;
}
export const useLayoutStore = create<StoreProps>(set => ({
  isShowLogin: false,
  setShowLogin: isShow => set({ isShowLogin: isShow }),
}));
