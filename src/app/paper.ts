//Mirror from the paper class in the backend
export interface  Paper {
  id: number;
  title: string;
  description: string;
  paperCode: string;
  contact_person: string;
  imageUrl: string;

  //test for internalizer
  production: boolean;
}
