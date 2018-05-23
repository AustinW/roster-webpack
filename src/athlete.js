import moment from 'moment';
import Level from './level';

class Athlete {
  constructor(athleteData = null) {
    this.fillable = [
      'checked',
      'visible',
      'active',
      'usag_id',
      'first_name',
      'last_name',
      'gender',
      'birthdate',
      'tra_level',
      'dmt_level',
      'tum_level',
    ];

    // Initialize
    this.fillable.each((field) => {
      this[`_${field}`] = null;
    });

    if (athleteData) {
      this.hydrateAthlete(athleteData);
    }
  }

  hydrateAthlete(data) {
    this.fillable.each((field) => {
      if (Object.prototype.hasOwnProperty.call(data, field)) {
        this[`_${field}`] = data[field];
      }
    });
  }

  check() { this.checked = true; }
  uncheck() { this.checked = false; }

  get checked() { return this.checked; }
  set checked(value) { this._checked = Boolean(value); return this; }

  getVisible() { return this.visible; }
  setVisible(value) { this.visible = Boolean(value); return this; }

  getActive() { return this.active; }
  setActive(value) { this.active = Boolean(value); return this; }

  getUsagId() { return this.usag_id; }
  setUsagId(value) { this.usag_id = value; return this; }

  getFirstName() { return this.first_name; }
  setFirstName(value) { this.first_name = value; return this; }

  getLastName() { return this.last_name; }
  setLastName(value) { this.last_name = value; return this; }

  getName() { return `${this.getFirstName()} ${this.getLastName()}`; }

  getGender() { return this.gender; }
  setGender(value) { this.gender = value.charAt(1).toUpper(); return this; }

  getBirthdate(format = null) {
    if (!format) {
      return this.birthdate;
    }

    return this.birthdate.format(format);
  }

  setBirthdate(value, format) {
    const dateFormat = format || 'MM/DD/YYYY';

    this.birthdate = moment(value, dateFormat);
  }

  getCompetitiveAge() {
    return (this.birthdate)
      ? moment().endOf('year').diff(this.birthdate, 'years')
      : 0;
  }

  getTrampolineLevel() { return this.tra_level; }
  setTrampolineLevel(value) { this.tra_level = new Level(value); return this; }

  getDoubleMiniLevel() { return this.dmt_level; }
  setDoubleMiniLevel(value) { this.dmt_level = new Level(value); return this; }

  getTumblingLevel() { return this.tum_level; }
  setTumblingLevel(value) { this.tum_level = new Level(value); return this; }
}

export default Athlete;
