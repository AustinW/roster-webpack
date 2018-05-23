import Athlete from './athlete';

class AthleteCollection {
  constructor(athletes = null) {
    if (athletes) {
      this.hydrateCollection(athletes);
    }
  }

  hydrateCollection(data) {

  }
}

export default AthleteCollection;
