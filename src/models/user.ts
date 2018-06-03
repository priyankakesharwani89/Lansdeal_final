export class User {
  uid: string;
  name: string;
  date_of_birth: string; 
  gender: string;
  phone: string;
  email: string;
  photo: string; 
  address:{
      care_of:string;
      house:string;
      street:string;
      locality:string;
      village_town_or_city:string;
      sub_district:string;
      district: string;
      state: string;
      country:string;
      pincode:string;
  }; 

  constructor(
      uid, name, date_of_birth, gender, phone, photo, email,  address ) {
    this.uid = uid;
    this.name = name;
    this.date_of_birth = date_of_birth;
    this.gender = gender;
    this.phone = phone;
    this.email = email; 
    this.photo = 'data:image/png;base64, '+photo;
    this.address = address;
  }
}
