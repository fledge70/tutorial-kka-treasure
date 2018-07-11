module MyApp {

  /**
   * Const is the class to store global constants in
   */
  export abstract class Const {
    // game width and height
    static GAME_WIDTH = 320;
    static GAME_HEIGHT = 176;
    
    // using 'R' as the global constant containing resource paths
    // for images, the filename extension '.PNG' is assumed
    // by Phaser's loader
    static R = {
      dungeon: "assets/img/dungeon",
      hunter : "assets/img/hunter",
      blob : "assets/img/blob",
      treasure : "assets/img/treasure",
      door : "assets/img/door"
    }
  }
  
}