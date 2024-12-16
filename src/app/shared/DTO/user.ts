export interface UserDto {
    id: string;
    nom: string;
    prenom: string;
}
export interface AuthenticationRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  phone: string;
  date_naiss: Date; // Adjust this type based on how you want to handle dates in Angular
//   bio: string;
}