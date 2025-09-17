import { Injectable } from '@angular/core';
import { Auth } from 'src/app/core/providers/auth/auth';
import { Query } from 'src/app/core/providers/query/query';
import { IUserCreate } from 'src/interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class User {
    constructor(
      private readonly authSrv: Auth,
      private readonly querySrv: Query) 
      {}

      async create(user: IUserCreate): Promise <void>{
        try {
          console.log(user);
          const uid = await this.authSrv.register(user.email, user.password);
          await this.querySrv.set('users', uid, {
            uid,
            name: user.name,
            lastName: user.lastname,
          });
          console.log("HEEHEHEHEHEHEHEHE");
        } catch (error) {
          console.log(error);
        }
      }
}
