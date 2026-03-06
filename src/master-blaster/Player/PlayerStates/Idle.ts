import { PlayerStates, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";
import Input from "../../../Wolfie2D/Input/Input";
import { MBControls } from "../../MBControls";

export default class Idle extends PlayerState {

	public onEnter(options: Record<string, any>): void {
        // Play the correct idle animation based on facing direction
        if (this.parent.facingLeft) {
            this.owner.animation.play(PlayerAnimations.IDLE);
        } else {
            this.owner.animation.play(PlayerAnimations.IDLE_RIGHT);
        }
		this.parent.speed = this.parent.MIN_SPEED;
        this.parent.velocity.x = 0;
        this.parent.velocity.y = 0;
	}

	public update(deltaT: number): void {
        // Track previous facing to detect direction changes
        const wasFacingLeft = this.parent.facingLeft;
        
        // Adjust the direction the player is facing
		super.update(deltaT);

        // Switch idle animation if direction changed (e.g. from attack or other state)
        if (this.parent.facingLeft !== wasFacingLeft) {
            if (this.parent.facingLeft) {
                this.owner.animation.play(PlayerAnimations.IDLE);
            } else {
                this.owner.animation.play(PlayerAnimations.IDLE_RIGHT);
            }
        }

        // Get the direction of the player's movement
		let dir = this.parent.inputDir;

        // If the player is moving along the x-axis (without jump), transition to walking
		if (!dir.isZero() && dir.y === 0){
			this.finished(PlayerStates.WALK);
		} 
        // If the player is jumping, transition to the jumping state (jump has priority)
        else if (Input.isJustPressed(MBControls.JUMP)) {
            this.finished(PlayerStates.JUMP);
        }
        // If the player is not on the ground, transition to the falling state
        else if (!this.owner.onGround && this.parent.velocity.y > 0) {
            this.finished(PlayerStates.FALL);
        } 
        // Otherwise, keep idling
        else {
            // Update the vertical velocity of the player
            this.parent.velocity.y += this.gravity*deltaT;
            // Move the player
            this.owner.move(this.parent.velocity.scaled(deltaT));
        }
		
	}

	public onExit(): Record<string, any> {
		this.owner.animation.stop();
		return {};
	}
}