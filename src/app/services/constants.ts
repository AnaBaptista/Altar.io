export abstract class Constants {

  static readonly PERCENTAGE = 20

  static readonly HEIGHT: number = 10;
  static readonly WIDTH: number = 10;
  static readonly WEIGHT: number = (Constants.PERCENTAGE / 100) * (Constants.HEIGHT * Constants.WIDTH);

  static readonly ALPHABET: string = "abcdefghijklmnopqrstuvwxyz";

  static readonly TIME_INTERVAL_MS = 2000;

}
