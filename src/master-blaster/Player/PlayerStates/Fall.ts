import MathUtils from "../../../Wolfie2D/Utils/MathUtils";
import { PlayerStates, PlayerAnimations } from "../PlayerController";
import PlayerState from "./PlayerState";

export default class Fall extends PlayerState {

    onEnter(options: Record<string, any>): void {
        // Ensure we're not rising (preserve fall velocity when coming from Jump)
        if (this.parent.velocity.y < 0) this.parent.velocity.y = 0;
        // Play the fall animation based on the direction the player is facing
        if (this.parent.facingLeft) {
            this.owner.animation.playIfNotAlready(PlayerAnimations.FALL_LEFT);
        } else {
            this.owner.animation.playIfNotAlready(PlayerAnimations.FALL_RIGHT);
        }
    }

    update(deltaT: number): void {
        // Track previous facing direction to detect changes
        const wasFacingLeft = this.parent.facingLeft;
        
        // Update facing direction while falling
        super.update(deltaT);

        // Switch animation if direction changed mid-fall
        if (this.parent.facingLeft !== wasFacingLeft) {
            if (this.parent.facingLeft) {
                this.owner.animation.play(PlayerAnimations.FALL_LEFT);
            } else {
                this.owner.animation.play(PlayerAnimations.FALL_RIGHT);
            }
        }

        // If the player hits the ground, start idling and check if we should take damage
        if (this.owner.onGround) {
            let damage = Math.floor(this.parent.velocity.y / 200);
            // Reduce damage on first landing only (spawn), not eliminate it
            if (this.parent.spawnDamageImmunity) {
                damage = Math.min(damage, 1);
                this.parent.spawnDamageImmunity = false;
            }
            if (damage > 0) {
                if (this.parent.facingLeft) {
                    this.owner.animation.play(PlayerAnimations.TAKE_DAMAGE_LEFT);
                } else {
                    this.owner.animation.play(PlayerAnimations.TAKE_DAMAGE_RIGHT);
                }
            }
            this.parent.health -= damage;
            this.finished(PlayerStates.IDLE);
        } 
        // Otherwise, keep moving
        else {
            // Get the movement direction from the player 
            let dir = this.parent.inputDir;
            // Update the horizontal velocity of the player
            this.parent.velocity.x += dir.x * this.parent.speed/3.5 - 0.3*this.parent.velocity.x;
            // Update the vertical velocity of the player
            this.parent.velocity.y += this.gravity*deltaT;
            // Move the player
            this.owner.move(this.parent.velocity.scaled(deltaT));
        }

    }

    onExit(): Record<string, any> {
        this.owner.animation.stop();
        return {};
    }
}