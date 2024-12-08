export interface Location {
  lat: number;
  lng: number;
}

export interface Point {
  id: string;
  latitude: number;
  longitude: number;
  poopDate: string;
  user: User;
  userId: string;
  votes: number;
  image: string;
  description: string;
}

export interface User {
  email: string;
  id: string;
  name: string;
  poopyScore: number;
  signupDate: string;
}
