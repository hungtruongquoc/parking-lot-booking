import {UserModel} from './user.model';

export class ReservationModel {
  public user: UserModel;

  constructor(public licensePlate: string = null, public timestampCheckIn: number = null,
              public timestampCheckOut: number = null) {
  }

  public function;

  public get isValid(): boolean {
    if (this.licensePlate && ' ' !== this.licensePlate) {
      if (this.timestampCheckIn > 0 && this.timestampCheckOut > 0 && this.timestampCheckIn && this.timestampCheckOut) {
        return this.timestampCheckIn < this.timestampCheckOut;
      }
    }
    return false;
  }
}
