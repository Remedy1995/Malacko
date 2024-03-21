export class Person {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;



  constructor(persons: Person) {
    {
      this.id = persons.id || 0;
      this.first_name = persons.first_name;
      this.last_name = persons.last_name;
      this.email = persons.email;
      this.gender = persons.gender;
      this.ip_address = persons.ip_address;
    }

  }
}

