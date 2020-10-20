import {ModelAdapter} from '@app/@core/interfaces';
import {Spot} from '../store/Spot';
import {SpotModel} from '../models/SpotModel';

export class SpotAdapter implements ModelAdapter<Spot> {
  adapt(item: any): Spot {
    return new SpotModel(
      item.id,
      item.rate,
      item.available,
    );
  }

  encode(item: Spot) {
    return {...item};
  }
}
