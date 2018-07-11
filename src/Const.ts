module MyApp {

  /**
   * Const is the class to store global constants
   */
  export abstract class Const {
    // using 'R' as the global constant containing resource paths
    // for images, the filename extension '.PNG' is assumed
    // by Phaser's loader
    static R = {
      // TODO: create actual image files and add to game
      dungeon: "assets/img/dungeon",
      hunter: "assets/img/hunter",
      blob: "assets/img/blob",
      treasure: "assets/img/treasure",
      door: "assets/img/door"
    }
  }
  
}