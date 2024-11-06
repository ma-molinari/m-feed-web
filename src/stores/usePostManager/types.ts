interface State {
  isOpen: boolean;
  id: number;
  setId: (id: number) => void;
  open: () => void;
  clear: () => void;
}

export type { State };
