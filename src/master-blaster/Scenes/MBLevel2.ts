import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import MBLevel from "./MBLevel";
import GameCompleteScene from "./GameCompleteScene";

import Viewport from "../../Wolfie2D/SceneGraph/Viewport";
import RenderingManager from "../../Wolfie2D/Rendering/RenderingManager";
import SceneManager from "../../Wolfie2D/Scene/SceneManager";

/**
 * The second level for the Master Blaster. It should be the goose dungeon / cave.
 */
export default class Level2 extends MBLevel {

    public static readonly PLAYER_SPAWN = new Vec2(32, 32);
    public static readonly PLAYER_SPRITE_KEY = "PLAYER_SPRITE_KEY";
    public static readonly PLAYER_SPRITE_PATH = "game_assets/spritesheets/bayleef.json";

    public static readonly TILEMAP_KEY = "LEVEL2";
    public static readonly TILEMAP_PATH = "game_assets/tilemaps/MBLevel2.json";
    public static readonly TILEMAP_SCALE = new Vec2(2, 2);
    public static readonly DESTRUCTIBLE_LAYER_KEY = "Destructable";
    public static readonly WALLS_LAYER_KEY = "Main";

    public static readonly LEVEL_MUSIC_KEY = "LEVEL_MUSIC";
    public static readonly LEVEL_MUSIC_PATH = "game_assets/music/level2.mp3";

    public static readonly JUMP_AUDIO_KEY = "PLAYER_JUMP";
    public static readonly JUMP_AUDIO_PATH = "game_assets/sounds/jump.wav";

    public static readonly TILE_DESTROYED_KEY = "TILE_DESTROYED";
    public static readonly TILE_DESTROYED_PATH = "game_assets/sounds/switch.wav";

    public static readonly DYING_AUDIO_KEY = "PLAYER_DYING";
    public static readonly DYING_AUDIO_PATH = "game_assets/sounds/fall_death.mp3";

    public static readonly LEVEL_END = new AABB(new Vec2(224, 232), new Vec2(24, 16));

    public constructor(viewport: Viewport, sceneManager: SceneManager, renderingManager: RenderingManager, options: Record<string, any>) {
        super(viewport, sceneManager, renderingManager, options);

        // Set the keys for the different layers of the tilemap
        this.tilemapKey = Level2.TILEMAP_KEY;
        this.tilemapScale = Level2.TILEMAP_SCALE;
        this.destructibleLayerKey = Level2.DESTRUCTIBLE_LAYER_KEY;
        this.wallsLayerKey = Level2.WALLS_LAYER_KEY;

        // Set the key for the player's sprite
        this.playerSpriteKey = Level2.PLAYER_SPRITE_KEY;
        // Set the player's spawn
        this.playerSpawn = Level2.PLAYER_SPAWN;

        // Music and sound
        this.levelMusicKey = Level2.LEVEL_MUSIC_KEY
        this.jumpAudioKey = Level2.JUMP_AUDIO_KEY;
        this.tileDestroyedAudioKey = Level2.TILE_DESTROYED_KEY;
        this.dyingAudioKey = Level2.DYING_AUDIO_KEY;

        // Level end size and position
        this.levelEndPosition = new Vec2(32, 216).mult(this.tilemapScale);
        this.levelEndHalfSize = new Vec2(32, 32).mult(this.tilemapScale);

        this.levelEndLabelText = "Game Ended";
        this.nextLevel = GameCompleteScene;
    }
    /**
     * Load in resources for level 2.
     */
    public loadScene(): void {
        // Load in the tilemap (unique to Level2)
        this.load.tilemap(this.tilemapKey, Level2.TILEMAP_PATH);
        // Load Level 2's unique music (player sprite and other audio kept from Level1)
        this.load.audio(this.levelMusicKey, Level2.LEVEL_MUSIC_PATH);
    }

    public unloadScene(): void {
        // Nothing to keep — going back to MainMenu
    }

    public startScene(): void {
        super.startScene();
    }

}