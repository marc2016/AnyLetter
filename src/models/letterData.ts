export interface LetterData {
  sender: string;
  recipient: string;
  notes: string;
  info: string;
  date: Date | null;
  subject: string;
  content: string;
  footer: string;
}

export const emptyLetterData = (): LetterData => ({
  sender: "",
  recipient: "",
  notes: "",
  info: "",
  date: null,
  subject: "",
  content: "",
  footer: "",
});
