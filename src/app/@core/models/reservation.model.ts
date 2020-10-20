

export class ReservationModel {
  constructor(public licensePlate: string = null, public timestampCheckIn: number = null,
              public timestampCheckOut: number = null) {
  }

  public get isValid(): boolean {
    if (this.licensePlate && ' ' !== this.licensePlate) {
      if (this.timestampCheckIn > 0 && this.timestampCheckOut > 0 && this.timestampCheckIn && this.timestampCheckOut) {
        return this.timestampCheckIn < this.timestampCheckOut;
      }
    }
    return false;
  }
}
