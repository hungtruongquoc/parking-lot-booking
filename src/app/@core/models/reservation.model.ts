import {UserModel} from './user.model';

export class ReservationModel {
  public timestampCheckIn: number;
  public timestampCheckOut: number;
  public user: UserModel;
}
