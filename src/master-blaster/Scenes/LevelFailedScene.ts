import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import MainMenu from "./MainMenu";

export const LevelFailedLayers = {
    MAIN: "MAIN"
} as const;

const GAME_OVER_AUDIO_KEY = "GAME_OVER";
const GAME_OVER_AUDIO_PATH = "game_assets/sounds/game_over.mp3";

export default class LevelFailedScene extends Scene {

    public loadScene(): void {
        this.load.audio(GAME_OVER_AUDIO_KEY, GAME_OVER_AUDIO_PATH);
    }

    public startScene(): void {
        this.addUILayer(LevelFailedLayers.MAIN);

        this.emitter.fireEvent(GameEventType.PLAY_SOUND, { key: GAME_OVER_AUDIO_KEY, loop: false, holdReference: false });

        let size = this.viewport.getHalfSize();

        // Title
        let title = this.add.uiElement(UIElementType.LABEL, LevelFailedLayers.MAIN, {
            position: new Vec2(size.x, size.y - 80),
            text: "LEVEL FAILED"
        }) as any;
        title.fontSize = 64;
        title.font = "PixelSimple";
        title.textColor = new Color(255, 80, 80);

        // Subtitle
        let subtitle = this.add.uiElement(UIElementType.LABEL, LevelFailedLayers.MAIN, {
            position: new Vec2(size.x, size.y - 20),
            text: "You ran out of health"
        }) as any;
        subtitle.fontSize = 24;
        subtitle.font = "PixelSimple";
        subtitle.textColor = Color.WHITE;

        // Return to menu button
        let menuBtn = <Button>this.add.uiElement(UIElementType.BUTTON, LevelFailedLayers.MAIN, {
            position: new Vec2(size.x, size.y + 60),
            text: "Return to Menu"
        });
        menuBtn.backgroundColor = new Color(80, 60, 100);
        menuBtn.borderColor = Color.WHITE;
        menuBtn.borderRadius = 4;
        menuBtn.setPadding(new Vec2(40, 15));
        menuBtn.font = "PixelSimple";
        menuBtn.fontSize = 24;

        menuBtn.onClick = () => {
            this.sceneManager.changeToScene(MainMenu);
        };
    }
}
