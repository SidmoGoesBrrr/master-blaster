import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import MainMenu from "./MainMenu";

export const GameCompleteLayers = {
    MAIN: "MAIN"
} as const;

export default class GameCompleteScene extends Scene {

    public loadScene(): void {
        // No assets needed
    }

    public startScene(): void {
        this.addUILayer(GameCompleteLayers.MAIN);

        let size = this.viewport.getHalfSize();

        // Title
        let title = this.add.uiElement(UIElementType.LABEL, GameCompleteLayers.MAIN, {
            position: new Vec2(size.x, size.y - 100),
            text: "GAME ENDED"
        }) as any;
        title.fontSize = 72;
        title.font = "PixelSimple";
        title.textColor = new Color(100, 255, 150);

        // Credits
        let credits = this.add.uiElement(UIElementType.LABEL, GameCompleteLayers.MAIN, {
            position: new Vec2(size.x, size.y - 20),
            text: "Made by Siddhant"
        }) as any;
        credits.fontSize = 36;
        credits.font = "PixelSimple";
        credits.textColor = Color.WHITE;

        // Return to menu button
        let menuBtn = <Button>this.add.uiElement(UIElementType.BUTTON, GameCompleteLayers.MAIN, {
            position: new Vec2(size.x, size.y + 80),
            text: "Return to Menu"
        });
        menuBtn.backgroundColor = new Color(60, 80, 100);
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
