interface State {
  isOpen: boolean;
  showComments: boolean;
  id: number;
  setId: (id: number, showComments?: boolean) => void;
  setShowComments: (value: boolean) => void;
  clear: () => void;
}

export type { State };
