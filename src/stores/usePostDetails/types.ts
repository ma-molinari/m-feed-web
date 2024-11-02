interface State {
  isOpen: boolean;
  id: number;
  setId: (id: number) => void;
  clear: () => void;
}

export type { State };
