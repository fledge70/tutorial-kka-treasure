module MyApp {

  /**
   * Const is the class to store global constants in
   */
  export abstract class Const {
    // game width and height
    static readonly GAME_WIDTH = 320;
    static readonly GAME_HEIGHT = 176;
    
    // using 'R' as the global constant containing resource paths
    // for images, the filename extension '.PNG' is assumed
    // by Phaser's loader
    static readonly R = {
      dungeon: "assets/img/dungeon",
      hunter : "assets/img/hunter",
      blob : "assets/img/blob",
      treasure : "assets/img/treasure",
      door : "assets/img/door"
    };

    // parameters affecting gameplay
    static readonly NUMBER_OF_BLOBS = 5;
    // player speed in pixels/second
    static readonly PLAYER_SPEED = 100;
    // enemy speed in pixels/second
    static readonly MAX_BLOB_SPEED = 75;
  }
  
}