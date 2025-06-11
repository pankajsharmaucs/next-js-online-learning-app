export interface Board {
  _id?: string;
  board_name: string;
}

export interface Class {
  _id?: string;
  class_id: string;
  class_name: string;
  board_id: string;
}

export interface Subject {
  _id?: string;
  class_id: string;
  subject_name: string;
  image?: string | File;
}