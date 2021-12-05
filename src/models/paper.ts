//Mirror from the paper class in the backend
export interface  Paper {
  id: number;
  title: string;
  description: string;
  paperCode: string;
  contact_person: string;
  imageUrl: string;
  institute: string;
  division: string;
  paid: boolean;
  withPartner: boolean;


  //test for internalizer
  production: boolean;
}
