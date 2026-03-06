import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Particle from "../../Wolfie2D/Nodes/Graphics/Particle";
import ParticleSystem from "../../Wolfie2D/Rendering/Animations/ParticleSystem";
import Color from "../../Wolfie2D/Utils/Color";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import RandUtils from "../../Wolfie2D/Utils/RandUtils";

/**
 * The particle system used for the player's attack. Particles in the particle system should
 * be spawned at the player's position and fired in the direction of the mouse's position.
 */
export default class PlayerWeapon extends ParticleSystem {

    /** The direction to fire particles, captured at attack time */
    private fireDirection: Vec2 = Vec2.RIGHT;

    public getPool(): Readonly<Array<Particle>> {
        return this.particlePool;
    }

    /**
     * @returns true if the particle system is running; false otherwise.
     */
    public isSystemRunning(): boolean { return this.systemRunning; }

    /**
     * Sets the direction particles should be fired in.
     * Should be called before startSystem() with the direction from the player to the mouse.
     * @param dir the normalized direction vector
     */
    public setFireDirection(dir: Vec2): void {
        this.fireDirection = dir.normalized();
    }

    /**
     * Sets the animations for a particle in the player's weapon
     * @param particle the particle to give the animation to
     */
    public setParticleAnimation(particle: Particle) {
        // Fire the particle in the direction of the mouse with some random spread
        let speed = RandUtils.randFloat(100, 200);
        let spread = RandUtils.randFloat(-32, 32);

        // Create velocity along the fire direction with perpendicular spread
        let perpendicular = new Vec2(-this.fireDirection.y, this.fireDirection.x);
        particle.vel = this.fireDirection.scaled(speed).add(perpendicular.scaled(spread));
        particle.color = Color.RED;

        // Give the particle tweens
        particle.tweens.add("active", {
            startDelay: 0,
            duration: this.lifetime,
            effects: [
                {
                    property: "alpha",
                    start: 1,
                    end: 0,
                    ease: EaseFunctionType.IN_OUT_SINE
                }
            ]
        });
    }

}