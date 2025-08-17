export type Report = {
  id: number;
  userID: number;
  email: string;
  createdAt: string; // ISO date string
  tongue: string;
  tonguePercentage: number;
  teeth: string;
  teethPercentage: number;
  saliva: string;
  salivaPercentage: number;
  pain: string;
  painPercentage: number;
};