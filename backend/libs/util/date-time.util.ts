import { Duration } from 'luxon';

export class DATE_TIME {
  static Duration = Duration;

  static ONE_HOUR_IN_MILLISECONDS = Duration.fromObject({ hour: 1 }).as(
    'millisecond',
  );
}
